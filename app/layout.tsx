import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "SCM Blog - 공급망 관리 실무 지식",
    template: "%s | SCM Blog",
  },
  description:
    "SCM 실무 지식을 쉽게 풀어서 전달합니다. 공급망 관리, 물류, 구매, 재고 관리 등 현장 경험 기반의 인사이트.",
  metadataBase: new URL("https://scm-blog.vercel.app"),
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "SCM Blog",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "SCM Blog",
              description:
                "SCM 실무 지식을 쉽게 풀어서 전달합니다. 공급망 관리, 물류, 구매, 재고 관리 등 현장 경험 기반의 인사이트.",
              url: "https://scm-blog.vercel.app",
              inLanguage: "ko",
              publisher: {
                "@type": "Organization",
                name: "SCM Blog",
              },
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-white font-sans text-gray-900 antialiased">
        <div className="mx-auto flex min-h-screen max-w-2xl flex-col px-6">
          <Header />
          <main className="flex-1 py-10">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
