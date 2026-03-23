import { Page } from '../App';
import SubscriptionPlans from '../components/SubscriptionPlans';

interface SubscriptionsPageProps {
  navigate: (page: Page) => void;
}

export function SubscriptionsPage({ navigate }: SubscriptionsPageProps) {
  return (
    <SubscriptionPlans
      onPlanSelected={(plan, rhythm) => {
        // Navigation vers la personnalisation
        navigate('personalization');
      }}
    />
  );
}