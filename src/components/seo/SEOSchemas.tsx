import React from 'react';
import { Page } from '../../App';
import { HYDRAOProductSchema } from './ProductSchema';
import { HYDRAOFAQSchema } from './FAQSchema';
import { AutoBreadcrumbSchema } from './BreadcrumbSchema';
import { LocalBusinessSchema, OrganizationSchema } from './LocalBusinessSchema';

interface SEOSchemasProps {
  currentPage: Page;
}

export function SEOSchemas({ currentPage }: SEOSchemasProps) {
  // Pages qui affichent le product schema
  const productPages: Page[] = ['home', 'product', 'gamme', 'configurator', 'shop'];
  
  // Pages qui affichent le FAQ schema
  const faqPages: Page[] = ['faq', 'home', 'objections'];

  return (
    <>
      {/* Organization schema - sur toutes les pages */}
      <OrganizationSchema />

      {/* Breadcrumb schema - sur toutes les pages */}
      <AutoBreadcrumbSchema currentPage={currentPage} />

      {/* Product schema - pages produit */}
      {productPages.includes(currentPage) && <HYDRAOProductSchema />}

      {/* FAQ schema - pages FAQ */}
      {faqPages.includes(currentPage) && <HYDRAOFAQSchema />}

      {/* Local Business schema - page contact/installers */}
      {(currentPage === 'installers' || currentPage === 'support') && (
        <LocalBusinessSchema />
      )}
    </>
  );
}
