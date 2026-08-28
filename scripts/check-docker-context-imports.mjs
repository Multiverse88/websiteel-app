import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const appRoots = ["apps/web", "apps/web-co"];
const violations = [];

async function walk(appRoot, directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) await walk(appRoot, file);
    else if (/\.(tsx?|jsx?|mjs)$/.test(entry.name)) await inspect(appRoot, file);
  }
}

async function inspect(appRoot, file) {
  const source = await readFile(file, "utf8");
  const importPattern = /(?:from\s+|import\s*)["'](\.\.?\/[^"']+)["']/g;
  for (const match of source.matchAll(importPattern)) {
    const target = path.resolve(path.dirname(file), match[1]);
    const root = path.resolve(appRoot);
    if (target !== root && !target.startsWith(`${root}${path.sep}`)) {
      violations.push(`${file}: import ${match[1]} keluar dari Docker context ${appRoot}`);
    }
  }
}

for (const root of appRoots) await walk(root, path.join(root, "src"));

if (violations.length) {
  console.error(violations.join("\n"));
  process.exit(1);
}
console.log("Docker context import guard: PASS");
