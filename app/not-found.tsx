import Link from "next/link";
import { getAllPosts } from "@/lib/mdx";

export default function NotFound() {
  const recentPosts = getAllPosts().slice(0, 5);

  return (
    <div className="py-12">
      <div className="mb-12 text-center">
        <h1 className="text-5xl font-bold text-gray-900">404</h1>
        <p className="mt-4 text-lg text-gray-600">
          페이지를 찾을 수 없습니다.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <Link
            href="/"
            className="rounded-lg bg-gray-900 px-4 py-2 text-sm text-white hover:bg-gray-700"
          >
            홈으로
          </Link>
          <Link
            href="/search"
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            검색하기
          </Link>
          <Link
            href="/blog"
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            글 목록
          </Link>
        </div>
      </div>

      {recentPosts.length > 0 && (
        <section>
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            이런 글은 어떠세요?
          </h2>
          <ul className="space-y-4">
            {recentPosts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block rounded-lg border border-gray-100 p-4 hover:border-blue-200 hover:bg-blue-50/30"
                >
                  <h3 className="font-medium group-hover:text-blue-600">
                    {post.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {post.description}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
