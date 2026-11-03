import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-line text-sm text-muted">
      <div className="mx-auto grid max-w-5xl gap-6 px-4 py-8 sm:grid-cols-3">
        <p>
          Templates and information, not legal advice. We are not a law firm and are not
          affiliated with the stores and services we write about.
        </p>
        <nav aria-label="About" className="flex flex-col gap-1">
          <Link href="/about/">About</Link>
          <Link href="/methodology/">How we verify</Link>
          <Link href="/editorial-policy/">Editorial policy</Link>
        </nav>
        <p>© {new Date().getFullYear()} refund-return.com</p>
      </div>
    </footer>
  );
}
