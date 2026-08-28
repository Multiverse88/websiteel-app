import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const roots = ["apps/web/src", "apps/web-co/src"];
const violations = [];

async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) await walk(file);
    else if (/\.(tsx?|jsx?)$/.test(entry.name)) await inspect(file);
  }
}

async function inspect(file) {
  if (file.endsWith("SocialShare.tsx")) return;
  const lines = (await readFile(file, "utf8")).split("\n");
  lines.forEach((line, index) => {
    if (/https?:\/\/(wa\.me|api\.whatsapp\.com)/.test(line)) {
      violations.push(`${file}:${index + 1}: direct WhatsApp URL melewati rotator`);
    }
    if (/href\s*=.*mauorder\.online|whatsappLink\s*:.*mauorder\.online/.test(line)) {
      violations.push(`${file}:${index + 1}: rotator lama masih dipakai`);
    }
  });
}

for (const root of roots) await walk(root);

if (violations.length) {
  console.error(violations.join("\n"));
  process.exit(1);
}
console.log("WhatsApp CTA inventory: PASS — semua CTA EasyLegal melewati rotator");
