import React from 'react';
import { motion } from 'motion/react';
import { Lock, Shield, CreditCard, Eye, Server, CheckCircle, AlertCircle, Key } from 'lucide-react';
import { Page } from '../App';

interface PaymentSecurityPageProps {
  navigate: (page: Page) => void;
}

export function PaymentSecurityPage({ navigate }: PaymentSecurityPageProps) {
  return (
    <div className="min-h-screen bg-[#FAF8F5] py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="w-20 h-20 rounded-full bg-[#6B1E3E]/10 flex items-center justify-center mx-auto mb-6">
            <Lock className="w-10 h-10 text-[#6B1E3E]" />
          </div>

          <h1 className="mb-6 text-gray-900">
            Paiement 100% Sécurisé
          </h1>
          <p className="text-xl text-[#8B7E74] max-w-2xl mx-auto">
            Vos données bancaires sont protégées par les technologies de sécurité les plus avancées
          </p>
        </motion.div>

        {/* Security highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: Lock,
              title: 'Cryptage SSL 256 bits',
              description: 'Niveau bancaire maximum',
              color: 'from-green-500 to-emerald-600'
            },
            {
              icon: Shield,
              title: 'Norme PCI DSS',
              description: 'Certifié par Visa & Mastercard',
              color: 'from-blue-500 to-cyan-600'
            },
            {
              icon: Eye,
              title: '0 donnée stockée',
              description: 'Pas de conservation de CB',
              color: 'from-purple-500 to-pink-600'
            }
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-3xl p-8 shadow-lg text-center"
            >
              <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center mx-auto mb-4`}>
                <item.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* How we protect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-[#FAF8F5] to-[#E8D5DC]/20 rounded-3xl p-8 mb-12 border border-gray-200/60"
        >
          <h2 className="text-3xl font-semibold text-gray-900 mb-8 text-center">
            Comment nous protégeons vos données
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: Lock,
                title: 'Cryptage de bout en bout',
                description: 'Toutes vos données sont cryptées avec l\'algorithme AES-256, le même utilisé par les banques et gouvernements.'
              },
              {
                icon: Server,
                title: 'Serveurs ultra-sécurisés',
                description: 'Nos serveurs sont hébergés dans des data centers certifiés ISO 27001 avec surveillance 24/7.'
              },
              {
                icon: Eye,
                title: 'Aucune conservation',
                description: 'Nous ne stockons JAMAIS vos données bancaires. Elles transitent directement chez nos partenaires bancaires.'
              },
              {
                icon: Key,
                title: '3D Secure 2.0',
                description: 'Authentification renforcée par votre banque avec code SMS ou application bancaire.'
              },
              {
                icon: Shield,
                title: 'Conformité RGPD',
                description: 'Respect total de la réglementation européenne sur la protection des données personnelles.'
              },
              {
                icon: AlertCircle,
                title: 'Détection fraude',
                description: 'Système anti-fraude en temps réel pour détecter toute activité suspecte.'
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 flex gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Payment partners */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl font-semibold text-gray-900 mb-8 text-center">
            Nos partenaires de paiement
          </h2>

          <div className="bg-white rounded-3xl p-8 shadow-lg">
            <p className="text-gray-600 text-center mb-8">
              Nous travaillons avec les leaders mondiaux du paiement sécurisé
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                'Stripe',
                'PayPal',
                'Visa',
                'Mastercard'
              ].map((partner, index) => (
                <motion.div
                  key={partner}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-center p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors"
                >
                  <span className="text-lg font-bold text-gray-700">
                    {partner}
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    label: 'Paiement en 1x',
                    description: 'Par CB, Visa, Mastercard'
                  },
                  {
                    label: 'Paiement en 3x',
                    description: 'Sans frais dès 300€'
                  },
                  {
                    label: 'PayPal',
                    description: 'Protection acheteur incluse'
                  }
                ].map((option, index) => (
                  <div key={index} className="text-center">
                    <CreditCard className="w-8 h-8 text-[#6B1E3E] mx-auto mb-2" />
                    <div className="font-semibold text-gray-900">{option.label}</div>
                    <div className="text-sm text-gray-600">{option.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Transaction flow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-white to-[#E8D5DC]/10 rounded-3xl p-8 mb-12 border border-gray-200/60"
        >
          <h2 className="text-3xl font-semibold text-gray-900 mb-8 text-center">
            Flux de paiement sécurisé
          </h2>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {[
                {
                  step: '1',
                  title: 'Vous entrez vos informations',
                  description: 'Sur notre page de paiement sécurisée (cadenas 🔒 dans l\'URL)',
                  security: 'Connexion SSL cryptée'
                },
                {
                  step: '2',
                  title: 'Cryptage instantané',
                  description: 'Vos données sont immédiatement cryptées en AES-256',
                  security: 'Algorithme militaire'
                },
                {
                  step: '3',
                  title: 'Validation bancaire',
                  description: 'Vos informations sont vérifiées par votre banque via 3D Secure',
                  security: 'Authentification forte'
                },
                {
                  step: '4',
                  title: 'Confirmation',
                  description: 'Transaction approuvée, vous recevez une confirmation par email',
                  security: 'Zéro donnée stockée'
                }
              ].map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-4 bg-white rounded-2xl p-6 relative"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#6B1E3E] to-[#8B2E4E] flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {step.description}
                    </p>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 rounded-full">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-xs font-medium text-green-700">
                        {step.security}
                      </span>
                    </div>
                  </div>
                  
                  {index < 3 && (
                    <div className="absolute left-6 top-[72px] w-0.5 h-6 bg-gray-300" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl p-8 shadow-lg mb-12"
        >
          <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            Certifications et conformité
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'PCI DSS Level 1', icon: Shield },
              { label: 'ISO 27001', icon: Award },
              { label: 'RGPD Compliant', icon: CheckCircle },
              { label: 'SSL/TLS 1.3', icon: Lock }
            ].map((cert, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-xl"
              >
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <cert.icon className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-sm font-semibold text-gray-700 text-center">
                  {cert.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl font-semibold text-gray-900 mb-8 text-center">
            Questions fréquentes
          </h2>

          <div className="max-w-3xl mx-auto space-y-4">
            {securityFaqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-md"
              >
                <h4 className="font-semibold text-gray-900 mb-2">
                  {faq.question}
                </h4>
                <p className="text-gray-600 text-sm">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-[#6B1E3E] to-[#8B2E4E] rounded-3xl p-12 text-center text-white"
        >
          <Lock className="w-16 h-16 mx-auto mb-6 text-white/90" />
          <h2 className="text-3xl font-semibold mb-4">
            Achetez en toute confiance
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Vos données sont protégées par les mêmes technologies que les grandes banques
          </p>
          
          <button
            onClick={() => navigate('configurator')}
            className="px-8 py-4 bg-white text-[#6B1E3E] rounded-full font-semibold hover:shadow-xl transition-all text-lg"
          >
            Choisir mon HYDRAL
          </button>
        </motion.div>
      </div>
    </div>
  );
}

const securityFaqs = [
  {
    question: 'Mes données bancaires sont-elles stockées ?',
    answer: 'Non, absolument pas. Nous ne stockons JAMAIS vos données bancaires. Elles transitent directement vers nos partenaires de paiement certifiés (Stripe, PayPal) qui gèrent le traitement de façon sécurisée.'
  },
  {
    question: 'Qu\'est-ce que le 3D Secure ?',
    answer: 'Le 3D Secure est une authentification renforcée demandée par votre banque (code SMS, application bancaire). C\'est une protection supplémentaire obligatoire en Europe qui vous protège contre la fraude.'
  },
  {
    question: 'Comment savoir que le paiement est sécurisé ?',
    answer: 'Vérifiez la présence du cadenas 🔒 dans la barre d\'adresse et que l\'URL commence par "https://". Vous verrez également nos badges de sécurité (SSL, PCI DSS) sur la page de paiement.'
  },
  {
    question: 'Que faire si je soupçonne une fraude ?',
    answer: 'Contactez immédiatement notre service client et votre banque. Nous disposons d\'un système de détection de fraude en temps réel et travaillons avec votre banque pour résoudre tout problème.'
  },
  {
    question: 'Puis-je annuler un paiement ?',
    answer: 'Vous pouvez annuler votre commande dans les 14 jours suivant la réception (droit de rétractation). Le remboursement est effectué sous 14 jours sur votre moyen de paiement d\'origine.'
  }
];

function Award({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>
  );
}