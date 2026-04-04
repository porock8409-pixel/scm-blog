import Link from "next/link";
import type { PostMeta } from "@/lib/mdx";

interface RelatedPostsProps {
  posts: PostMeta[];
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-12 border-t border-gray-200 pt-8">
      <h3 className="mb-4 text-lg font-semibold">관련 글</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group rounded-lg border border-gray-200 p-4 transition-colors hover:border-blue-300 hover:bg-blue-50/50"
          >
            <p className="text-xs text-gray-400">{post.category}</p>
            <h4 className="mt-1 font-medium leading-snug group-hover:text-blue-600">
              {post.title}
            </h4>
            <p className="mt-1 text-sm text-gray-500 line-clamp-2">
              {post.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
