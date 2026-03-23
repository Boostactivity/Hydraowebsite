import React from 'react';
import { Helmet } from 'react-helmet';
import chromeFaucet from '../../assets/products/chrome-faucet.png';

interface LocalBusinessSchemaProps {
  name?: string;
  description?: string;
  telephone?: string;
  email?: string;
  address?: {
    streetAddress: string;
    addressLocality: string;
    postalCode: string;
    addressCountry: string;
  };
  geo?: {
    latitude: number;
    longitude: number;
  };
  openingHours?: string[];
  priceRange?: string;
  rating?: {
    value: number;
    count: number;
  };
}

export function LocalBusinessSchema({
  name = 'HYDRAL France',
  description = 'Robinets intelligents 5-en-1 haut de gamme : eau filtrée, pétillante, bouillante. Showroom et installation professionnelle en France.',
  telephone = '+33 1 76 34 00 00',
  email = 'contact@hydral.fr',
  address = {
    streetAddress: '123 Avenue des Champs-Élysées',
    addressLocality: 'Paris',
    postalCode: '75008',
    addressCountry: 'FR'
  },
  geo = {
    latitude: 48.8566,
    longitude: 2.3522
  },
  openingHours = [
    'Mo-Fr 09:00-18:00',
    'Sa 10:00-17:00'
  ],
  priceRange = '€€€',
  rating = {
    value: 4.9,
    count: 523
  }
}: LocalBusinessSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://hydral.fr',
    name,
    description,
    image: chromeFaucet,
    telephone,
    email,
    url: 'https://hydral.fr',
    address: {
      '@type': 'PostalAddress',
      streetAddress: address.streetAddress,
      addressLocality: address.addressLocality,
      postalCode: address.postalCode,
      addressCountry: address.addressCountry
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: geo.latitude,
      longitude: geo.longitude
    },
    openingHoursSpecification: openingHours.map(hours => {
      const [days, time] = hours.split(' ');
      const [opens, closes] = time.split('-');
      
      // Parse days (Mo-Fr -> Monday to Friday)
      const dayMap: Record<string, string> = {
        'Mo': 'Monday',
        'Tu': 'Tuesday',
        'We': 'Wednesday',
        'Th': 'Thursday',
        'Fr': 'Friday',
        'Sa': 'Saturday',
        'Su': 'Sunday'
      };

      if (days.includes('-')) {
        const [start, end] = days.split('-');
        return {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: [dayMap[start], dayMap[end]],
          opens,
          closes
        };
      }

      return {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: dayMap[days],
        opens,
        closes
      };
    }),
    priceRange,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: rating.value.toFixed(1),
      reviewCount: rating.count,
      bestRating: 5,
      worstRating: 1
    },
    paymentAccepted: 'Cash, Credit Card, Debit Card, PayPal, Bank Transfer',
    currenciesAccepted: 'EUR',
    areaServed: {
      '@type': 'Country',
      name: 'France'
    },
    hasMap: `https://www.google.com/maps?q=${geo.latitude},${geo.longitude}`,
    sameAs: [
      'https://www.facebook.com/hydral',
      'https://www.instagram.com/hydral',
      'https://www.linkedin.com/company/hydral',
      'https://twitter.com/hydral'
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}

// Organisation Schema (pour toutes les pages)
export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://hydral.fr/#organization',
    name: 'HYDRAL',
    legalName: 'HYDRAL SAS',
    url: 'https://hydral.fr',
    logo: 'https://hydral.fr/logo.png',
    description: 'Leader français des robinets intelligents 5-en-1 pour une cuisine moderne, écologique et économique.',
    foundingDate: '2019',
    founders: [
      {
        '@type': 'Person',
        name: 'Gabriel Della-Monica'
      }
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+33 1 76 34 00 00',
      contactType: 'Customer Service',
      email: 'contact@hydral.fr',
      areaServed: 'FR',
      availableLanguage: ['French', 'English']
    },
    sameAs: [
      'https://www.facebook.com/hydral',
      'https://www.instagram.com/hydral',
      'https://www.linkedin.com/company/hydral',
      'https://twitter.com/hydral'
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Avenue des Champs-Élysées',
      addressLocality: 'Paris',
      postalCode: '75008',
      addressCountry: 'FR'
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}
