import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Coffee, Moon, Sun, Sunset, Clock } from 'lucide-react';

type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'night';

interface TimeMessage {
  timeOfDay: TimeOfDay;
  greeting: string;
  heroMessage: string;
  ctaMessage: string;
  useCaseHighlight: {
    icon: typeof Coffee;
    title: string;
    description: string;
  };
}

const TIME_MESSAGES: Record<TimeOfDay, TimeMessage> = {
  morning: {
    timeOfDay: 'morning',
    greeting: 'Bonjour',
    heroMessage: 'Votre café parfait dès le réveil',
    ctaMessage: 'Commencez bien la journée',
    useCaseHighlight: {
      icon: Coffee,
      title: 'Café instantané le matin',
      description: 'Eau bouillante en 3 secondes pour votre café. Plus besoin d\'attendre la bouilloire !'
    }
  },
  afternoon: {
    timeOfDay: 'afternoon',
    greeting: 'Bon après-midi',
    heroMessage: 'Hydratation optimale toute la journée',
    ctaMessage: 'Restez hydraté',
    useCaseHighlight: {
      icon: Sun,
      title: 'Eau fraîche et pétillante',
      description: 'Eau filtrée ou pétillante à volonté pour rester hydraté tout l\'après-midi'
    }
  },
  evening: {
    timeOfDay: 'evening',
    greeting: 'Bonsoir',
    heroMessage: 'Votre tisane relaxante en 3 secondes',
    ctaMessage: 'Détendez-vous',
    useCaseHighlight: {
      icon: Sunset,
      title: 'Tisane du soir',
      description: 'Eau chaude instantanée pour votre tisane détente. Le rituel parfait avant de dormir'
    }
  },
  night: {
    timeOfDay: 'night',
    greeting: 'Bonne soirée',
    heroMessage: 'Découvrez HYDRAO à votre rythme',
    ctaMessage: 'Explorer tranquillement',
    useCaseHighlight: {
      icon: Moon,
      title: 'Confort nocturne',
      description: 'Mode silencieux pour ne pas réveiller la famille. Eau chaude instantanée même la nuit'
    }
  }
};

export function TimeBasedMessaging() {
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('morning');
  const [currentMessage, setCurrentMessage] = useState<TimeMessage>(TIME_MESSAGES.morning);

  useEffect(() => {
    const detectTimeOfDay = (): TimeOfDay => {
      const hour = new Date().getHours();
      
      if (hour >= 5 && hour < 12) return 'morning';
      if (hour >= 12 && hour < 17) return 'afternoon';
      if (hour >= 17 && hour < 22) return 'evening';
      return 'night';
    };

    const detected = detectTimeOfDay();
    setTimeOfDay(detected);
    setCurrentMessage(TIME_MESSAGES[detected]);

    // Update every minute
    const interval = setInterval(() => {
      const newTimeOfDay = detectTimeOfDay();
      if (newTimeOfDay !== timeOfDay) {
        setTimeOfDay(newTimeOfDay);
        setCurrentMessage(TIME_MESSAGES[newTimeOfDay]);
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [timeOfDay]);

  return currentMessage;
}

// Composant pour afficher le greeting personnalisé
export function TimeBasedGreeting({ className = '' }: { className?: string }) {
  const message = TimeBasedMessaging();

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={className}
    >
      {message.greeting}
    </motion.span>
  );
}

// Composant pour le hero message
export function TimeBasedHero() {
  const message = TimeBasedMessaging();
  const Icon = message.useCaseHighlight.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center mb-8"
    >
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#6B1E3E]/10 rounded-full mb-4">
        <Clock className="w-4 h-4 text-[#6B1E3E]" />
        <span className="text-sm font-medium text-[#6B1E3E]">
          {message.greeting}
        </span>
      </div>

      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        {message.heroMessage}
      </h2>
    </motion.div>
  );
}

// Composant pour mettre en avant le use case du moment
export function TimeBasedUseCase() {
  const message = TimeBasedMessaging();
  const Icon = message.useCaseHighlight.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-gradient-to-br from-[#6B1E3E] to-[#8B2E4E] rounded-2xl p-6 text-white shadow-xl"
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-2">
            {message.useCaseHighlight.title}
          </h3>
          <p className="text-white/90 text-sm">
            {message.useCaseHighlight.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// CTA personnalisé selon l'heure
export function TimeBasedCTA({ navigate }: { navigate: (page: any) => void }) {
  const message = TimeBasedMessaging();

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      onClick={() => navigate('configurator')}
      className="px-8 py-4 bg-gradient-to-r from-[#6B1E3E] to-[#8B2E4E] text-white rounded-full font-semibold hover:shadow-xl transition-all"
    >
      {message.ctaMessage}
    </motion.button>
  );
}

// Badge avec icône selon l'heure
export function TimeOfDayBadge() {
  const message = TimeBasedMessaging();
  const Icon = message.useCaseHighlight.icon;

  const getGradient = () => {
    switch (message.timeOfDay) {
      case 'morning':
        return 'from-yellow-400 to-orange-400';
      case 'afternoon':
        return 'from-blue-400 to-cyan-400';
      case 'evening':
        return 'from-purple-400 to-pink-400';
      case 'night':
        return 'from-indigo-600 to-purple-600';
    }
  };

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r ${getGradient()} text-white rounded-full text-sm font-medium shadow-lg`}>
      <Icon className="w-4 h-4" />
      <span>{message.greeting}</span>
    </div>
  );
}

// Hook pour obtenir le message actuel
export function useTimeBasedMessage() {
  return TimeBasedMessaging();
}

// Messages spécifiques pour différentes sections
export function getTimeBasedBenefit(): string {
  const hour = new Date().getHours();
  
  if (hour >= 5 && hour < 12) {
    return "Votre café parfait dès 6h du matin, sans attendre";
  }
  if (hour >= 12 && hour < 14) {
    return "Eau pétillante fraîche pour le déjeuner";
  }
  if (hour >= 14 && hour < 17) {
    return "Thé glacé ou eau fraîche tout l'après-midi";
  }
  if (hour >= 17 && hour < 20) {
    return "Cuisinez avec une eau pure pour vos recettes du soir";
  }
  if (hour >= 20 && hour < 22) {
    return "Tisane relaxante en 3 secondes avant de dormir";
  }
  
  return "Eau chaude instantanée 24h/24, même la nuit";
}

// Recommandation de produit selon l'heure
export function getTimeBasedProductHighlight(): {
  feature: string;
  icon: string;
} {
  const hour = new Date().getHours();
  
  if (hour >= 5 && hour < 12) {
    return {
      feature: 'Eau bouillante instantanée',
      icon: '☕'
    };
  }
  if (hour >= 12 && hour < 17) {
    return {
      feature: 'Eau pétillante 3 niveaux',
      icon: '🥤'
    };
  }
  if (hour >= 17 && hour < 22) {
    return {
      feature: 'Eau filtrée ultra-pure',
      icon: '🍷'
    };
  }
  
  return {
    feature: 'Mode silencieux',
    icon: '🌙'
  };
}
