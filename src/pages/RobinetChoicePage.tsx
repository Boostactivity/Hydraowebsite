import { Page } from '../App';
import RobinetChoice from '../components/RobinetChoice';

interface RobinetChoicePageProps {
  navigate: (page: Page) => void;
}

export function RobinetChoicePage({ navigate }: RobinetChoicePageProps) {
  return (
    <RobinetChoice
      onRobinetSelected={(sku) => {
        // Navigation vers le choix de formule (subscriptions)
        navigate('subscriptions');
      }}
    />
  );
}