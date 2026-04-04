import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllSlugs, getPostBySlug, getSeriesPosts, getRelatedPosts } from "@/lib/mdx";
import { mdxComponents } from "@/components/MDXComponents";
import { SeriesNav } from "@/components/SeriesNav";
import { RelatedPosts } from "@/components/RelatedPosts";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.meta.title,
    description: post.meta.description,
    openGraph: {
      title: post.meta.title,
      description: post.meta.description,
      type: "article",
      publishedTime: post.meta.date,
      tags: post.meta.tags,
    },
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const seriesPosts = post.meta.series
    ? getSeriesPosts(post.meta.series)
    : [];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.meta.title,
    description: post.meta.description,
    datePublished: post.meta.date,
    author: {
      "@type": "Person",
      name: "Won",
    },
    publisher: {
      "@type": "Organization",
      name: "SCM Blog",
    },
    keywords: post.meta.tags.join(", "),
    url: `https://porock8409-pixel.github.io/scm-blog/blog/${slug}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://porock8409-pixel.github.io/scm-blog/blog/${slug}`,
    },
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="mb-10">
        <time className="text-sm text-gray-500">{post.meta.date}</time>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          {post.meta.title}
        </h1>
        <p className="mt-3 text-gray-600">{post.meta.description}</p>
        <div className="mt-4 flex items-center gap-3">
          <span className="text-sm text-gray-400">{post.meta.readingTime}</span>
          {post.meta.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      <div className="prose prose-gray max-w-none">
        <MDXRemote source={post.content} components={mdxComponents} />
      </div>

      {post.meta.series && seriesPosts.length > 1 && (
        <SeriesNav
          currentSlug={slug}
          series={post.meta.series}
          seriesPosts={seriesPosts}
        />
      )}

      <RelatedPosts posts={getRelatedPosts(slug)} />
    </article>
  );
}
