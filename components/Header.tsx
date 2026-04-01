import Link from "next/link";

export function Header() {
  return (
    <header className="flex items-center justify-between border-b border-gray-200 py-6">
      <Link href="/" className="text-xl font-bold tracking-tight">
        SCM Blog
      </Link>
      <nav className="flex gap-6 text-sm text-gray-600">
        <Link href="/blog" className="hover:text-gray-900">
          글 목록
        </Link>
        <Link href="/about" className="hover:text-gray-900">
          소개
        </Link>
      </nav>
    </header>
  );
}
