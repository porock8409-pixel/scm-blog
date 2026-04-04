import Link from "next/link";
import type { PostMeta } from "@/lib/mdx";

const SERIES_LABELS: Record<string, string> = {
  "scm-basics": "SCM 기초",
  "scm-practical": "SCM 실무",
  "scm-systems": "SCM 시스템",
  "scm-procurement": "전략적 조달",
  "scm-manufacturing": "생산관리",
  "scm-strategy": "SCM 전략",
  "scm-analytics": "SCM 데이터 분석",
  "scm-career": "SCM 커리어",
  "scm-advanced": "SCM 심화",
  "scm-global": "글로벌 SCM",
  "scm-case-study": "SCM 사례 연구",
  "scm-quick-wins": "SCM 실무 Quick Wins",
};

interface SeriesNavProps {
  currentSlug: string;
  series: string;
  seriesPosts: PostMeta[];
}

export function SeriesNav({ currentSlug, series, seriesPosts }: SeriesNavProps) {
  if (seriesPosts.length <= 1) return null;

  const label = SERIES_LABELS[series] ?? series;

  return (
    <nav className="mt-12 rounded-lg border border-gray-200 bg-gray-50 p-6">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">
        {label} 시리즈
      </h3>
      <ol className="space-y-2">
        {seriesPosts.map((post, i) => {
          const isCurrent = post.slug === currentSlug;
          return (
            <li key={post.slug} className="flex items-start gap-3">
              <span
                className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-medium ${
                  isCurrent
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {i + 1}
              </span>
              {isCurrent ? (
                <span className="font-medium text-gray-900">{post.title}</span>
              ) : (
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-gray-600 hover:text-blue-600"
                >
                  {post.title}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
