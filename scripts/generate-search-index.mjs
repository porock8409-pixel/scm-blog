import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");
const OUTPUT_PATH = path.join(process.cwd(), "public", "search-index.json");

const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));

const index = files
  .map((filename) => {
    const slug = filename.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(CONTENT_DIR, filename), "utf-8");
    const { data } = matter(raw);

    if (data.published === false) return null;

    return {
      slug,
      title: data.title ?? slug,
      description: data.description ?? "",
      category: data.category ?? "fundamentals",
      tags: data.tags ?? [],
      date: data.date ?? "",
      series: data.series,
    };
  })
  .filter(Boolean)
  .sort((a, b) => (a.date > b.date ? -1 : 1));

fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
fs.writeFileSync(OUTPUT_PATH, JSON.stringify(index, null, 0));

console.log(`Search index generated: ${index.length} posts → ${OUTPUT_PATH}`);
