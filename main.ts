import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const COMMENT =
  "Approved. I understood it well enough to be afraid, and not well enough to explain why.";

const MIN_BYTES = 1;
const MAX_BYTES = 200;

if (COMMENT.trim().length === 0) {
  throw new Error("entry.txt content must not be only whitespace");
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const entryPath = join(outputDir, "entry.txt");
const payload = `${COMMENT}\n`;

const byteLength = Buffer.byteLength(payload, "utf8");
if (byteLength < MIN_BYTES || byteLength > MAX_BYTES) {
  throw new Error(
    `entry.txt must be between ${MIN_BYTES} and ${MAX_BYTES} bytes, but would be ${byteLength}`,
  );
}

mkdirSync(outputDir, { recursive: true });
writeFileSync(entryPath, payload, { encoding: "utf8" });

console.log(`Wrote ${entryPath}`);
console.log(`Characters (comment): ${[...COMMENT].length}`);
console.log(`Bytes (comment + newline): ${byteLength}`);
