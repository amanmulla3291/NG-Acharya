import type { ReactNode } from 'react';
import Breadcrumb from './Breadcrumb';
import { cn } from '@/utils/cn';

interface PageLayoutProps {
  title: string;
  subtitle?: string;
  breadcrumbItems?: { label: string; href?: string }[];
  heroClassName?: string;
  children: ReactNode;
}

export default function PageLayout({
  title,
  subtitle,
  breadcrumbItems,
  heroClassName,
  children,
}: PageLayoutProps) {
  return (
    <>
      {/* ── Page Hero ── */}
      <section className={cn(
        'bg-hero-gradient text-white py-14 md:py-20',
        heroClassName
      )}>
        <div className="max-w-7xl mx-auto px-4">
          <Breadcrumb
            items={breadcrumbItems}
            className="text-navy-300 mb-6 [&_a]:text-navy-300 [&_a:hover]:text-white"
          />
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-balance">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 text-navy-200 text-lg max-w-2xl">{subtitle}</p>
          )}
        </div>
      </section>

      {/* ── Content ── */}
      <main className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        {children}
      </main>
    </>
  );
}
