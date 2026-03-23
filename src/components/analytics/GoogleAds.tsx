import { useEffect } from 'react';
import { useRouter } from 'next/router';

interface GoogleAdsProps {
  conversionId: string;
}

// Declare gtag function for TypeScript
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'set',
      targetId: string,
      config?: Record<string, any>
    ) => void;
    dataLayer: any[];
  }
}

export function GoogleAds({ conversionId }: GoogleAdsProps) {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Initialize dataLayer
      window.dataLayer = window.dataLayer || [];
      window.gtag = function() {
        window.dataLayer.push(arguments);
      };

      // Load Google Ads script
      const script1 = document.createElement('script');
      script1.async = true;
      script1.src = `https://www.googletagmanager.com/gtag/js?id=${conversionId}`;
      document.head.appendChild(script1);

      // Initialize Google Ads
      const script2 = document.createElement('script');
      script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${conversionId}');
      `;
      document.head.appendChild(script2);

      // Track route changes
      const handleRouteChange = (url: string) => {
        window.gtag('config', conversionId, {
          page_path: url,
        });
      };

      router.events.on('routeChangeComplete', handleRouteChange);

      return () => {
        router.events.off('routeChangeComplete', handleRouteChange);
      };
    }
  }, [conversionId, router.events]);

  return null;
}

// Helper function to track conversion
export const trackGoogleConversion = (
  conversionLabel: string,
  value?: number,
  currency?: string
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: conversionLabel,
      value: value,
      currency: currency,
    });
  }
};

// Helper function to track custom event
export const trackGoogleEvent = (
  eventName: string,
  parameters?: Record<string, any>
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
  }
};

// Predefined remarketing audiences
export const googleAudienceIds = {
  // All visitors
  allVisitors: 'all_visitors',
  
  // Product page viewers
  productViewers: 'product_viewers',
  
  // Cart abandoners (added to cart but didn't purchase)
  cartAbandoners: 'cart_abandoners',
  
  // Checkout abandoners (started checkout but didn't complete)
  checkoutAbandoners: 'checkout_abandoners',
  
  // Calculator users (engaged but didn't add to cart)
  calculatorUsers: 'calculator_users',
  
  // High-value visitors (spent >3min or viewed >5 pages)
  highValueVisitors: 'high_value_visitors',
  
  // Converters (completed purchase)
  converters: 'converters',
  
  // Referrers (generated referral code)
  referrers: 'referrers',
  
  // Social sharers
  socialSharers: 'social_sharers',
};

// Predefined Google Ads events
export const googleAdsEvents = {
  // Page view
  pageView: (pagePath: string, pageTitle: string) => {
    trackGoogleEvent('page_view', {
      page_path: pagePath,
      page_title: pageTitle,
    });
  },

  // Product viewed
  viewItem: (productId: string, productName: string, value: number, currency: string) => {
    trackGoogleEvent('view_item', {
      items: [{
        item_id: productId,
        item_name: productName,
      }],
      value: value,
      currency: currency,
    });
  },

  // Product added to cart
  addToCart: (productId: string, productName: string, value: number, currency: string) => {
    trackGoogleEvent('add_to_cart', {
      items: [{
        item_id: productId,
        item_name: productName,
      }],
      value: value,
      currency: currency,
    });
  },

  // Checkout began
  beginCheckout: (value: number, currency: string, items: any[]) => {
    trackGoogleEvent('begin_checkout', {
      value: value,
      currency: currency,
      items: items,
    });
  },

  // Payment info added
  addPaymentInfo: (value: number, currency: string, paymentType: string) => {
    trackGoogleEvent('add_payment_info', {
      value: value,
      currency: currency,
      payment_type: paymentType,
    });
  },

  // Purchase completed
  purchase: (
    transactionId: string,
    value: number,
    currency: string,
    items: any[],
    tax?: number,
    shipping?: number
  ) => {
    trackGoogleEvent('purchase', {
      transaction_id: transactionId,
      value: value,
      currency: currency,
      tax: tax,
      shipping: shipping,
      items: items,
    });
  },

  // Lead form submitted
  generateLead: (value: number, currency: string) => {
    trackGoogleEvent('generate_lead', {
      value: value,
      currency: currency,
    });
  },

  // Search performed
  search: (searchTerm: string) => {
    trackGoogleEvent('search', {
      search_term: searchTerm,
    });
  },

  // Calculator used
  calculator: (savingsAmount: number) => {
    trackGoogleEvent('calculator_used', {
      savings_amount: savingsAmount,
      event_category: 'engagement',
      event_label: 'savings_calculator',
    });
  },

  // Video watched
  videoWatch: (videoTitle: string, percentageWatched: number) => {
    trackGoogleEvent('video_progress', {
      video_title: videoTitle,
      video_percent: percentageWatched,
      event_category: 'engagement',
    });
  },

  // Referral generated
  referral: (code: string) => {
    trackGoogleEvent('generate_referral', {
      referral_code: code,
      event_category: 'engagement',
    });
  },

  // Social share
  share: (method: string, contentType: string) => {
    trackGoogleEvent('share', {
      method: method,
      content_type: contentType,
      event_category: 'engagement',
    });
  },

  // Sign up
  signUp: (method: string) => {
    trackGoogleEvent('sign_up', {
      method: method,
    });
  },

  // Login
  login: (method: string) => {
    trackGoogleEvent('login', {
      method: method,
    });
  },

  // Custom remarketing tag
  remarketing: (audienceId: string, customParams?: Record<string, any>) => {
    trackGoogleEvent('remarketing', {
      audience_id: audienceId,
      ...customParams,
    });
  },
};

// Dynamic remarketing parameters
export const setDynamicRemarketingParams = (params: {
  ecomm_prodid?: string[];
  ecomm_pagetype?: 'home' | 'product' | 'cart' | 'purchase' | 'other';
  ecomm_totalvalue?: number;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('set', 'user_data', params);
  }
};

// Enhanced conversions (for better tracking)
export const setUserData = (userData: {
  email?: string;
  phone_number?: string;
  first_name?: string;
  last_name?: string;
  country?: string;
  postal_code?: string;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('set', 'user_data', userData);
  }
};
