import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-gray-200 py-8">
      <div className="flex flex-col items-center gap-4 text-sm text-gray-500">
        <nav className="flex gap-6">
          <Link href="/blog" className="hover:text-gray-900">
            글 목록
          </Link>
          <Link href="/search" className="hover:text-gray-900">
            검색
          </Link>
          <Link href="/about" className="hover:text-gray-900">
            소개
          </Link>
          <Link href="/feed.xml" className="hover:text-gray-900">
            RSS
          </Link>
        </nav>
        <p className="text-center text-xs text-gray-400">
          SCM 실무 지식을 쉽게 풀어서, 사람들이 찾아오는 블로그
        </p>
        <p className="text-xs text-gray-400">
          &copy; {new Date().getFullYear()} SCM Blog
        </p>
      </div>
    </footer>
  );
}
