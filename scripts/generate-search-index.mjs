import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");
const PUBLIC_DIR = path.join(process.cwd(), "public");
const BASE_URL = "https://porock8409-pixel.github.io/scm-blog";

const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));

const posts = files
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

// Generate search index
fs.mkdirSync(PUBLIC_DIR, { recursive: true });
fs.writeFileSync(
  path.join(PUBLIC_DIR, "search-index.json"),
  JSON.stringify(posts, null, 0)
);
console.log(`Search index: ${posts.length} posts`);

// Generate RSS feed
function escapeXml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

const items = posts
  .slice(0, 30)
  .map(
    (p) => `    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${BASE_URL}/blog/${p.slug}</link>
      <guid isPermaLink="true">${BASE_URL}/blog/${p.slug}</guid>
      <description>${escapeXml(p.description)}</description>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <category>${escapeXml(p.category)}</category>
    </item>`
  )
  .join("\n");

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>SCM Blog - 공급망 관리 실무 지식</title>
    <link>${BASE_URL}</link>
    <description>SCM 실무 지식을 쉽게 풀어서 전달합니다.</description>
    <language>ko</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

fs.writeFileSync(path.join(PUBLIC_DIR, "feed.xml"), rss);
console.log(`RSS feed: ${Math.min(posts.length, 30)} items`);
