import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { Page } from '../../App';

interface BreadcrumbItem {
  label: string;
  page?: Page;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  navigate: (page: Page) => void;
}

export function Breadcrumbs({ items, navigate }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex items-center gap-2 text-sm">
        {/* Home */}
        <li>
          <button
            onClick={() => navigate('home')}
            className="flex items-center gap-2 text-[#6B5E54] hover:text-[#6B1E3E] transition-colors"
          >
            <Home className="w-4 h-4" />
            <span className="sr-only">Accueil</span>
          </button>
        </li>

        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            <ChevronRight className="w-4 h-4 text-gray-400" />
            {item.page ? (
              <button
                onClick={() => navigate(item.page!)}
                className="text-[#6B5E54] hover:text-[#6B1E3E] transition-colors"
              >
                {item.label}
              </button>
            ) : (
              <span className="text-gray-900 font-medium">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
