import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Persona = 
  | 'famille-nombreuse'
  | 'ecolo'
  | 'presse'
  | 'foodie'
  | null;

interface PersonaProfile {
  id: Persona;
  label: string;
  icon: string;
  description: string;
  focusAreas: string[];
  savingsMultiplier: number;
  preferredContent: string[];
}

export const PERSONAS: Record<Exclude<Persona, null>, PersonaProfile> = {
  'famille-nombreuse': {
    id: 'famille-nombreuse',
    label: 'Famille nombreuse',
    icon: '👨‍👩‍👧‍👦',
    description: 'Optimiser le budget familial et gagner du temps',
    focusAreas: ['Économies', 'Praticité', 'Santé des enfants'],
    savingsMultiplier: 1.5,
    preferredContent: ['savings', 'ecoresponsable', 'securite']
  },
  'ecolo': {
    id: 'ecolo',
    label: 'Éco-responsable',
    icon: '🌱',
    description: 'Réduire mon empreinte carbone et préserver la planète',
    focusAreas: ['Environnement', 'Zéro déchet', 'Impact CO2'],
    savingsMultiplier: 1.0,
    preferredContent: ['ecoresponsable', 'savings', 'avantages']
  },
  'presse': {
    id: 'presse',
    label: 'Professionnel pressé',
    icon: '⏱️',
    description: 'Gagner du temps au quotidien',
    focusAreas: ['Gain de temps', 'Efficacité', 'Confort'],
    savingsMultiplier: 0.8,
    preferredContent: ['avantages', 'utilisations', 'concept']
  },
  'foodie': {
    id: 'foodie',
    label: 'Gourmet exigeant',
    icon: '🍷',
    description: 'Qualité de l\'eau et expériences gustatives',
    focusAreas: ['Qualité eau', 'Goût', 'Pureté'],
    savingsMultiplier: 1.2,
    preferredContent: ['concept', 'securite', 'avantages']
  }
};

interface PersonaContextType {
  persona: Persona;
  setPersona: (persona: Persona) => void;
  personaProfile: PersonaProfile | null;
  hasCompletedQuiz: boolean;
  showQuiz: boolean;
  setShowQuiz: (show: boolean) => void;
  resetPersona: () => void;
}

const PersonaContext = createContext<PersonaContextType | undefined>(undefined);

export function PersonaProvider({ children }: { children: ReactNode }) {
  const [persona, setPersonaState] = useState<Persona>(null);
  const [hasCompletedQuiz, setHasCompletedQuiz] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);

  // Charger depuis localStorage
  useEffect(() => {
    const stored = localStorage.getItem('hydrao-persona');
    const completedQuiz = localStorage.getItem('hydrao-persona-quiz-completed');
    
    if (stored) {
      setPersonaState(stored as Persona);
    }
    
    if (completedQuiz === 'true') {
      setHasCompletedQuiz(true);
    } else {
      // Afficher le quiz après 10s si jamais complété
      const timer = setTimeout(() => {
        if (!hasCompletedQuiz) {
          setShowQuiz(true);
        }
      }, 10000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const setPersona = (newPersona: Persona) => {
    setPersonaState(newPersona);
    setHasCompletedQuiz(true);
    setShowQuiz(false);
    
    if (newPersona) {
      localStorage.setItem('hydrao-persona', newPersona);
      localStorage.setItem('hydrao-persona-quiz-completed', 'true');
    } else {
      localStorage.removeItem('hydrao-persona');
    }
  };

  const resetPersona = () => {
    setPersonaState(null);
    setHasCompletedQuiz(false);
    localStorage.removeItem('hydrao-persona');
    localStorage.removeItem('hydrao-persona-quiz-completed');
  };

  const personaProfile = persona && persona !== null ? PERSONAS[persona] : null;

  return (
    <PersonaContext.Provider
      value={{
        persona,
        setPersona,
        personaProfile,
        hasCompletedQuiz,
        showQuiz,
        setShowQuiz,
        resetPersona
      }}
    >
      {children}
    </PersonaContext.Provider>
  );
}

export function usePersona() {
  const context = useContext(PersonaContext);
  if (context === undefined) {
    throw new Error('usePersona must be used within a PersonaProvider');
  }
  return context;
}
