import React, { useState } from 'react';
import { Search, ChevronDown, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  tags: string[];
}

interface DynamicFAQProps {
  items?: FAQItem[];
  showCategoryFilter?: boolean;
}

export function DynamicFAQ({ items, showCategoryFilter = true }: DynamicFAQProps) {
  const defaultFAQs: FAQItem[] = items || [
    {
      id: '1',
      question: 'Quelle est la différence entre COMBI 3L et COMBI 7L ?',
      answer: 'Le COMBI 3L a un réservoir de 3 litres d\'eau bouillante, idéal pour 1-2 personnes (10-12 tasses/jour). Le COMBI 7L a un réservoir de 7 litres, parfait pour familles ou usage intensif (25-30 tasses/jour). Les deux incluent eau froide filtrée.',
      category: 'Produit',
      tags: ['combi', 'capacité', 'réservoir']
    },
    {
      id: '2',
      question: 'Quelle est la garantie ?',
      answer: 'HYDRAL bénéficie d\'une garantie constructeur de 5 ans couvrant toutes les pièces et la main d\'œuvre. En cas de problème, notre SAV intervient sous 48h partout en France.',
      category: 'Garantie',
      tags: ['garantie', 'sav', 'service']
    },
    {
      id: '3',
      question: 'Puis-je installer HYDRAL moi-même ?',
      answer: 'L\'installation nécessite des compétences en plomberie et une habilitation électrique (230V pour le boiler). Si vous souhaitez l\'installer vous-même, nous fournissons un manuel d\'installation détaillé. Sinon, vous pouvez faire appel à votre plombier habituel.',
      category: 'Installation',
      tags: ['diy', 'installation', 'manuel']
    },
    {
      id: '4',
      question: 'HYDRAL fonctionne-t-il dans ma cuisine ?',
      answer: 'HYDRAL nécessite : • Espace sous évier : min. 40×50×45cm (COMBI 3L) ou 50×60×50cm (COMBI 7L) • Prise électrique 230V à proximité • Arrivée d\'eau froide standard • Évacuation classique. Utilisez notre outil de vérification de compatibilité pour être sûr.',
      category: 'Compatibilité',
      tags: ['compatibilité', 'dimensions', 'électricité']
    },
    {
      id: '5',
      question: 'Quel est le coût réel d\'usage par an ?',
      answer: 'Abonnement consommables : 59€/an (COMBI seul, filtre eau) à 139€/an (COMBI + CUBE, filtre + CO₂). Électricité boiler : ~40-80€/an selon usage. Total : 99-219€/an. À comparer aux 400-800€/an dépensés en packs d\'eau + bouilloire électrique.',
      category: 'Coûts',
      tags: ['prix', 'abonnement', 'économies', 'tco']
    },
    {
      id: '6',
      question: 'Comment fonctionne l\'abonnement consommables ?',
      answer: 'Livraison automatique tous les 6 ou 12 mois : filtres à eau (COMBI) + cartouches CO₂ (CUBE si applicable). Sans engagement, pause/annulation en 1 clic. Tarifs : 59€/an (filtre seul) ou 139€/an (filtre + CO₂). Livraison gratuite.',
      category: 'Abonnement',
      tags: ['abonnement', 'filtre', 'co2', 'livraison']
    },
    {
      id: '7',
      question: 'Puis-je payer en plusieurs fois ?',
      answer: 'Oui ! Paiement 3× ou 4× sans frais avec Klarna ou Alma. Exemple pour 490€ : 4× 122,50€ (1 paiement immédiat + 3 mensuels). Validation instantanée, aucun frais caché.',
      category: 'Paiement',
      tags: ['paiement', 'facilité', 'klarna', 'alma']
    },
    {
      id: '8',
      question: 'Quelle est la consommation électrique ?',
      answer: 'Le boiler COMBI consomme ~2100W en chauffe, puis maintient la température en mode veille (~10-20W). Consommation moyenne : 3-7 kWh/semaine selon usage, soit ~40-80€/an (tarif moyen 0,20€/kWh). Isolation thermique optimale pour limiter les pertes.',
      category: 'Technique',
      tags: ['électricité', 'consommation', 'énergie', 'boiler']
    },
    {
      id: '9',
      question: 'L\'eau filtrée a-t-elle vraiment meilleur goût ?',
      answer: 'Oui. Le filtre à charbon actif élimine chlore (goût désagréable), calcaire, métaux lourds et impuretés. Résultat : eau pure, neutre, idéale pour thé/café. Tests aveugles : 89% préfèrent l\'eau HYDRAL vs eau du robinet non filtrée.',
      category: 'Qualité',
      tags: ['filtre', 'goût', 'eau', 'qualité']
    },
    {
      id: '10',
      question: 'Que se passe-t-il si je déménage ?',
      answer: 'HYDRAL est démontable et réinstallable. Options : 1) Emportez-le (désinstallation + réinstallation ~290€) 2) Laissez-le (valorise le bien immobilier, argument de vente) 3) Transférez l\'abonnement au nouveau propriétaire.',
      category: 'Logistique',
      tags: ['déménagement', 'transport', 'réinstallation']
    },
    {
      id: '11',
      question: 'HYDRAL est-il vraiment écologique ?',
      answer: 'Oui. Par an (famille 4 pers) : • 2400 bouteilles plastique évitées • 156 kg CO₂ économisés • 84 kg plastique non produit • 0 transport de packs d\'eau. Impact carbone fabrication compensé en 8-12 mois d\'usage.',
      category: 'Écologie',
      tags: ['écologie', 'environnement', 'co2', 'plastique']
    },
    {
      id: '12',
      question: 'La garantie couvre-t-elle tout ?',
      answer: 'Garantie 5 ans pièces et main d\'œuvre : robinet, boiler, module CUBE, électronique. Exclusions : consommables (filtres, CO₂), dommages accidentels, usure normale joints. SAV <24h, pièces détachées disponibles 10 ans minimum.',
      category: 'SAV',
      tags: ['garantie', 'sav', 'pièces', 'réparation']
    }
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [openItemId, setOpenItemId] = useState<string | null>(null);

  const categories = ['Tous', ...Array.from(new Set(defaultFAQs.map(item => item.category)))];

  const filteredFAQs = defaultFAQs.filter(item => {
    const matchesSearch = 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'Tous' || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      {/* Search & Filters */}
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher une question..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white border border-gray-300 rounded-2xl focus:outline-none focus:border-[#6B1E3E] transition-colors text-gray-900 placeholder-gray-500"
          />
        </div>

        {/* Category Filters */}
        {showCategoryFilter && (
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <Filter className="w-4 h-4 text-gray-500 flex-shrink-0" />
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm transition-all whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-[#6B1E3E] text-white'
                    : 'bg-white border border-gray-300 text-gray-700 hover:border-[#6B1E3E]/40'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-600">
        {filteredFAQs.length} {filteredFAQs.length === 1 ? 'question trouvée' : 'questions trouvées'}
      </div>

      {/* FAQ Items */}
      <div className="space-y-4">
        {filteredFAQs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-2">Aucune question ne correspond à votre recherche.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('Tous');
              }}
              className="text-[#6B1E3E] hover:underline"
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          filteredFAQs.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden"
            >
              <button
                onClick={() => setOpenItemId(openItemId === item.id ? null : item.id)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1 pr-4">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-xs px-2 py-1 rounded-full bg-[#6B1E3E]/10 text-[#6B1E3E]">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="text-lg text-gray-900">{item.question}</h3>
                </div>
                <motion.div
                  animate={{ rotate: openItemId === item.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openItemId === item.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 pt-2 border-t border-gray-100">
                      <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mt-4">
                        {item.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}