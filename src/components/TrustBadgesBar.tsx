import { Check } from 'lucide-react';

export function TrustBadgesBar() {
  const badges = [
    { text: 'Livraison offerte en France', icon: Check },
    { text: 'Garantie 5 ans', icon: Check },
    { text: 'Satisfait ou remboursé 30 jours', icon: Check },
    { text: 'SAV français 7j/7', icon: Check },
  ];

  return (
    <div className="bg-gradient-to-b from-white to-gray-50/30 border-b border-gray-100">
      <div className="section-container">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 py-2.5">
          {badges.map((badge, index) => (
            <div key={index} className="flex items-center gap-1.5">
              <badge.icon className="w-3.5 h-3.5 text-green-600 flex-shrink-0" strokeWidth={2.5} />
              <span className="text-xs text-gray-600 font-medium whitespace-nowrap">
                {badge.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
