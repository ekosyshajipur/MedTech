import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbsProps {
  items: {
    label: string;
    href?: string;
  }[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="py-4 overflow-x-auto whitespace-nowrap">
      <ol className="flex items-center gap-2 text-sm text-gray-600 min-w-min">
        <li>
          <Link href="/" className="flex items-center hover:text-emerald-600 transition-colors">
            <Home className="w-4 h-4" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <li key={item.label} className="flex items-center gap-2">
              <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
              {isLast || !item.href ? (
                <span className="font-medium text-gray-900 truncate max-w-[200px] md:max-w-none" aria-current={isLast ? 'page' : undefined}>
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="hover:text-emerald-600 transition-colors truncate max-w-[150px] md:max-w-none">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
