import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const CONTENT_DIR = path.join(process.cwd(), "content");

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  series?: string;
  seriesOrder?: number;
  readingTime: string;
  published: boolean;
}

export interface Post {
  meta: PostMeta;
  content: string;
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));

  const posts = files
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, "");
      const filePath = path.join(CONTENT_DIR, filename);
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(raw);

      return {
        slug,
        title: data.title ?? slug,
        description: data.description ?? "",
        date: data.date ?? "",
        category: data.category ?? "fundamentals",
        tags: data.tags ?? [],
        series: data.series,
        seriesOrder: data.seriesOrder,
        readingTime: readingTime(content).text,
        published: data.published !== false,
      };
    })
    .filter((p) => p.published)
    .sort((a, b) => (a.date > b.date ? -1 : 1));

  return posts;
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    meta: {
      slug,
      title: data.title ?? slug,
      description: data.description ?? "",
      date: data.date ?? "",
      category: data.category ?? "fundamentals",
      tags: data.tags ?? [],
      series: data.series,
      seriesOrder: data.seriesOrder,
      readingTime: readingTime(content).text,
      published: data.published !== false,
    },
    content,
  };
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getSeriesPosts(series: string): PostMeta[] {
  return getAllPosts()
    .filter((p) => p.series === series)
    .sort((a, b) => (a.seriesOrder ?? 0) - (b.seriesOrder ?? 0));
}

export function getAllCategories(): string[] {
  const posts = getAllPosts();
  const categories = [...new Set(posts.map((p) => p.category))];
  return categories.sort();
}

export function getPostsByCategory(category: string): PostMeta[] {
  return getAllPosts().filter((p) => p.category === category);
}

export interface SeriesInfo {
  id: string;
  label: string;
  description: string;
  postCount: number;
  firstSlug: string;
}

const SERIES_META: Record<string, { label: string; description: string }> = {
  "scm-basics": { label: "SCM 기초", description: "SCM의 핵심 개념과 프레임워크" },
  "scm-practical": { label: "SCM 실무", description: "현장에서 바로 쓰는 실무 지식" },
  "scm-systems": { label: "SCM 시스템", description: "ERP, WMS, TMS 등 시스템 이해" },
  "scm-procurement": { label: "전략적 조달", description: "구매/소싱 전략과 공급업체 관리" },
  "scm-manufacturing": { label: "생산관리", description: "생산계획, MRP, 품질관리" },
  "scm-strategy": { label: "SCM 전략", description: "리스크 관리, ESG, 비용 최적화" },
  "scm-analytics": { label: "데이터 분석", description: "KPI, 대시보드, 데이터 기반 의사결정" },
  "scm-career": { label: "SCM 커리어", description: "직무 탐색, 자격증, 면접 준비" },
  "scm-advanced": { label: "SCM 심화", description: "Kraljic, DDMRP, APS 등 고급 이론" },
  "scm-global": { label: "글로벌 SCM", description: "해외 소싱, FTA, 국제 물류" },
  "scm-case-study": { label: "사례 연구", description: "도요타, 자라, 삼성, 쿠팡, 이케아" },
  "scm-quick-wins": { label: "실무 Quick Wins", description: "바로 실행 가능한 개선 팁" },
};

export function getRelatedPosts(slug: string, limit = 4): PostMeta[] {
  const allPosts = getAllPosts();
  const current = allPosts.find((p) => p.slug === slug);
  if (!current) return [];

  const scored = allPosts
    .filter((p) => p.slug !== slug)
    .map((p) => {
      let score = 0;
      if (p.category === current.category) score += 3;
      if (p.series && p.series === current.series) score += 2;
      const sharedTags = p.tags.filter((t) => current.tags.includes(t));
      score += sharedTags.length;
      return { post: p, score };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((s) => s.post);
}

export function getAllSeries(): SeriesInfo[] {
  const posts = getAllPosts();
  const seriesMap = new Map<string, PostMeta[]>();

  for (const post of posts) {
    if (!post.series) continue;
    const list = seriesMap.get(post.series) ?? [];
    list.push(post);
    seriesMap.set(post.series, list);
  }

  return Array.from(seriesMap.entries()).map(([id, seriesPosts]) => {
    const sorted = seriesPosts.sort(
      (a, b) => (a.seriesOrder ?? 0) - (b.seriesOrder ?? 0)
    );
    const meta = SERIES_META[id] ?? { label: id, description: "" };
    return {
      id,
      label: meta.label,
      description: meta.description,
      postCount: sorted.length,
      firstSlug: sorted[0].slug,
    };
  });
}
