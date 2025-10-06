import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center border-b sticky top-0 bg-background/95 z-50">
      <Link href="/" className="flex items-center justify-center" prefetch={false}>
          <span className="text-xl font-bold">ZeroToOne</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Button asChild>
          <Link href="/login">Login</Link>
        </Button>
      </nav>
    </header>
  );
}
