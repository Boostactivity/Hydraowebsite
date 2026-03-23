import React from 'react';
import { motion } from 'motion/react';
import { Shield, Lock, Award, CreditCard, Truck, CheckCircle, Star, Clock } from 'lucide-react';

interface TrustSeal {
  icon: typeof Shield;
  label: string;
  description: string;
  color: string;
}

const TRUST_SEALS: TrustSeal[] = [
  {
    icon: Lock,
    label: 'Paiement sécurisé SSL',
    description: 'Cryptage bancaire 256 bits',
    color: 'text-green-600'
  },
  {
    icon: Award,
    label: 'Certifié CE & NF',
    description: 'Normes européennes garanties',
    color: 'text-blue-600'
  },
  {
    icon: Shield,
    label: 'Garantie 5 ans',
    description: 'Remboursé ou échangé',
    color: 'text-[#6B1E3E]'
  },
  {
    icon: CreditCard,
    label: 'Paiement 3x sans frais',
    description: 'À partir de 300€',
    color: 'text-purple-600'
  },
  {
    icon: Truck,
    label: 'Livraison assurée',
    description: 'Suivi en temps réel',
    color: 'text-orange-600'
  }
];

export function TrustSeals({ variant = 'horizontal' }: { variant?: 'horizontal' | 'grid' | 'compact' }) {
  if (variant === 'compact') {
    return <TrustSealsCompact />;
  }

  if (variant === 'grid') {
    return <TrustSealsGrid />;
  }

  return <TrustSealsHorizontal />;
}

// Version horizontale (pour footer, checkout)
function TrustSealsHorizontal() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6 py-6">
      {TRUST_SEALS.map((seal, index) => {
        const Icon = seal.icon;
        return (
          <motion.div
            key={seal.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-2 group"
          >
            <div className={`w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center ${seal.color} group-hover:scale-110 transition-transform`}>
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-900">
                {seal.label}
              </div>
              <div className="text-xs text-gray-600">
                {seal.description}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

// Version grid (pour pages dédiées)
function TrustSealsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {TRUST_SEALS.map((seal, index) => {
        const Icon = seal.icon;
        return (
          <motion.div
            key={seal.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-[#6B1E3E] transition-all hover:shadow-lg group"
          >
            <div className={`w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center ${seal.color} mb-4 group-hover:scale-110 transition-transform`}>
              <Icon className="w-7 h-7" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              {seal.label}
            </h3>
            <p className="text-sm text-gray-600">
              {seal.description}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}

// Version compact (badges inline)
function TrustSealsCompact() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {TRUST_SEALS.map((seal) => {
        const Icon = seal.icon;
        return (
          <div
            key={seal.label}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 rounded-full text-xs font-medium text-gray-700"
          >
            <Icon className={`w-3.5 h-3.5 ${seal.color}`} />
            <span>{seal.label}</span>
          </div>
        );
      })}
    </div>
  );
}

// Trust banner pour checkout
export function TrustBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 border-2 border-green-200"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
          <Shield className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">
            Votre achat est 100% sécurisé
          </h3>
          <p className="text-sm text-gray-600">
            Protection complète de vos données et de votre transaction
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <TrustMetric
          icon={Lock}
          value="SSL 256 bits"
          label="Cryptage"
        />
        <TrustMetric
          icon={Shield}
          value="5 ans"
          label="Garantie"
        />
        <TrustMetric
          icon={CheckCircle}
          value="100%"
          label="Satisfait/remboursé"
        />
        <TrustMetric
          icon={Star}
          value="4.9/5"
          label="Note clients"
        />
      </div>
    </motion.div>
  );
}

function TrustMetric({ 
  icon: Icon, 
  value, 
  label 
}: { 
  icon: typeof Shield; 
  value: string; 
  label: string; 
}) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="w-5 h-5 text-green-600" />
      <div>
        <div className="font-semibold text-gray-900 text-sm">{value}</div>
        <div className="text-xs text-gray-600">{label}</div>
      </div>
    </div>
  );
}

// Trust badges pour product page
export function ProductTrustBadges() {
  return (
    <div className="space-y-3">
      <TrustBadge
        icon={Shield}
        text="Garantie 5 ans pièces et main d'œuvre"
        color="text-[#6B1E3E]"
      />
      <TrustBadge
        icon={Truck}
        text="Livraison gratuite et assurée sous 48h"
        color="text-blue-600"
      />
      <TrustBadge
        icon={Clock}
        text="Satisfait ou remboursé pendant 30 jours"
        color="text-green-600"
      />
      <TrustBadge
        icon={CreditCard}
        text="Paiement 3x sans frais dès 300€"
        color="text-purple-600"
      />
    </div>
  );
}

function TrustBadge({ 
  icon: Icon, 
  text, 
  color 
}: { 
  icon: typeof Shield; 
  text: string; 
  color: string; 
}) {
  return (
    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
      <Icon className={`w-5 h-5 ${color} flex-shrink-0`} />
      <span className="text-sm font-medium text-gray-700">{text}</span>
    </div>
  );
}

// Certifications logos
export function CertificationLogos() {
  const certifications = [
    { name: 'CE', description: 'Conformité Européenne' },
    { name: 'NF', description: 'Norme Française' },
    { name: 'ISO 9001', description: 'Qualité certifiée' },
    { name: 'ACS', description: 'Eau potable' }
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-6 py-6">
      {certifications.map((cert) => (
        <div
          key={cert.name}
          className="flex flex-col items-center gap-2 group"
        >
          <div className="w-16 h-16 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center group-hover:border-[#6B1E3E] transition-colors">
            <span className="font-bold text-gray-700 text-sm">{cert.name}</span>
          </div>
          <span className="text-xs text-gray-600">{cert.description}</span>
        </div>
      ))}
    </div>
  );
}

// Payment methods logos
export function PaymentMethodsLogos() {
  const methods = [
    'Visa',
    'Mastercard',
    'CB',
    'PayPal',
    'Apple Pay',
    'Google Pay'
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 py-4">
      {methods.map((method) => (
        <div
          key={method}
          className="px-4 py-2 bg-white rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:border-[#6B1E3E] transition-colors"
        >
          {method}
        </div>
      ))}
    </div>
  );
}
