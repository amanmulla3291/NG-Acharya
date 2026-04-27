import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/utils/cn';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  className?: string;
}

function formatLabel(segment: string): string {
  return segment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default function Breadcrumb({ items, className }: BreadcrumbProps) {
  const location = useLocation();

  const crumbs: BreadcrumbItem[] = items ?? (() => {
    const segments = location.pathname.split('/').filter(Boolean);
    return segments.map((seg, i) => ({
      label: formatLabel(seg),
      href: i < segments.length - 1 ? '/' + segments.slice(0, i + 1).join('/') : undefined,
    }));
  })();

  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center gap-1.5 text-sm', className)}>
      <Link to="/" className="flex items-center gap-1 text-navy-400 hover:text-navy-700 transition-colors">
        <Home size={13} />
        <span className="sr-only">Home</span>
      </Link>
      {crumbs.map((crumb, i) => (
        <div key={i} className="flex items-center gap-1.5">
          <ChevronRight size={13} className="text-gray-300" />
          {crumb.href ? (
            <Link to={crumb.href} className="text-navy-400 hover:text-navy-700 transition-colors">
              {crumb.label}
            </Link>
          ) : (
            <span className="text-navy-700 font-medium">{crumb.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}
