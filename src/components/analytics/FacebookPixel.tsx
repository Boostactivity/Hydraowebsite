import { useEffect } from 'react';
import { useRouter } from 'next/router';

// Facebook Pixel events types
export type FacebookEvent = 
  | 'PageView'
  | 'ViewContent'
  | 'Search'
  | 'AddToCart'
  | 'AddToWishlist'
  | 'InitiateCheckout'
  | 'AddPaymentInfo'
  | 'Purchase'
  | 'Lead'
  | 'CompleteRegistration'
  | 'Contact'
  | 'CustomizeProduct'
  | 'FindLocation'
  | 'Schedule'
  | 'StartTrial'
  | 'SubmitApplication';

interface FacebookPixelProps {
  pixelId: string;
}

// Declare fbq function for TypeScript
declare global {
  interface Window {
    fbq: (
      type: 'track' | 'trackCustom' | 'init',
      event: string,
      data?: Record<string, any>
    ) => void;
  }
}

export function FacebookPixel({ pixelId }: FacebookPixelProps) {
  const router = useRouter();

  useEffect(() => {
    // Initialize Facebook Pixel
    if (typeof window !== 'undefined') {
      // Load Facebook Pixel script
      const script = document.createElement('script');
      script.innerHTML = `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${pixelId}');
        fbq('track', 'PageView');
      `;
      document.head.appendChild(script);

      // Track route changes
      const handleRouteChange = () => {
        window.fbq('track', 'PageView');
      };

      router.events.on('routeChangeComplete', handleRouteChange);

      return () => {
        router.events.off('routeChangeComplete', handleRouteChange);
      };
    }
  }, [pixelId, router.events]);

  return null;
}

// Helper functions to track events
export const trackFacebookEvent = (
  event: FacebookEvent,
  data?: Record<string, any>
) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', event, data);
  }
};

export const trackCustomEvent = (
  eventName: string,
  data?: Record<string, any>
) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('trackCustom', eventName, data);
  }
};

// Predefined tracking functions for common events
export const facebookPixelEvents = {
  // Product viewed
  viewContent: (productId: string, productName: string, value: number, currency: string) => {
    trackFacebookEvent('ViewContent', {
      content_ids: [productId],
      content_name: productName,
      content_type: 'product',
      value: value,
      currency: currency,
    });
  },

  // Product added to cart
  addToCart: (productId: string, productName: string, value: number, currency: string) => {
    trackFacebookEvent('AddToCart', {
      content_ids: [productId],
      content_name: productName,
      content_type: 'product',
      value: value,
      currency: currency,
    });
  },

  // Checkout initiated
  initiateCheckout: (value: number, currency: string, numItems: number) => {
    trackFacebookEvent('InitiateCheckout', {
      value: value,
      currency: currency,
      num_items: numItems,
    });
  },

  // Payment info added
  addPaymentInfo: (value: number, currency: string) => {
    trackFacebookEvent('AddPaymentInfo', {
      value: value,
      currency: currency,
    });
  },

  // Purchase completed
  purchase: (value: number, currency: string, orderId: string, contents: any[]) => {
    trackFacebookEvent('Purchase', {
      value: value,
      currency: currency,
      content_type: 'product',
      contents: contents,
      order_id: orderId,
    });
  },

  // Lead form submitted
  lead: (value: number, currency: string, content: string) => {
    trackFacebookEvent('Lead', {
      value: value,
      currency: currency,
      content_name: content,
    });
  },

  // Contact form submitted
  contact: () => {
    trackFacebookEvent('Contact');
  },

  // Calculator used
  calculator: (savingsAmount: number) => {
    trackCustomEvent('CalculatorUsed', {
      savings_amount: savingsAmount,
    });
  },

  // Savings calculator completed
  savingsCalculated: (annualSavings: number, roi: number) => {
    trackCustomEvent('SavingsCalculated', {
      annual_savings: annualSavings,
      roi_months: roi,
    });
  },

  // Video watched
  videoWatch: (videoId: string, percentage: number) => {
    trackCustomEvent('VideoWatch', {
      video_id: videoId,
      watch_percentage: percentage,
    });
  },

  // Referral code generated
  referralGenerated: (code: string) => {
    trackCustomEvent('ReferralCodeGenerated', {
      referral_code: code,
    });
  },

  // Social share
  socialShare: (platform: string) => {
    trackCustomEvent('SocialShare', {
      platform: platform,
    });
  },

  // Influencer application
  influencerApply: (tier: string, followers: number) => {
    trackCustomEvent('InfluencerApplication', {
      tier: tier,
      followers: followers,
    });
  },

  // FAQ interaction
  faqInteraction: (question: string) => {
    trackCustomEvent('FAQInteraction', {
      question: question,
    });
  },

  // Testimonial viewed
  testimonialViewed: (testimonialId: string) => {
    trackCustomEvent('TestimonialViewed', {
      testimonial_id: testimonialId,
    });
  },

  // Comparison viewed
  comparisonViewed: () => {
    trackCustomEvent('ComparisonViewed');
  },

  // CTA clicked
  ctaClicked: (ctaLocation: string, ctaText: string) => {
    trackCustomEvent('CTAClicked', {
      location: ctaLocation,
      text: ctaText,
    });
  },
};
