import Link from "next/link";
import { getAllPosts } from "@/lib/mdx";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div>
      <section className="mb-16">
        <h1 className="mb-4 text-3xl font-bold tracking-tight">
          SCM 실무 지식을 쉽게 풀어서
        </h1>
        <p className="text-lg leading-relaxed text-gray-600">
          공급망 관리, 물류, 구매, 재고 관리 등 현장에서 얻은 인사이트를
          공유합니다.
        </p>
      </section>

      <section>
        <h2 className="mb-6 text-xl font-semibold">최근 글</h2>
        {posts.length === 0 ? (
          <p className="text-gray-500">아직 글이 없습니다.</p>
        ) : (
          <ul className="space-y-8">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="group block">
                  <time className="text-sm text-gray-500">{post.date}</time>
                  <h3 className="mt-1 text-lg font-medium group-hover:text-blue-600">
                    {post.title}
                  </h3>
                  <p className="mt-1 text-gray-600">{post.description}</p>
                  <div className="mt-2 flex items-center gap-3">
                    <span className="text-xs text-gray-400">
                      {post.readingTime}
                    </span>
                    {post.tags.map((tag) => (
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
      </section>
    </div>
  );
}
