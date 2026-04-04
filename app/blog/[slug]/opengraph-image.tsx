import { ImageResponse } from "next/og";
import { getPostBySlug, getAllSlugs } from "@/lib/mdx";

export const alt = "SCM Blog";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  const title = post?.meta.title ?? "SCM Blog";
  const category = post?.meta.category ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#ffffff",
          fontFamily: "sans-serif",
          padding: "60px 80px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {category && (
            <div
              style={{
                fontSize: 22,
                color: "#3b82f6",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              {category}
            </div>
          )}
          <div
            style={{
              fontSize: title.length > 30 ? 44 : 52,
              fontWeight: 700,
              color: "#111827",
              letterSpacing: "-0.025em",
              lineHeight: 1.2,
              maxWidth: "900px",
            }}
          >
            {title}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: "#111827",
            }}
          >
            SCM Blog
          </div>
          <div
            style={{
              fontSize: 20,
              color: "#9ca3af",
            }}
          >
            porock8409-pixel.github.io/scm-blog
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
