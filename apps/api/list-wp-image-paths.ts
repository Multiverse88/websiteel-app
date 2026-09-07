// Helper for migrate-legacy-wp-images.ts: just prints the distinct list of
// wp-content/uploads paths referenced across affected articles, one per
// line, so they can be downloaded from a different network path (the old
// WordPress host at 147.93.83.186 blocks/404s requests originating from
// this VPS's IP specifically, even though the files are still there when
// requested from elsewhere — see migrate-legacy-wp-images.ts's dry-run vs
// live-run discrepancy). Run: npx tsx list-wp-image-paths.ts > paths.txt
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const WP_URL_RE = /https?:\/\/[^\s"')]+?\/wp-content\/uploads\/([^\s"')]+)/gi;

function extractWpPaths(text: string | null): string[] {
  if (!text) return [];
  const out: string[] = [];
  let m: RegExpExecArray | null;
  WP_URL_RE.lastIndex = 0;
  while ((m = WP_URL_RE.exec(text))) out.push(m[1]);
  return out;
}

async function main() {
  const articles = await prisma.article.findMany({
    where: {
      OR: [{ coverImage: { contains: "wp-content" } }, { content: { contains: "wp-content" } }],
    },
    select: { coverImage: true, content: true },
  });
  const paths = new Set<string>();
  for (const a of articles) {
    for (const p of [...extractWpPaths(a.coverImage), ...extractWpPaths(a.content)]) paths.add(p);
  }
  for (const p of paths) console.log(p);
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
