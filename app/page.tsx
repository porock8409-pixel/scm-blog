import Link from "next/link";
import { getAllPosts, getAllSeries } from "@/lib/mdx";

export default function Home() {
  const posts = getAllPosts();
  const series = getAllSeries();
  const recentPosts = posts.slice(0, 5);

  return (
    <div>
      {/* Hero */}
      <section className="mb-16">
        <h1 className="mb-4 text-3xl font-bold tracking-tight">
          SCM 실무 지식을 쉽게 풀어서
        </h1>
        <p className="text-lg leading-relaxed text-gray-600">
          공급망 관리, 물류, 구매, 재고 관리 등 현장에서 얻은 인사이트를
          공유합니다.
        </p>
        <p className="mt-2 text-sm text-gray-400">
          {series.length}개 시리즈 / {posts.length}편의 글
        </p>
      </section>

      {/* Series Grid */}
      <section className="mb-16">
        <h2 className="mb-6 text-xl font-semibold">시리즈</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {series.map((s) => (
            <Link
              key={s.id}
              href={`/blog/${s.firstSlug}`}
              className="group rounded-lg border border-gray-200 p-4 transition-colors hover:border-blue-300 hover:bg-blue-50/50"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-medium group-hover:text-blue-600">
                  {s.label}
                </h3>
                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
                  {s.postCount}편
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-500">{s.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent Posts */}
      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">최근 글</h2>
          <Link
            href="/blog"
            className="text-sm text-gray-500 hover:text-blue-600"
          >
            전체 보기 &rarr;
          </Link>
        </div>
        <ul className="space-y-6">
          {recentPosts.map((post) => (
            <li
              key={post.slug}
              className="border-b border-gray-100 pb-6 last:border-0"
            >
              <Link href={`/blog/${post.slug}`} className="group block">
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <time>{post.date}</time>
                  <span>{post.readingTime}</span>
                </div>
                <h3 className="mt-1 text-lg font-medium group-hover:text-blue-600">
                  {post.title}
                </h3>
                <p className="mt-1 text-gray-600">{post.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
