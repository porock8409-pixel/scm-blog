import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "소개",
  description: "SCM Blog 소개 페이지입니다.",
};

export default function About() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold tracking-tight">소개</h1>
      <div className="space-y-4 leading-7 text-gray-700">
        <p>
          SCM Blog는 공급망 관리(Supply Chain Management) 실무 지식을 쉽게
          풀어서 전달하는 블로그입니다.
        </p>
        <p>
          현장에서 겪은 경험과 배운 것들을 정리해서, SCM에 관심 있는 분들이
          실질적인 도움을 받을 수 있도록 글을 씁니다.
        </p>
        <p>
          다루는 주제: 공급망 전략, 구매/조달, 물류, 재고 관리, S&amp;OP, 디지털
          SCM, 그리고 현장의 이야기들.
        </p>
      </div>
    </div>
  );
}
