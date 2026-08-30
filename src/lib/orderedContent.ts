import fs from "node:fs";
import path from "node:path";

// Folder-collection JSON files (content/<folder>/*.json) are named by
// CMS-generated slugs, which carry no ordering meaning and can change
// whenever an entry's title changes. Editors control display order
// explicitly via each file's `order` field instead.
//
// `order` now holds a Date.now() timestamp (ms) rather than a manually
// entered small integer — set automatically on first save via the
// admin's preSave listener — so higher/newer values sort first.
export function readOrderedContent<T extends { order: number }>(
  folder: string,
): T[] {
  const dir = path.join(process.cwd(), "content", folder);
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));
  const entries = files.map(
    (f) => JSON.parse(fs.readFileSync(path.join(dir, f), "utf-8")) as T,
  );
  return entries.sort((a, b) => b.order - a.order);
}

// Reads a single fixed JSON file under content/ — for Decap CMS "file
// collections" (one fixed record, e.g. content/featured-photo.json),
// as opposed to the folder collections read via readOrderedContent
// above (many files, one per entry).
export function readJsonContent<T>(relativePath: string): T {
  const filePath = path.join(process.cwd(), "content", relativePath);
  return JSON.parse(fs.readFileSync(filePath, "utf-8")) as T;
}
