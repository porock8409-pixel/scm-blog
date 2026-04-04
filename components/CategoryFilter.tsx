"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

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

interface CategoryFilterProps {
  categories: string[];
}

export function CategoryFilter({ categories }: CategoryFilterProps) {
  const searchParams = useSearchParams();
  const active = searchParams.get("category") ?? "";

  return (
    <div className="mb-8 flex flex-wrap gap-2">
      <Link
        href="/blog"
        className={`rounded-full px-3 py-1 text-sm transition-colors ${
          !active
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
            active === cat
              ? "bg-gray-900 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {CATEGORY_LABELS[cat] ?? cat}
        </Link>
      ))}
    </div>
  );
}
