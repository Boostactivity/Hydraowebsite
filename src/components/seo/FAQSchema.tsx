import React from 'react';
import { Helmet } from 'react-helmet';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSchemaProps {
  faqs: FAQItem[];
}

export function FAQSchema({ faqs }: FAQSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}

// FAQ pré-configurée pour HYDRAO
export function HYDRAOFAQSchema() {
  const faqs: FAQItem[] = [
    {
      question: 'Combien coûte le robinet HYDRAO 5-en-1 ?',
      answer: 'Le robinet HYDRAO 5-en-1 est proposé à 490€ TTC, avec des abonnements optionnels de 59€ à 139€ par an pour les consommables (filtres, CO2). Installation professionnelle disponible à partir de 150€.'
    },
    {
      question: 'Quelles sont les 5 fonctions du robinet HYDRAO ?',
      answer: 'Le robinet HYDRAO 5-en-1 offre : (1) Eau filtrée froide ultra-pure (99.9% impuretés éliminées), (2) Eau pétillante avec 3 niveaux de gazéification, (3) Eau bouillante instantanée à 100°C, (4) Eau froide du réseau, et (5) Eau chaude standard mitigée.'
    },
    {
      question: 'Combien puis-je économiser avec HYDRAO ?',
      answer: 'Les utilisateurs HYDRAO économisent en moyenne 1200€ à 2400€ par an en éliminant l\'achat d\'eau en bouteille, café en capsules, et bouilloire électrique. Le retour sur investissement est généralement atteint en 6 à 12 mois selon la taille du foyer.'
    },
    {
      question: 'L\'installation est-elle compliquée ?',
      answer: 'Non, l\'installation HYDRAO est simple : 80% des clients l\'installent eux-mêmes en 45 minutes grâce à notre guide vidéo étape par étape. Pour plus de confort, nous proposons un service d\'installation professionnelle par un plombier agréé.'
    },
    {
      question: 'Le robinet HYDRAO est-il compatible avec ma cuisine ?',
      answer: 'Oui, le robinet HYDRAO s\'adapte à 95% des cuisines. Il nécessite : un évier avec trou standard (35-40mm), une arrivée d\'eau froide, une prise électrique 230V à proximité, et 30cm d\'espace sous l\'évier pour le cube de filtration.'
    },
    {
      question: 'Quelle est la qualité de l\'eau filtrée HYDRAO ?',
      answer: 'Le système de filtration HYDRAO 5 étapes élimine 99.9% des impuretés : chlore, métaux lourds (plomb, mercure), pesticides, microplastiques, bactéries et mauvais goûts. Certifié NSF/ANSI 42, 53 et 401. Tests de qualité disponibles sur notre site.'
    },
    {
      question: 'À quelle fréquence faut-il changer les filtres ?',
      answer: 'Les filtres HYDRAO se changent tous les 6 mois (ou 2500L) pour une performance optimale. L\'application mobile vous alerte automatiquement. Le remplacement prend 2 minutes sans outils. Abonnement disponible avec livraison automatique.'
    },
    {
      question: 'Le robinet HYDRAO est-il garanti ?',
      answer: 'Oui, le robinet HYDRAO bénéficie d\'une garantie complète : 5 ans sur le robinet et l\'électronique, 2 ans sur les consommables (filtres, CO2). Garantie satisfait ou remboursé 60 jours. SAV français réactif sous 24h.'
    },
    {
      question: 'Le robinet HYDRAO consomme-t-il beaucoup d\'électricité ?',
      answer: 'Non, le robinet HYDRAO est très économe : consommation moyenne de 15€/an en électricité grâce à l\'isolation thermique haute performance et au mode veille intelligent. 10x plus économique qu\'une bouilloire électrique classique.'
    },
    {
      question: 'Est-ce que le robinet HYDRAO est écologique ?',
      answer: 'Oui, extrêmement : éliminez 2000 bouteilles plastique par an, réduisez votre empreinte carbone de 85%, économisez 15000L d\'eau par an. Le cube de filtration est recyclable à 95%. Certifié Carbon Neutral.'
    }
  ];

  return <FAQSchema faqs={faqs} />;
}
