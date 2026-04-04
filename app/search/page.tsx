"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, useMemo, Suspense } from "react";

interface SearchItem {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  date: string;
  series?: string;
}

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(initialQuery);
  const [posts, setPosts] = useState<SearchItem[]>([]);

  useEffect(() => {
    fetch("/search-index.json")
      .then((res) => res.json())
      .then(setPosts);
  }, []);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return posts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        p.category.toLowerCase().includes(q)
    );
  }, [query, posts]);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold tracking-tight">검색</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="제목, 설명, 태그로 검색..."
        className="mb-6 w-full rounded-lg border border-gray-300 px-4 py-3 text-base outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        autoFocus
      />
      {query.trim() && (
        <p className="mb-6 text-sm text-gray-400">
          {results.length}개의 결과
        </p>
      )}
      {results.length > 0 ? (
        <ul className="space-y-6">
          {results.map((post) => (
            <li
              key={post.slug}
              className="border-b border-gray-100 pb-6 last:border-0"
            >
              <Link href={`/blog/${post.slug}`} className="group block">
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <time>{post.date}</time>
                  <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs">
                    {post.category}
                  </span>
                </div>
                <h2 className="mt-1 text-lg font-medium group-hover:text-blue-600">
                  {post.title}
                </h2>
                <p className="mt-1 text-gray-600">{post.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        query.trim() && (
          <p className="text-gray-500">
            &ldquo;{query}&rdquo;에 대한 검색 결과가 없습니다.
          </p>
        )
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense>
      <SearchContent />
    </Suspense>
  );
}
