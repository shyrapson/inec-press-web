import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <nav className="flex items-center gap-2 bg-white rounded-full px-4 py-2 border border-gray-200 w-fit">
      <ChevronLeft className="w-5 h-5 text-election-text-secondary -rotate-90" />
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {item.path ? (
            <Link
              href={item.path}
              className="text-sm text-election-text-secondary hover:text-election-green transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-sm font-bold text-election-text-primary">
              {item.label}
            </span>
          )}
          {index < items.length - 1 && (
            <ChevronRight className="w-4 h-4 text-election-text-secondary" />
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumb;
