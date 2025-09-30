import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <Link href="/" className="flex items-center justify-center" prefetch={false}>
        <div className="flex items-center justify-center rounded-md bg-primary p-2">
            <span className="text-lg font-bold text-primary-foreground">ZeroToOne</span>
        </div>
        <span className="sr-only">ZeroToOne</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
        <Button asChild>
          <Link href="/login">Login</Link>
        </Button>
      </nav>
    </header>
  );
}
