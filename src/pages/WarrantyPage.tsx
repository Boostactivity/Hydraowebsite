import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Shield, Check, Mail, Phone, FileText, CheckCircle } from 'lucide-react';
import { Page } from '../App';

interface WarrantyPageProps {
  navigate: (page: Page) => void;
}

export function WarrantyPage({ navigate }: WarrantyPageProps) {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="w-20 h-20 rounded-full bg-[#6B1E3E]/10 flex items-center justify-center mx-auto mb-6">
            <Shield className="w-10 h-10 text-[#6B1E3E]" />
          </div>
          
          <h1 className="mb-6 text-gray-900">
            Garantie & SAV
          </h1>
          <p className="text-xl text-[#8B7E74] max-w-2xl mx-auto font-light">
            Un robinet conçu pour durer. Une garantie constructeur pour vous rassurer.
          </p>
        </motion.div>

        {/* Ce qui compte vraiment */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl p-12 mb-12 shadow-sm border border-[#6B1E3E]/10"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-16 h-16 rounded-full bg-[#6B1E3E]/10 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-[#6B1E3E]" />
              </div>
              <h3 className="text-2xl mb-2 text-gray-900">3 ans</h3>
              <p className="text-[#8B7E74] font-light">Garantie constructeur</p>
            </div>

            <div>
              <div className="w-16 h-16 rounded-full bg-[#6B1E3E]/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-[#6B1E3E]" />
              </div>
              <h3 className="text-2xl mb-2 text-gray-900">Qualité</h3>
              <p className="text-[#8B7E74] font-light">Fabrication européenne</p>
            </div>

            <div>
              <div className="w-16 h-16 rounded-full bg-[#6B1E3E]/10 flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-[#6B1E3E]" />
              </div>
              <h3 className="text-2xl mb-2 text-gray-900">Documentation</h3>
              <p className="text-[#8B7E74] font-light">Manuel + vidéo fournis</p>
            </div>
          </div>
        </motion.div>

        {/* Ce que vous devez savoir - Simple et honnête */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 shadow-sm border border-[#6B1E3E]/10"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-[#6B1E3E]/10 flex items-center justify-center">
                <Check className="w-6 h-6 text-[#6B1E3E]" />
              </div>
              <h2 className="text-2xl text-gray-900">
                La garantie couvre
              </h2>
            </div>

            <ul className="space-y-3">
              {[
                'Défauts de fabrication',
                'Dysfonctionnements du système',
                'Problèmes électroniques',
                'Fuites non liées à l\'installation'
              ].map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <Check className="w-5 h-5 text-[#6B1E3E] mt-0.5 flex-shrink-0" />
                  <span className="text-[#8B7E74]">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 shadow-sm border border-[#6B1E3E]/10"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-[#8B7E74]/10 flex items-center justify-center">
                <FileText className="w-6 h-6 text-[#8B7E74]" />
              </div>
              <h2 className="text-2xl text-gray-900">
                Les consommables
              </h2>
            </div>

            <ul className="space-y-3">
              {[
                'Filtres (changement tous les 6 mois)',
                'Cartouches CO₂',
                'Pièces d\'usure normale',
                'Dommages dus à une mauvaise utilisation'
              ].map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-[#8B7E74]/20 mt-0.5 flex-shrink-0" />
                  <span className="text-[#8B7E74]">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Comment ça marche - Simple */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl text-gray-900 mb-8 text-center">
            En cas de problème
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: '1',
                icon: Phone,
                title: 'Contactez-nous',
                description: 'Par email ou téléphone avec votre numéro de commande'
              },
              {
                step: '2',
                icon: FileText,
                title: 'Diagnostic',
                description: 'Nous analysons le problème et vous guidons'
              },
              {
                step: '3',
                icon: CheckCircle,
                title: 'Solution',
                description: 'Envoi de pièces ou retour produit selon le cas'
              }
            ].map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-[#6B1E3E]/10 relative"
              >
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-[#6B1E3E] flex items-center justify-center text-white font-bold">
                  {step.step}
                </div>
                <step.icon className="w-8 h-8 text-[#6B1E3E] mb-4 mt-2" />
                <h3 className="text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-[#8B7E74] font-light">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ - Réaliste */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl text-gray-900 mb-8 text-center">
            Questions fréquentes
          </h2>

          <div className="space-y-4 max-w-3xl mx-auto">
            {warrantyFaqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isExpanded={expandedFaq === index}
                onToggle={() => setExpandedFaq(expandedFaq === index ? null : index)}
              />
            ))}
          </div>
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-[#6B1E3E] to-[#8B2E4E] rounded-3xl p-12 text-center text-white"
        >
          <h2 className="text-3xl mb-4">
            Une question sur la garantie ?
          </h2>
          <p className="text-xl text-white/90 mb-8 font-light">
            Notre équipe est là pour vous aider
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-6">
            <button
              onClick={() => navigate('support')}
              className="px-8 py-4 bg-white text-[#6B1E3E] rounded-full hover:shadow-xl transition-all flex items-center gap-2"
            >
              <Phone className="w-5 h-5" />
              <span>Contacter le support</span>
            </button>
            <a
              href="mailto:support@hydral.fr"
              className="px-8 py-4 bg-white/20 text-white rounded-full hover:bg-white/30 transition-all flex items-center gap-2 backdrop-blur-sm"
            >
              <Mail className="w-5 h-5" />
              <span>support@hydral.fr</span>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function FAQItem({ 
  question, 
  answer, 
  isExpanded, 
  onToggle 
}: { 
  question: string; 
  answer: string; 
  isExpanded: boolean; 
  onToggle: () => void;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[#6B1E3E]/10 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-[#FAF8F5] transition-colors"
      >
        <span className="text-gray-900">{question}</span>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-[#6B1E3E]"
        >
          ▼
        </motion.div>
      </button>
      
      <motion.div
        initial={false}
        animate={{ height: isExpanded ? 'auto' : 0 }}
        className="overflow-hidden"
      >
        <div className="px-6 pb-4 text-[#8B7E74] border-t border-[#6B1E3E]/10 pt-4">
          {answer}
        </div>
      </motion.div>
    </div>
  );
}

const warrantyFaqs = [
  {
    question: 'La garantie est-elle automatique ?',
    answer: 'Oui, la garantie de 3 ans est automatiquement activée dès l\'achat. Conservez votre facture comme preuve d\'achat.'
  },
  {
    question: 'Que faire en cas de problème ?',
    answer: 'Contactez notre support par email (support@hydral.fr) ou téléphone. Nous effectuons un diagnostic et vous guidons vers la solution adaptée : envoi de pièces, manuel de dépannage, ou retour produit selon le cas.'
  },
  {
    question: 'Les filtres sont-ils couverts ?',
    answer: 'Non, les filtres sont des consommables (comme les cartouches CO₂). Ils se changent tous les 6 mois. En revanche, tout dysfonctionnement du système de filtration est couvert par la garantie.'
  },
  {
    question: 'Puis-je installer moi-même ?',
    answer: 'Oui si vous êtes bricoleur. Nous fournissons un manuel détaillé + vidéo. Sinon, faites appel à un plombier de votre choix. L\'installation est simple pour un professionnel (2-3h).'
  },
  {
    question: 'Quelle est la durée de vie du robinet ?',
    answer: 'HYDRAL est conçu pour durer plus de 10 ans avec un entretien régulier. Les pièces détachées sont disponibles pendant toute la durée de vie du produit.'
  }
];
