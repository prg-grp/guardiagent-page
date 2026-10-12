'use client';

import { pillarMeta } from '@/components/pillar-badge';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { mainNav } from '@/lib/nav';
import { cn } from '@/lib/utils';
import { BookOpen, Menu, Shield } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function isActive(pathname: string, href: string) {
  return href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);
}

function PillarNavIcon({ pillar }: { pillar: 'bound' | 'spy' }) {
  const Icon = pillarMeta[pillar].icon;
  return <Icon className={cn('h-4 w-4', pillar === 'bound' ? 'text-bound' : 'text-spy')} aria-hidden />;
}

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Shield className="h-8 w-8 text-primary" />
      <span className="text-2xl font-bold text-foreground">GuardiAgent</span>
    </Link>
  );
}

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 right-0 left-0 z-50 bg-background/80 shadow-lg backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Logo />

        <div className="hidden items-center gap-2 lg:flex">
          <NavigationMenu viewport={false}>
            <NavigationMenuList>
              {mainNav.map((item) =>
                item.children ? (
                  <NavigationMenuItem key={item.href}>
                    <NavigationMenuTrigger
                      className={cn('cursor-pointer bg-transparent text-base', isActive(pathname, item.href) && 'text-primary')}
                    >
                      {item.label}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[22rem] gap-1 p-1">
                        {item.children.map((child) => {
                          const Icon = child.pillar ? pillarMeta[child.pillar].icon : BookOpen;
                          return (
                            <li key={child.href}>
                              <NavigationMenuLink asChild>
                                <Link href={child.href} className="flex flex-row items-start gap-3 rounded-md p-3">
                                  <Icon
                                    className={cn(
                                      'mt-0.5 h-5 w-5 shrink-0',
                                      child.pillar === 'bound' && 'text-bound',
                                      child.pillar === 'spy' && 'text-spy',
                                      !child.pillar && 'text-muted-foreground'
                                    )}
                                  />
                                  <span>
                                    <span className="block font-semibold">
                                      {child.label}
                                      {child.pillar && (
                                        <span
                                          className={cn(
                                            'ml-2 text-xs font-medium',
                                            child.pillar === 'bound' ? 'text-bound' : 'text-spy'
                                          )}
                                        >
                                          {pillarMeta[child.pillar].mode}
                                        </span>
                                      )}
                                    </span>
                                    <span className="block text-sm leading-snug text-muted-foreground">
                                      {child.description}
                                    </span>
                                  </span>
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          );
                        })}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ) : (
                  <NavigationMenuItem key={item.href}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={item.href}
                        className={cn(
                          'flex flex-row items-center gap-1.5 px-3 py-2 text-base transition-colors hover:text-primary',
                          isActive(pathname, item.href) && 'text-primary'
                        )}
                      >
                        {item.pillar && <PillarNavIcon pillar={item.pillar} />}
                        {item.label}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                )
              )}
            </NavigationMenuList>
          </NavigationMenu>
          <Button asChild size="sm">
            <Link href="/#contact">Stay in touch</Link>
          </Button>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="cursor-pointer lg:hidden" aria-label="Open menu">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[85vw] max-w-sm">
            <SheetHeader>
              <SheetTitle>
                <span className="flex items-center gap-2">
                  <Shield className="h-6 w-6 text-primary" /> GuardiAgent
                </span>
              </SheetTitle>
            </SheetHeader>
            <ul className="space-y-1 px-4">
              {mainNav.map((item) => (
                <li key={item.href}>
                  {item.children ? (
                    <>
                      <span className="block px-3 pt-4 pb-1 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                        {item.label}
                      </span>
                      <ul>
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <SheetClose asChild>
                              <Link
                                href={child.href}
                                className={cn(
                                  'flex items-center justify-between rounded-md px-3 py-2.5 text-base hover:bg-muted',
                                  pathname === child.href && 'bg-muted font-semibold'
                                )}
                              >
                                {child.label}
                                {child.pillar && (
                                  <span
                                    className={cn(
                                      'text-xs font-medium',
                                      child.pillar === 'bound' ? 'text-bound' : 'text-spy'
                                    )}
                                  >
                                    {pillarMeta[child.pillar].mode}
                                  </span>
                                )}
                              </Link>
                            </SheetClose>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <SheetClose asChild>
                      <Link
                        href={item.href}
                        className={cn(
                          'flex items-center justify-between rounded-md px-3 py-2.5 text-base hover:bg-muted',
                          isActive(pathname, item.href) && 'bg-muted font-semibold'
                        )}
                      >
                        {item.label}
                        {item.pillar && (
                          <span
                            className={cn('text-xs font-medium', item.pillar === 'bound' ? 'text-bound' : 'text-spy')}
                          >
                            {pillarMeta[item.pillar].mode}
                          </span>
                        )}
                      </Link>
                    </SheetClose>
                  )}
                </li>
              ))}
              <li className="pt-4">
                <SheetClose asChild>
                  <Button asChild className="w-full">
                    <Link href="/#contact">Stay in touch</Link>
                  </Button>
                </SheetClose>
              </li>
            </ul>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
