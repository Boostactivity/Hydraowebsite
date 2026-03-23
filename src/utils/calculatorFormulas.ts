/**
 * HYDRAO Calculator Formulas
 * 
 * Toutes les formules de calcul pour le calculateur d'économies HYDRAO.
 * Séparé du composant pour faciliter les tests et la maintenance.
 * 
 * Version: 1.0
 * Dernière mise à jour: 23 décembre 2024
 */

// ============================================================================
// CONSTANTES
// ============================================================================

export const PRICING = {
  /** Prix moyen d'une bouteille d'eau 1,5L en France */
  avgBottlePrice: 0.50,
  
  /** Prix du robinet HYDRAO TTC */
  hydroPrice: 490,
  
  /** Prix de l'abonnement Standard par an */
  subscriptionYearly: 99,
  
  /** Prix de l'abonnement Essentiel par an */
  subscriptionEssentialYearly: 59,
  
  /** Prix de l'abonnement Premium par an */
  subscriptionPremiumYearly: 139,
} as const;

export const ENVIRONMENTAL = {
  /** Nombre de particules microplastiques par bouteille en plastique */
  microplasticsPerBottle: 240000,
  
  /** Poids du plastique d'une bouteille 1,5L en kg */
  plasticWeightPerBottle: 0.034,
  
  /** Émissions CO2 par bouteille (production + transport) en kg */
  co2PerBottle: 0.063,
  
  /** Kg de CO2 absorbés par un arbre par an */
  co2PerTreePerYear: 12,
} as const;

export const TIME_SAVINGS = {
  /** Durée moyenne d'une course pour acheter de l'eau (heures) */
  shoppingTripDuration: 0.75,
  
  /** Nombre de bouteilles transportables en une fois */
  bottlesPerTrip: 26,
  
  /** Temps d'attente bouilloire en minutes */
  kettleBoilTimeMinutes: 3,
} as const;

// ============================================================================
// TYPES
// ============================================================================

export type HouseholdType = 'solo' | 'couple' | 'family' | 'family-plus';

export interface CalculationInput {
  /** Type de foyer */
  household: HouseholdType;
  
  /** Nombre de bouteilles d'eau consommées par semaine */
  bottlesPerWeek: number;
  
  /** Type d'abonnement choisi (optionnel) */
  subscriptionType?: 'essential' | 'standard' | 'premium';
}

export interface CalculationResults {
  /** Situation actuelle (sans HYDRAO) */
  current: {
    /** Coût annuel des bouteilles */
    yearlyBottleCost: number;
    
    /** Coût mensuel des bouteilles */
    monthlyBottleCost: number;
    
    /** Microplastiques ingérés par an */
    yearlyMicroplastics: number;
    
    /** Kg de plastique consommé par an */
    yearlyPlasticKg: number;
    
    /** Nombre de bouteilles par an */
    yearlyBottles: number;
    
    /** Heures perdues en courses */
    shoppingHours: number;
    
    /** Heures perdues à attendre la bouilloire */
    kettleHours: number;
  };
  
  /** Avec HYDRAO */
  withHydrao: {
    /** Économies annuelles */
    yearlySavings: number;
    
    /** Économies sur 5 ans */
    savings5Years: number;
    
    /** Nombre de mois pour rentabiliser */
    breakEvenMonths: number;
    
    /** Microplastiques évités par an */
    microplasticsAvoided: number;
    
    /** Kg de plastique évité par an */
    plasticKgAvoided: number;
    
    /** Kg de CO2 évités par an */
    co2KgAvoided: number;
    
    /** Équivalent en arbres plantés */
    treesEquivalent: number;
    
    /** Heures gagnées par an */
    timeSavedHours: number;
    
    /** Coût par jour avec HYDRAO */
    costPerDay: number;
  };
  
  /** Comparaisons */
  comparison: {
    /** Coût par jour sans HYDRAO */
    costPerDayWithoutHydrao: number;
    
    /** Économies par jour */
    costPerDaySaved: number;
    
    /** Économies sur 1 an */
    savings1Year: number;
    
    /** Coût de l'inaction (si attente 6 mois) */
    if6MonthsLater: number;
  };
  
  /** Recommandations basées sur le profil */
  recommendations: {
    /** Modèle recommandé */
    recommendedModel: string;
    
    /** Abonnement recommandé */
    recommendedSubscription: string;
    
    /** % de personnes similaires qui ont choisi cette config */
    percentageChose: number;
  };
}

// ============================================================================
// FONCTIONS PRINCIPALES
// ============================================================================

/**
 * Retourne le nombre moyen d'utilisations de bouilloire par jour selon le foyer
 */
export function getKettleBoilsPerDay(household: HouseholdType): number {
  const boilsMap: Record<HouseholdType, number> = {
    'solo': 3,
    'couple': 5,
    'family': 8,
    'family-plus': 12,
  };
  
  return boilsMap[household];
}

/**
 * Retourne le prix d'abonnement annuel selon le type
 */
export function getSubscriptionPrice(type: 'essential' | 'standard' | 'premium'): number {
  const priceMap = {
    'essential': PRICING.subscriptionEssentialYearly,
    'standard': PRICING.subscriptionYearly,
    'premium': PRICING.subscriptionPremiumYearly,
  };
  
  return priceMap[type];
}

/**
 * Retourne les recommandations personnalisées selon le profil
 */
export function getRecommendations(household: HouseholdType, bottlesPerWeek: number): CalculationResults['recommendations'] {
  // Logique de recommandation
  if (household === 'family' || household === 'family-plus') {
    return {
      recommendedModel: 'FLEX',
      recommendedSubscription: 'Standard',
      percentageChose: 87,
    };
  }
  
  if (household === 'couple' && bottlesPerWeek >= 10) {
    return {
      recommendedModel: 'FLEX',
      recommendedSubscription: 'Standard',
      percentageChose: 76,
    };
  }
  
  return {
    recommendedModel: 'FLEX',
    recommendedSubscription: 'Essentiel',
    percentageChose: 68,
  };
}

/**
 * FONCTION PRINCIPALE : Calcule tous les résultats du calculateur HYDRAO
 */
export function calculateHydrao(input: CalculationInput): CalculationResults {
  // Déterminer l'abonnement (Standard par défaut)
  const subscriptionType = input.subscriptionType || 'standard';
  const subscriptionYearly = getSubscriptionPrice(subscriptionType);
  
  // ============================================================================
  // CALCULS SITUATION ACTUELLE
  // ============================================================================
  
  const yearlyBottles = input.bottlesPerWeek * 52;
  const yearlyBottleCost = yearlyBottles * PRICING.avgBottlePrice;
  const monthlyBottleCost = yearlyBottleCost / 12;
  
  const yearlyMicroplastics = yearlyBottles * ENVIRONMENTAL.microplasticsPerBottle;
  const yearlyPlasticKg = yearlyBottles * ENVIRONMENTAL.plasticWeightPerBottle;
  
  // Temps perdu en courses
  const shoppingTrips = Math.ceil(yearlyBottles / TIME_SAVINGS.bottlesPerTrip);
  const shoppingHours = shoppingTrips * TIME_SAVINGS.shoppingTripDuration;
  
  // Temps perdu en bouilloire
  const kettleBoilsPerDay = getKettleBoilsPerDay(input.household);
  const kettleHoursPerYear = (kettleBoilsPerDay * TIME_SAVINGS.kettleBoilTimeMinutes * 365) / 60;
  
  // ============================================================================
  // CALCULS AVEC HYDRAO
  // ============================================================================
  
  // Économies financières
  const hydroYearlyCost = subscriptionYearly;
  const yearlySavings = yearlyBottleCost - hydroYearlyCost;
  const savings5Years = (yearlyBottleCost * 5) - (PRICING.hydroPrice + (subscriptionYearly * 5));
  const breakEvenMonths = PRICING.hydroPrice / monthlyBottleCost;
  
  // Environnement
  const yearlyCO2kg = yearlyBottles * ENVIRONMENTAL.co2PerBottle;
  const treesEquivalent = Math.round(yearlyCO2kg / ENVIRONMENTAL.co2PerTreePerYear);
  
  // Temps
  const totalTimeSaved = shoppingHours + kettleHoursPerYear;
  
  // Coûts journaliers
  const costPerDayWithoutHydrao = yearlyBottleCost / 365;
  const costPerDayWithHydrao = hydroYearlyCost / 365;
  const costPerDaySaved = costPerDayWithoutHydrao - costPerDayWithHydrao;
  
  // Coût de l'inaction
  const if6MonthsLater = monthlyBottleCost * 6;
  
  // Recommandations
  const recommendations = getRecommendations(input.household, input.bottlesPerWeek);
  
  // ============================================================================
  // RETOUR DES RÉSULTATS
  // ============================================================================
  
  return {
    current: {
      yearlyBottleCost,
      monthlyBottleCost,
      yearlyMicroplastics,
      yearlyPlasticKg,
      yearlyBottles,
      shoppingHours,
      kettleHours: kettleHoursPerYear,
    },
    withHydrao: {
      yearlySavings,
      savings5Years,
      breakEvenMonths,
      microplasticsAvoided: yearlyMicroplastics,
      plasticKgAvoided: yearlyPlasticKg,
      co2KgAvoided: yearlyCO2kg,
      treesEquivalent,
      timeSavedHours: totalTimeSaved,
      costPerDay: costPerDayWithHydrao,
    },
    comparison: {
      costPerDayWithoutHydrao,
      costPerDaySaved,
      savings1Year: yearlySavings,
      if6MonthsLater,
    },
    recommendations,
  };
}

// ============================================================================
// FONCTIONS UTILITAIRES
// ============================================================================

/**
 * Formate un nombre en monétaire français (EUR)
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.round(amount));
}

/**
 * Formate un nombre avec séparateurs de milliers français
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('fr-FR').format(Math.round(num));
}

/**
 * Formate un nombre en pourcentage
 */
export function formatPercentage(num: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num / 100);
}

/**
 * Calcule le pourcentage d'économies
 */
export function calculateSavingsPercentage(before: number, after: number): number {
  if (before === 0) return 0;
  return ((before - after) / before) * 100;
}

/**
 * Retourne le nombre de bouteilles par défaut selon le foyer
 */
export function getDefaultBottlesPerWeek(household: HouseholdType): number {
  const bottlesMap: Record<HouseholdType, number> = {
    'solo': 6,
    'couple': 10,
    'family': 16,
    'family-plus': 24,
  };
  
  return bottlesMap[household];
}

/**
 * Valide les inputs du calculateur
 */
export function validateCalculatorInput(input: Partial<CalculationInput>): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  if (!input.household) {
    errors.push('Le type de foyer est requis');
  }
  
  if (input.bottlesPerWeek === undefined || input.bottlesPerWeek < 0) {
    errors.push('Le nombre de bouteilles doit être positif');
  }
  
  if (input.bottlesPerWeek && input.bottlesPerWeek > 100) {
    errors.push('Le nombre de bouteilles semble anormalement élevé (max 100/semaine)');
  }
  
  return {
    valid: errors.length === 0,
    errors,
  };
}

// ============================================================================
// TESTS (à déplacer dans un fichier séparé en production)
// ============================================================================

/**
 * Teste les calculs avec des valeurs connues
 */
export function runTests(): void {
  console.log('🧪 Tests des formules HYDRAO Calculator');
  
  // Test 1: Famille de 4 personnes, 16 bouteilles/semaine
  const test1 = calculateHydrao({
    household: 'family',
    bottlesPerWeek: 16,
    subscriptionType: 'standard',
  });
  
  console.log('Test 1 - Famille de 4:', {
    yearlyBottleCost: formatCurrency(test1.current.yearlyBottleCost), // ~416€
    yearlySavings: formatCurrency(test1.withHydrao.yearlySavings), // ~317€
    breakEvenMonths: test1.withHydrao.breakEvenMonths.toFixed(1), // ~14 mois
    co2Avoided: `${test1.withHydrao.co2KgAvoided.toFixed(1)} kg`,
  });
  
  // Test 2: Couple, 10 bouteilles/semaine
  const test2 = calculateHydrao({
    household: 'couple',
    bottlesPerWeek: 10,
    subscriptionType: 'standard',
  });
  
  console.log('Test 2 - Couple:', {
    yearlyBottleCost: formatCurrency(test2.current.yearlyBottleCost), // ~260€
    yearlySavings: formatCurrency(test2.withHydrao.yearlySavings), // ~161€
    breakEvenMonths: test2.withHydrao.breakEvenMonths.toFixed(1), // ~23 mois
  });
  
  console.log('✅ Tests terminés');
}

// Export par défaut
export default {
  calculateHydrao,
  formatCurrency,
  formatNumber,
  formatPercentage,
  validateCalculatorInput,
  getDefaultBottlesPerWeek,
  PRICING,
  ENVIRONMENTAL,
  TIME_SAVINGS,
};
