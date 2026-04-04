import Link from "next/link";
import { getAllPosts, getAllSeries } from "@/lib/mdx";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "소개",
  description:
    "SCM Blog 소개 — 가구업체 SCM 실무 경험을 바탕으로 공급망 관리 지식을 쉽게 전달합니다.",
};

export default function About() {
  const posts = getAllPosts();
  const series = getAllSeries();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold tracking-tight">소개</h1>

      <div className="space-y-6 leading-7 text-gray-700">
        {/* Mission */}
        <section>
          <h2 className="mb-3 text-lg font-semibold text-gray-900">
            블로그 미션
          </h2>
          <p>
            <strong>SCM 실무 지식을 쉽게 풀어서, 사람들이 찾아오는 블로그를 만든다.</strong>
          </p>
          <p className="mt-2">
            SCM(Supply Chain Management)은 기업 운영의 핵심이지만, 현장에서
            배우지 않으면 이해하기 어렵습니다. 교과서의 이론과 현장의 실무
            사이에는 큰 간극이 있습니다. 이 블로그는 그 간극을 메우려고
            합니다.
          </p>
        </section>

        {/* Author */}
        <section>
          <h2 className="mb-3 text-lg font-semibold text-gray-900">
            글쓴이
          </h2>
          <p>
            가구 제조업체에서 SCM 실무를 경험한 사람입니다. 원자재 구매부터
            생산계획, 물류, 재고관리까지 — 공급망의 전 과정을 현장에서
            배웠습니다.
          </p>
          <p className="mt-2">
            처음 SCM 부서에 배정받았을 때 막막했던 기억이 있습니다. 주변에
            물어볼 사람은 적고, 인터넷에는 너무 이론적이거나 너무 피상적인
            글뿐이었습니다. 그때 &ldquo;현장 경험을 바탕으로 정말 도움이 되는
            글을 쓰고 싶다&rdquo;는 생각을 했고, 이 블로그가 그 결과입니다.
          </p>
        </section>

        {/* Who is this for */}
        <section>
          <h2 className="mb-3 text-lg font-semibold text-gray-900">
            누구를 위한 블로그인가
          </h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong>SCM 신입~주니어</strong> — 현장 용어가 어렵고, 업무의 큰
              그림이 안 보이는 분
            </li>
            <li>
              <strong>SCM 직무 전환 준비자</strong> — 영업, 생산, 재무 등에서
              SCM으로 이직을 고려하는 분
            </li>
            <li>
              <strong>컨설턴트/연구자</strong> — SCM 도메인 지식을 빠르게
              잡아야 하는 분
            </li>
          </ul>
        </section>

        {/* Content overview */}
        <section>
          <h2 className="mb-3 text-lg font-semibold text-gray-900">
            콘텐츠 안내
          </h2>
          <p>
            현재 <strong>{series.length}개 시리즈</strong>,{" "}
            <strong>{posts.length}편</strong>의 글이 있습니다.
          </p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {series.map((s) => (
              <Link
                key={s.id}
                href={`/blog/${s.firstSlug}`}
                className="flex items-center justify-between rounded border border-gray-200 px-3 py-2 text-sm hover:border-blue-300 hover:bg-blue-50/50"
              >
                <span className="font-medium text-gray-800">{s.label}</span>
                <span className="text-gray-400">{s.postCount}편</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Topics */}
        <section>
          <h2 className="mb-3 text-lg font-semibold text-gray-900">
            다루는 주제
          </h2>
          <p>
            SCM 기초 개념, 수요예측, 재고관리, 구매/조달, 생산계획, 물류,
            S&amp;OP, 디지털 전환, 글로벌 SCM, 커리어 가이드, 그리고 도요타,
            자라, 삼성, 쿠팡, 이케아 등 실제 기업 사례까지 폭넓게 다룹니다.
          </p>
        </section>

        {/* CTA */}
        <section className="rounded-lg border border-gray-200 bg-gray-50 p-6">
          <p className="font-medium text-gray-900">
            SCM이 처음이라면{" "}
            <Link href="/blog/scm-what-is-it" className="text-blue-600 hover:underline">
              &ldquo;SCM이 뭔지 5분만에 이해하기&rdquo;
            </Link>
            부터 시작해보세요.
          </p>
          <p className="mt-2 text-sm text-gray-500">
            전체 글은{" "}
            <Link href="/blog" className="text-blue-600 hover:underline">
              글 목록
            </Link>
            에서 카테고리별로 찾아볼 수 있습니다.
          </p>
        </section>
      </div>
    </div>
  );
}
