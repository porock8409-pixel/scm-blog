"use client";

import Link from "next/link";
import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

interface PostItem {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  readingTime?: string;
}

const CATEGORY_LABELS: Record<string, string> = {
  fundamentals: "SCM 기초",
  "demand-planning": "수요예측",
  inventory: "재고관리",
  procurement: "조달/구매",
  manufacturing: "생산관리",
  logistics: "물류/배송",
  strategy: "전략/리스크",
  analytics: "데이터분석",
  career: "커리어",
  advanced: "심화",
  global: "글로벌",
  "case-study": "사례연구",
  "quick-wins": "실무팁",
};

function BlogContent() {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") ?? "";
  const [posts, setPosts] = useState<PostItem[]>([]);

  useEffect(() => {
    fetch("/search-index.json")
      .then((res) => res.json())
      .then(setPosts);
  }, []);

  const categories = [...new Set(posts.map((p) => p.category))].sort();
  const filtered = activeCategory
    ? posts.filter((p) => p.category === activeCategory)
    : posts;

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold tracking-tight">글 목록</h1>

      <div className="mb-8 flex flex-wrap gap-2">
        <Link
          href="/blog"
          className={`rounded-full px-3 py-1 text-sm transition-colors ${
            !activeCategory
              ? "bg-gray-900 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          전체
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat}
            href={`/blog?category=${cat}`}
            className={`rounded-full px-3 py-1 text-sm transition-colors ${
              activeCategory === cat
                ? "bg-gray-900 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {CATEGORY_LABELS[cat] ?? cat}
          </Link>
        ))}
      </div>

      <p className="mb-6 text-sm text-gray-400">
        {activeCategory ? `${filtered.length}편` : `전체 ${filtered.length}편`}
      </p>

      {filtered.length === 0 ? (
        <p className="text-gray-500">글을 불러오는 중...</p>
      ) : (
        <ul className="space-y-6">
          {filtered.map((post) => (
            <li
              key={post.slug}
              className="border-b border-gray-100 pb-6 last:border-0"
            >
              <Link href={`/blog/${post.slug}`} className="group block">
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <time>{post.date}</time>
                </div>
                <h2 className="mt-1 text-lg font-medium group-hover:text-blue-600">
                  {post.title}
                </h2>
                <p className="mt-1 text-gray-600">{post.description}</p>
                <div className="mt-2 flex gap-2">
                  {post.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function BlogIndex() {
  return (
    <Suspense>
      <BlogContent />
    </Suspense>
  );
}
