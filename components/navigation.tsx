import { Button } from '@/components/ui/button';
import { Shield } from 'lucide-react';
import Link from 'next/link';

export function Navigation() {
  return (
    <nav
      className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 bg-background/75 backdrop-blur-sm shadow-lg`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">GuardiAgent</span>
          </div>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <Link href="/#vision" className="text-foreground hover:text-primary transition-colors">
            Vision
          </Link>
          <Link href="/developers" className="text-foreground hover:text-primary transition-colors">
            For Developers
          </Link>
          <Link href="/researchers" className="text-foreground hover:text-primary transition-colors">
            Our Research
          </Link>
          <Link href="/#newsletter" className="text-foreground hover:text-primary transition-colors">
            <Button className="cursor-pointer" size="sm">
              Stay In Touch
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
