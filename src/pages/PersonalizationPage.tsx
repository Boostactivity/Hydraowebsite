import { Page } from '../App';
import Personalization from '../components/Personalization';

interface PersonalizationPageProps {
  navigate: (page: Page) => void;
}

export function PersonalizationPage({ navigate }: PersonalizationPageProps) {
  const handleComplete = (customizationData: any) => {
    // Sauvegarder les données de personnalisation
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('personalizationData', JSON.stringify(customizationData));
    }
    
    // Naviguer vers checkout
    navigate('checkout');
  };

  return <Personalization onComplete={handleComplete} />;
}

export default PersonalizationPage;
