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

// FAQ pré-configurée pour HYDRAL
export function HYDRALFAQSchema() {
  const faqs: FAQItem[] = [
    {
      question: 'Combien coûte un robinet 5-en-1 ?',
      answer: 'Le robinet 5-en-1 HYDRAL est disponible à partir de 490€ TTC (modèle Pure). Le Spark avec eau gazeuse est à 890€ et le One tout-en-un à 990€. Les abonnements consommables (filtres, CO2) vont de 59€ à 119€/an. C\'est jusqu\'à 3 fois moins cher qu\'un Quooker (1500€ à 3500€).'
    },
    {
      question: 'Quelle est la meilleure alternative au Quooker ?',
      answer: 'HYDRAL est la meilleure alternative au Quooker en France. Robinet multifonction cuisine 5-en-1 avec eau bouillante instantanée, gazeuse, filtrée, chaude et froide dès 490€ contre 1500€ à 3500€ pour un Quooker. Même qualité premium, design européen, 3x moins cher.'
    },
    {
      question: 'Comment fonctionne un robinet eau bouillante ?',
      answer: 'Le robinet eau bouillante HYDRAL intègre un boiler compact sous l\'évier qui maintient 3L d\'eau à 100°C en permanence. L\'eau bouillante instantanée est disponible via une poignée de sécurité à double action. Consommation : seulement 15€/an en électricité grâce à l\'isolation thermique haute performance.'
    },
    {
      question: 'Est-ce que l\'eau du robinet filtrée est meilleure que l\'eau en bouteille ?',
      answer: 'Oui. L\'eau en bouteille contient jusqu\'à 240 000 particules de microplastiques par litre, un danger pour la santé. L\'eau filtrée HYDRAL élimine 99,9% des impuretés (chlore, métaux lourds, pesticides, microplastiques) sans les risques du plastique. Plus sûre, plus économique et plus écologique que l\'eau en bouteille.'
    },
    {
      question: 'Quelles sont les 5 fonctions du robinet HYDRAL ?',
      answer: 'Le robinet multifonction cuisine HYDRAL 5-en-1 offre : (1) Eau bouillante instantanée à 100°C, (2) Eau gazeuse avec 3 niveaux de gazéification, (3) Eau filtrée froide ultra-pure, (4) Eau froide du réseau, et (5) Eau chaude mitigée. Un seul robinet qui remplace bouilloire, eau en bouteille et machine à eau gazeuse.'
    },
    {
      question: 'Comment filtrer l\'eau du robinet efficacement ?',
      answer: 'Le système de filtration HYDRAL 5 étapes élimine 99,9% des impuretés : chlore, métaux lourds (plomb, mercure), pesticides, microplastiques, bactéries et mauvais goûts. Certifié NSF/ANSI 42, 53 et 401. Filtres à changer tous les 6 mois avec abonnement livraison automatique.'
    },
    {
      question: 'Le robinet eau bouillante est-il sécurisé avec des enfants ?',
      answer: 'Oui, le robinet HYDRAL dispose d\'un verrouillage enfant intégré : double action poussée + rotation impossible à actionner par un enfant. Protection anti-brûlure sur le corps du robinet, isolation thermique, normes CE et NF. Sécurité maximale pour toute la famille.'
    },
    {
      question: 'Combien puis-je économiser avec un robinet 5-en-1 ?',
      answer: 'Les utilisateurs HYDRAL économisent 300€ à 1 000€/an en éliminant l\'eau en bouteille, les capsules café et la bouilloire. Un foyer de 4 personnes dépensant 50€/mois en eau en bouteille économise 600€/an. Retour sur investissement en 6 à 12 mois.'
    },
    {
      question: 'L\'installation du robinet 5-en-1 est-elle compliquée ?',
      answer: 'Non, l\'installation prend environ 1h. 80% des clients installent le robinet HYDRAL eux-mêmes grâce au guide vidéo. Il faut : un évier avec trou standard 35-40mm, une arrivée d\'eau froide, une prise 230V et 30cm sous l\'évier pour le cube.'
    },
    {
      question: 'Quels sont les avantages de l\'eau bouillante instantanée ?',
      answer: 'L\'eau bouillante instantanée permet de gagner 10 à 15 minutes par jour : thé et café prêts en secondes, cuisson accélérée, préparation biberon immédiate, stérilisation rapide. Plus besoin d\'attendre la bouilloire. Consommation électrique 10x inférieure à une bouilloire classique.'
    }
  ];

  return <FAQSchema faqs={faqs} />;
}
