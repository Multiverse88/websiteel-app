// One-time (safe-to-rerun) migration: 171 pre-multi-site-split articles
// still reference their cover/inline images as absolute URLs on the OLD
// WordPress install (http(s)://easylegal.id/wp-content/uploads/...).
//
// That domain now points (via DNS) at the new Next.js app, which has no
// /wp-content/ route at all — so every one of those images 404s in
// production. Reported by user via browser devtools showing repeated
// `GET https://easylegal.id/_next/image?url=https://easylegal.id/wp-content/...
// [HTTP/2 404]` on /artikel.
//
// The old WordPress files are NOT lost: the original host (Hostinger,
// 147.93.83.186) is still up and still serves them when hit directly with
// the original Host header — confirmed via
//   curl -H "Host: easylegal.id" http://147.93.83.186/wp-content/uploads/<file> -> 200
//
// This script:
//   1. Finds every Article whose coverImage or content contains
//      "wp-content/uploads".
//   2. Extracts every distinct wp-content image URL referenced (coverImage
//      field + any inline markdown/HTML <img>/![]() references in content).
//   3. Downloads each one directly from the old Hostinger IP (bypassing DNS,
//      via a Host header) and re-uploads it to the same MinIO/CDN bucket
//      already used for every other image on the site.
//   4. Rewrites every article's coverImage and content to point at the new
//      CDN URL instead of the dead easylegal.id/wp-content/... URL.
//
// Safe to re-run: images already re-uploaded are skipped (checked via
// MinIO statObject before re-uploading), and DB rewrites are idempotent
// string replacements (only touches URLs still containing "wp-content").
//
// Run from inside the admin-api container (has DATABASE_URL + MINIO_* env
// already configured):
//   npx tsx migrate-legacy-wp-images.ts
//   npx tsx migrate-legacy-wp-images.ts --dry-run   (report only, no writes)

import { PrismaClient } from "@prisma/client";
import { minioClient, BUCKET_NAME, CDN_BASE_URL } from "./src/lib/minio";

const prisma = new PrismaClient();
const OLD_WP_IP = "147.93.83.186";
const DRY_RUN = process.argv.includes("--dry-run");

// Matches http(s)://<anything>/wp-content/uploads/<path>, case-insensitive
// scheme/host, capturing the path+filename after /wp-content/uploads/.
const WP_URL_RE = /https?:\/\/[^\s"')]+?\/wp-content\/uploads\/([^\s"')]+)/gi;

function extractWpPaths(text: string | null): string[] {
  if (!text) return [];
  const out: string[] = [];
  let m: RegExpExecArray | null;
  WP_URL_RE.lastIndex = 0;
  while ((m = WP_URL_RE.exec(text))) out.push(m[1]);
  return out;
}

// LOCAL_DIR: pre-downloaded files, used as a fallback/primary source when the
// old host can't be reached directly from wherever this script runs. Added
// after discovering the old Hostinger host 404s specifically for requests
// originating from this VPS's own IP (confirmed: identical URL 200s from an
// outside network, 404s from inside the admin-api container on the same VPS
// at the same moment) — so the images were fetched from elsewhere and
// transferred in instead. Set via LOCAL_WP_IMAGES_DIR env var, e.g.
// `LOCAL_WP_IMAGES_DIR=/app/wp_images_local npx tsx migrate-legacy-wp-images.ts`
const LOCAL_DIR = process.env.LOCAL_WP_IMAGES_DIR;

async function downloadFromOldHost(uploadPath: string): Promise<Buffer | null> {
  if (LOCAL_DIR) {
    try {
      const fs = await import("node:fs/promises");
      const path = await import("node:path");
      return await fs.readFile(path.join(LOCAL_DIR, uploadPath));
    } catch (e) {
      console.warn(`  [skip] local file missing: ${LOCAL_DIR}/${uploadPath} (${(e as Error).message})`);
      return null;
    }
  }
  const url = `http://${OLD_WP_IP}/wp-content/uploads/${uploadPath}`;
  try {
    const res = await fetch(url, { headers: { Host: "easylegal.id" } });
    if (!res.ok) {
      console.warn(`  [skip] ${res.status} ${url}`);
      return null;
    }
    return Buffer.from(await res.arrayBuffer());
  } catch (e) {
    console.warn(`  [skip] fetch failed: ${url} (${(e as Error).message})`);
    return null;
  }
}

function contentTypeFor(path: string): string {
  const ext = path.split(".").pop()?.toLowerCase();
  return (
    {
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      png: "image/png",
      gif: "image/gif",
      webp: "image/webp",
      svg: "image/svg+xml",
    }[ext || ""] || "application/octet-stream"
  );
}

async function ensureUploaded(uploadPath: string): Promise<string | null> {
  // MinIO object key: keep the original filename, under a dedicated folder
  // so these are easy to find/audit later, mirroring uploadToMinio()'s
  // <folder>/<filename> convention used elsewhere in the codebase.
  const objectKey = `legacy-wp/${uploadPath}`;
  const publicUrl = `${CDN_BASE_URL}/legacy-wp/${uploadPath}`;

  try {
    await minioClient.statObject(BUCKET_NAME, objectKey);
    return publicUrl; // already migrated in a previous run
  } catch {
    // not found — proceed to download + upload
  }

  if (DRY_RUN) return publicUrl;

  const buf = await downloadFromOldHost(uploadPath);
  if (!buf) return null;

  await minioClient.putObject(BUCKET_NAME, objectKey, buf, buf.length, {
    "Content-Type": contentTypeFor(uploadPath),
  });
  return publicUrl;
}

async function main() {
  console.log(DRY_RUN ? "DRY RUN — no writes will be made.\n" : "LIVE RUN.\n");

  const articles = await prisma.article.findMany({
    where: {
      OR: [{ coverImage: { contains: "wp-content" } }, { content: { contains: "wp-content" } }],
    },
    select: { id: true, slug: true, coverImage: true, content: true },
  });
  console.log(`Found ${articles.length} articles referencing wp-content images.\n`);

  // Pass 1: collect every distinct upload path across all affected articles.
  const allPaths = new Set<string>();
  for (const a of articles) {
    for (const p of [...extractWpPaths(a.coverImage), ...extractWpPaths(a.content)]) {
      allPaths.add(p);
    }
  }
  console.log(`${allPaths.size} distinct image files to migrate.\n`);

  // Pass 2: migrate each unique file once, build old-URL -> new-URL map.
  // Old URLs can appear as http:// or https:// with the same path — map
  // both variants to the same new CDN URL.
  const urlMap = new Map<string, string>(); // full old URL -> new CDN URL
  let migrated = 0;
  let failed = 0;
  for (const path of allPaths) {
    const newUrl = await ensureUploaded(path);
    if (!newUrl) {
      failed++;
      continue;
    }
    urlMap.set(`http://easylegal.id/wp-content/uploads/${path}`, newUrl);
    urlMap.set(`https://easylegal.id/wp-content/uploads/${path}`, newUrl);
    migrated++;
    if (migrated % 20 === 0) console.log(`  ...${migrated}/${allPaths.size} done`);
  }
  console.log(`\nMigrated ${migrated} images, ${failed} failed (old host returned non-200 or unreachable).\n`);

  // Pass 3: rewrite each article's coverImage + content, replacing every
  // occurrence of an old URL we successfully migrated.
  let updatedArticles = 0;
  for (const a of articles) {
    let newCover = a.coverImage;
    let newContent = a.content;
    let changed = false;

    if (newCover) {
      for (const [oldUrl, newUrl] of urlMap) {
        if (newCover.includes(oldUrl)) {
          newCover = newCover.split(oldUrl).join(newUrl);
          changed = true;
        }
      }
    }
    if (newContent) {
      for (const [oldUrl, newUrl] of urlMap) {
        if (newContent.includes(oldUrl)) {
          newContent = newContent.split(oldUrl).join(newUrl);
          changed = true;
        }
      }
    }

    if (!changed) continue;
    updatedArticles++;
    if (DRY_RUN) {
      console.log(`  [would update] ${a.slug}`);
      continue;
    }
    await prisma.article.update({
      where: { id: a.id },
      data: { coverImage: newCover, content: newContent },
    });
  }

  console.log(`\n${DRY_RUN ? "Would update" : "Updated"} ${updatedArticles} articles.`);
  if (failed > 0) {
    console.log(
      `\n${failed} image(s) could not be migrated (old host 404/unreachable for that specific file) — their articles keep the old (broken) URL for those images only; re-run this script later if the old host comes back, or replace manually.`,
    );
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
