import Link from "next/link";
import { Suspense } from "react";
import { getAllPosts, getAllCategories } from "@/lib/mdx";
import { CategoryFilter } from "@/components/CategoryFilter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "글 목록",
  description: "SCM Blog의 전체 글 목록입니다.",
};

interface Props {
  searchParams: Promise<{ category?: string }>;
}

export default async function BlogIndex({ searchParams }: Props) {
  const { category } = await searchParams;
  const allPosts = getAllPosts();
  const categories = getAllCategories();
  const posts = category
    ? allPosts.filter((p) => p.category === category)
    : allPosts;

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold tracking-tight">글 목록</h1>
      <Suspense>
        <CategoryFilter categories={categories} />
      </Suspense>
      {posts.length === 0 ? (
        <p className="text-gray-500">해당 카테고리에 글이 없습니다.</p>
      ) : (
        <>
          <p className="mb-6 text-sm text-gray-400">
            {category ? `${posts.length}편` : `전체 ${posts.length}편`}
          </p>
          <ul className="space-y-6">
            {posts.map((post) => (
              <li
                key={post.slug}
                className="border-b border-gray-100 pb-6 last:border-0"
              >
                <Link href={`/blog/${post.slug}`} className="group block">
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <time>{post.date}</time>
                    <span>{post.readingTime}</span>
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
        </>
      )}
    </div>
  );
}
