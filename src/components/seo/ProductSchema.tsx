import React from 'react';
import { Helmet } from 'react-helmet';
import chromeFaucet from '../../assets/products/chrome-faucet.png';

interface ProductSchemaProps {
  name: string;
  description: string;
  image: string;
  price: number;
  priceCurrency?: string;
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder';
  condition?: 'NewCondition' | 'UsedCondition' | 'RefurbishedCondition';
  brand?: string;
  sku?: string;
  gtin?: string;
  rating?: {
    value: number;
    count: number;
    bestRating?: number;
    worstRating?: number;
  };
  reviews?: Array<{
    author: string;
    datePublished: string;
    reviewBody: string;
    reviewRating: number;
  }>;
  url?: string;
}

export function ProductSchema({
  name,
  description,
  image,
  price,
  priceCurrency = 'EUR',
  availability = 'InStock',
  condition = 'NewCondition',
  brand = 'HYDRAL',
  sku,
  gtin,
  rating,
  reviews,
  url = typeof window !== 'undefined' ? window.location.href : ''
}: ProductSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image,
    brand: {
      '@type': 'Brand',
      name: brand
    },
    offers: {
      '@type': 'Offer',
      url,
      priceCurrency,
      price: price.toFixed(2),
      priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // +1 an
      availability: `https://schema.org/${availability}`,
      itemCondition: `https://schema.org/${condition}`,
      seller: {
        '@type': 'Organization',
        name: 'HYDRAL'
      }
    },
    ...(sku && { sku }),
    ...(gtin && { gtin13: gtin }),
    ...(rating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: rating.value.toFixed(1),
        reviewCount: rating.count,
        bestRating: rating.bestRating || 5,
        worstRating: rating.worstRating || 1
      }
    }),
    ...(reviews && reviews.length > 0 && {
      review: reviews.map(review => ({
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: review.author
        },
        datePublished: review.datePublished,
        reviewBody: review.reviewBody,
        reviewRating: {
          '@type': 'Rating',
          ratingValue: review.reviewRating,
          bestRating: 5,
          worstRating: 1
        }
      }))
    })
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}

// Composant pré-configuré pour HYDRAL Robinet 5-en-1
export function HYDRALProductSchema() {
  return (
    <ProductSchema
      name="HYDRAL Robinet Multifonction Cuisine 5-en-1 — Eau Bouillante, Gazeuse, Filtrée"
      description="Robinet multifonction cuisine 5-en-1 HYDRAL : eau bouillante instantanée, gazeuse, filtrée, chaude et froide. Alternative Quooker dès 490€, jusqu'à 3x moins cher. Robinet eau bouillante et gazeuse premium pour cuisine."
      image={chromeFaucet}
      price={490}
      priceCurrency="EUR"
      availability="InStock"
      condition="NewCondition"
      brand="HYDRAL"
      sku="HYDRAL-5EN1-PURE"
      rating={{
        value: 4.9,
        count: 47,
        bestRating: 5,
        worstRating: 1
      }}
      reviews={[
        {
          author: 'Sophie Martin',
          datePublished: '2026-03-15',
          reviewBody: 'Meilleure alternative au Quooker ! Robinet eau bouillante instantanée parfait. Plus besoin d\'acheter de l\'eau en bouteille. L\'eau gazeuse est excellente et le prix imbattable à 490€.',
          reviewRating: 5
        },
        {
          author: 'Marc Dubois',
          datePublished: '2026-03-10',
          reviewBody: 'Robinet multifonction cuisine top qualité. Installation facile du robinet 5-en-1, eau filtrée impeccable. Rentabilisé en moins d\'un an vs eau en bouteille.',
          reviewRating: 5
        },
        {
          author: 'Claire Rousseau',
          datePublished: '2026-03-05',
          reviewBody: 'Robinet eau bouillante et gazeuse au top. Design élégant, qualité premium. Vraie alternative Quooker à un prix raisonnable. Je recommande ce robinet 5-en-1.',
          reviewRating: 4
        }
      ]}
    />
  );
}
