import React from 'react';
import { Page } from '../App';
import { HelpCircle, Mail, Phone, MessageCircle, ChevronDown, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

interface FAQPageProps {
  navigate: (page: Page) => void;
}

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  // Installation
  {
    category: 'Installation',
    question: "Puis-je installer le robinet moi-même ?",
    answer: "Techniquement oui, si vous avez des compétences en plomberie. Le robinet se branche sur l'arrivée d'eau existante (raccords standards). Les modules sous évier (boiler, chiller, filtre) se connectent ensuite. Notice complète fournie. Mais attention : cela implique une intervention électrique (boiler 230V) et des raccords sous pression. Si vous n'êtes pas sûr, faites appel à un installateur. Nous avons un réseau de partenaires dans toute la France (installation selon région - prix à définir). Pas de honte à déléguer : c'est votre cuisine, pas un chantier d'apprentissage."
  },
  {
    category: 'Installation',
    question: "Combien de temps dure l'installation ?",
    answer: "Comptez 2 à 3 heures pour un professionnel. Si vous le faites vous-même et que c'est votre première fois, prévoyez une demi-journée. L'installation inclut : dépose de l'ancien robinet, perçage si nécessaire (Ø 35mm), fixation du nouveau, raccordement eau froide/chaude, installation des modules sous évier, branchement électrique, test de tous les circuits. Ce n'est pas compliqué, c'est juste méthodique."
  },
  {
    category: 'Installation',
    question: "Ai-je besoin d'une prise électrique sous l'évier ?",
    answer: "Oui. Le boiler et le chiller (optionnel) fonctionnent sur secteur 230V. Si vous n'avez pas de prise sous évier, il faut en faire tirer une. C'est souvent le cas dans les cuisines récentes, mais pas toujours dans l'ancien. Un électricien met 30 minutes à 1 heure pour cela. Coût : 50-100€. Anticipez cette contrainte si vous rénovez."
  },
  {
    category: 'Installation',
    question: "Mon plan de travail est-il compatible ?",
    answer: "Probablement. Le robinet nécessite un perçage de Ø 35mm (standard). Tous les matériaux courants sont compatibles : inox, granit, quartz, stratifié, bois massif. Seule exception : les plans ultra-fins (<20mm) peuvent poser problème selon le modèle. Si vous avez un doute, envoyez-nous une photo de votre évier et plan de travail. On vous répond en 24h."
  },
  {
    category: 'Installation',
    question: "Que se passe-t-il si je déménage ?",
    answer: "Vous emportez votre robinet. C'est votre investissement, pas celui du propriétaire. Le démontage prend 1 heure. Vous réinstallez un robinet classique (30-50€) dans l'ancien logement, et vous remontez votre HYDRAL dans le nouveau. C'est exactement comme déménager avec votre électroménager. Beaucoup de clients le font."
  },

  // Technique
  {
    category: 'Technique',
    question: "Comment fonctionne l'eau bouillante instantanée ?",
    answer: "Un réservoir de 3L sous l'évier maintient l'eau en permanence à 100°C (boiler isolé, consommation <10W en veille). Quand vous ouvrez le robinet, l'eau sort immédiatement bouillante. Pas de chauffe à la demande, pas d'attente. Le réservoir se remplit et rechauffe automatiquement (environ 10 minutes pour un cycle complet). Technologie simple, fiable, et éprouvée depuis des décennies."
  },
  {
    category: 'Technique',
    question: "L'eau filtrée a-t-elle vraiment meilleur goût ?",
    answer: "Oui, si votre eau du robinet a un goût de chlore ou de calcaire. Le filtre 5 étapes (charbon actif + résine échangeuse d'ions) élimine 99% du chlore, réduit le calcaire et capture les particules. Résultat : une eau neutre, sans arrière-goût. Est-ce miraculeux ? Non. Est-ce que ça change le quotidien si vous n'aimiez pas boire l'eau du robinet ? Absolument. Testez pendant 30 jours, vous verrez par vous-même."
  },
  {
    category: 'Technique',
    question: "Le système CO₂ est-il compatible avec toutes les marques de cartouches ?",
    answer: "Non. Nous utilisons des cartouches standard 60L (compatible SodaStream et équivalents). Mais attention : toutes les cartouches 'compatibles' ne se valent pas. Nous recommandons nos cartouches ou celles certifiées pour usage alimentaire. Les cartouches industrielles peuvent contenir des impuretés. Ne prenez pas de risque pour économiser 2€."
  },
  {
    category: 'Technique',
    question: "Quelle est la différence entre les 5 modèles de robinets ?",
    answer: "La technologie est identique. Les 5 types d'eau sont les mêmes sur tous les modèles. Ce qui change : le design (moderne, minimaliste, classique, industriel), la hauteur du bec, la présence ou non d'une douchette extractible. FLEX = bec extractible pour flexibilité. SQUARE = lignes carrées, bec fixe haut. FUSION = ultra-compact et épuré. CLASSIC = col de cygne élégant. PRO = inspiré des cuisines de restaurant, très robuste. Choisissez selon votre cuisine et votre usage, pas selon les fonctionnalités (elles sont identiques)."
  },
  {
    category: 'Technique',
    question: "Que se passe-t-il en cas de coupure d'électricité ?",
    answer: "L'eau chaude et froide classique (mitigeur) continue de fonctionner normalement. L'eau bouillante, filtrée réfrigérée et pétillante ne sont plus disponibles tant que le courant est coupé. Le boiler perd sa température en ~6-8 heures. Quand le courant revient, il rechauffe automatiquement (environ 15 minutes). Aucune manipulation nécessaire. C'est exactement comme votre frigo : il s'arrête en cas de coupure, puis redémarre."
  },

  // Prix & Modèle économique
  {
    category: 'Prix',
    question: "Pourquoi 490€ alors que le marché propose 1500-3000€ ?",
    answer: "Parce que nous vendons directement, sans réseau de revendeurs (qui prennent 40-60% de marge). Parce que notre structure est légère (pas de showrooms, pas de force de vente). Parce que nous misons sur la récurrence des consommables plutôt que sur une marge énorme à l'achat. Et parce que nous pensons qu'un produit aussi utile doit être accessible. D'autres marques ont fait le choix du luxe exclusif. Nous avons fait celui de l'accessibilité sérieuse sans compromis sur la qualité."
  },
  {
    category: 'Prix',
    question: "Y a-t-il des frais cachés ?",
    answer: "Non. À partir de 490€ pour le Pure (eau filtrée + bouillante), 890€ pour le Spark (+ gazeuse + froide), 990€ pour le One (toutes les eaux). Toutes les finitions sont incluses dans le prix. Ce qui est EN PLUS (optionnel) : installation par professionnel (prix à définir selon région), extension de garantie à 10 ans (prix à définir), formule d'entretien annuelle (59-139€/an selon usage). Garantie 3 ans incluse sur tous les modèles. Tout est transparent. Zéro surprise."
  },
  {
    category: 'Prix',
    question: "Est-ce rentable par rapport à acheter de l'eau en bouteille ?",
    answer: "Oui, rapidement. Une famille de 4 qui achète 2 packs d'eau/semaine dépense ~520€/an. Ajoutez l'électricité de la bouilloire (~85€/an). Total : 605€/an. Avec HYDRAL : robinet 490€ (amorti en 9 mois) + formule entretien 99€/an + électricité optimisée 45€/an = 144€/an en fonctionnement récurrent. Économie nette : ~460€/an dès la deuxième année. Sans compter le temps gagné (plus de courses, plus de stockage, plus de déchets)."
  },
  {
    category: 'Prix',
    question: "Puis-je payer en plusieurs fois ?",
    answer: "Oui. Nous proposons le paiement en 3x ou 4x sans frais via notre partenaire bancaire. Exemple : 490€ = 4x 122,50€. Aucun intérêt, aucun frais de dossier. Validation immédiate en ligne. Nous proposons aussi Alma (paiement différé ou étalé). Objectif : rendre le produit accessible sans crédit conso classique."
  },

  // Entretien
  {
    category: 'Entretien',
    question: "À quelle fréquence faut-il changer les filtres ?",
    answer: "Tous les 6 mois en usage familial standard (3-4 personnes). Le filtre traite environ 3000L avant saturation. Si vous êtes plus nombreux ou consommez beaucoup d'eau filtrée, ce sera tous les 4-5 mois. À l'inverse, si vous êtes seul(e), vous pouvez tenir 8-10 mois. Le robinet a un indicateur de saturation (LED qui passe à l'orange, puis rouge). Pas besoin de compter les jours, il vous prévient."
  },
  {
    category: 'Entretien',
    question: "Que se passe-t-il si je ne change pas le filtre à temps ?",
    answer: "L'eau reste potable (elle vient du réseau). Mais le filtre sature et devient inefficace : le chlore revient, le calcaire aussi, l'eau n'a plus bon goût. C'est comme rouler avec un filtre à air encrassé : ça marche, mais mal. Le robinet vous alerte visuellement (LED rouge). Au-delà de 20% de dépassement, il peut bloquer l'eau filtrée (sécurité). Changez le filtre, c'est tout. Vous avez un mois de marge après l'alerte orange."
  },
  {
    category: 'Entretien',
    question: "Le détartrage est-il nécessaire ?",
    answer: "Oui, 1 fois par an si vous êtes en zone calcaire (>25°f). Le boiler accumule du calcaire, comme une bouilloire classique. Le détartrage prend 30 minutes (vidange + produit détartrant + rinçage). Vous pouvez le faire vous-même (tuto vidéo fourni) ou via un technicien partenaire (inclus dans les formules Famille et au-dessus). Si vous ne le faites jamais, le boiler perd en efficacité et peut tomber en panne (mais c'est couvert par la garantie 3 ans)."
  },
  {
    category: 'Entretien',
    question: "Puis-je acheter les consommables ailleurs que chez vous ?",
    answer: "Oui pour les cartouches CO₂ (standard 60L, compatibles SodaStream). Non pour les filtres (propriétaires, conçus pour notre système). Nous ne verrouillons pas artificiellement : c'est juste que le filtre est spécifique à notre robinet. Prix filtre chez nous : 35€ à l'unité, ou inclus dans la formule entretien (plus économique dès 2 filtres/an)."
  },

  // Sécurité
  {
    category: 'Sécurité',
    question: "Y a-t-il un risque de brûlure avec l'eau bouillante ?",
    answer: "Oui, comme avec toute eau à 100°C. C'est pour ça que nous avons une double sécurité : (1) bouton poussoir dédié (impossible d'ouvrir l'eau bouillante par erreur), (2) verrou enfant (bouton à pousser + tourner, impossible pour un enfant <6 ans). L'eau bouillante ne sort JAMAIS par accident. Vous devez faire un geste volontaire, conscient. Mais oui, une fois sortie, cette eau est à 100°C. Traitez-la comme l'eau d'une casserole sur le feu."
  },
  {
    category: 'Sécurité',
    question: "Le robinet chauffe-t-il au toucher ?",
    answer: "Non. Le bec est isolé thermiquement. Même quand l'eau bouillante coule, vous pouvez toucher le robinet sans risque. Le boiler sous l'évier est également isolé (température externe <40°C). Seule l'eau qui sort est bouillante, jamais le robinet lui-même."
  },
  {
    category: 'Sécurité',
    question: "Le système est-il certifié pour un usage alimentaire ?",
    answer: "Oui. Certifications CE et ACS (Attestation de Conformité Sanitaire, obligatoire en France pour tout contact eau potable). Tous les matériaux en contact avec l'eau sont de qualité alimentaire (laiton sans plomb, joints silicone food-grade, filtre certifié NSF). Contrôles qualité stricts à chaque lot. Nous ne prenons aucun risque sur ce point."
  },

  // Comparaison & Concurrence
  {
    category: 'Comparaison',
    question: "Pourquoi ne pas acheter une bouilloire + une carafe filtrante + une SodaStream ?",
    answer: "Vous pouvez. Ça coûtera ~150€ au total. Mais : (1) vous perdez de l'espace (3 appareils sur le plan de travail ou dans le placard), (2) vous perdez du temps (remplir, attendre, transvaser), (3) vous multipliez les gestes (ça semble anodin, mais répétez 3-4 fois par jour pendant 10 ans, vous verrez). HYDRAL n'est pas 'mieux' dans l'absolu. Il est mieux si vous valorisez votre temps, votre espace et la fluidité de vos gestes quotidiens. Si ça ne compte pas pour vous, gardez vos 3 appareils."
  },

  // Garantie & SAV
  {
    category: 'Garantie',
    question: "La garantie 3 ans couvre-t-elle vraiment tout ?",
    answer: "Presque. Elle couvre tous les défauts de fabrication, les pannes électroniques, les fuites, les dysfonctionnements des modules (boiler, chiller, filtre). Elle ne couvre PAS : l'usure normale (joints, cartouches), les dommages causés par un mauvais usage (choc, gel, détartrage non fait pendant 3 ans), les dégâts des eaux si mauvaise installation. C'est une garantie sérieuse, pas marketing. Si le robinet tombe en panne dans les 5 ans sans faute de votre part, on le répare ou on le remplace. Point."
  },
  {
    category: 'Garantie',
    question: "Que se passe-t-il si une pièce tombe en panne après 5 ans ?",
    answer: "Vous la rachetez. Prix pièces détachées public (pas de secret) : cartouche céramique 35€, boiler 180€, carte électronique 90€, filtre 35€. La plupart des pièces se changent facilement (tuto vidéo). Si vous prenez l'extension de garantie 10 ans (+99€), vous êtes couvert 5 ans de plus. Statistiquement, 85% des pannes surviennent dans les 3 premières années (défaut de fabrication). Après 5 ans, le robinet est rodé."
  },
  {
    category: 'Garantie',
    question: "Le SAV est-il réactif ?",
    answer: "On s'y engage. Réponse sous 24h ouvrées (email/téléphone). Diagnostic à distance dans 90% des cas (photo + description). Si besoin de pièce : expédition sous 48h. Si besoin d'intervention : technicien sous 5-7 jours (selon région). Nous ne sommes pas Amazon, nous n'avons pas 1000 techniciens partout. Mais nous traitons chaque client sérieusement. Vous n'êtes pas un numéro de ticket."
  },
];

const categories = [
  { id: 'all', name: 'Toutes', icon: <HelpCircle className="w-5 h-5" /> },
  { id: 'Installation', name: 'Installation', icon: <HelpCircle className="w-5 h-5" /> },
  { id: 'Technique', name: 'Technique', icon: <HelpCircle className="w-5 h-5" /> },
  { id: 'Prix', name: 'Prix & Économie', icon: <HelpCircle className="w-5 h-5" /> },
  { id: 'Entretien', name: 'Entretien', icon: <HelpCircle className="w-5 h-5" /> },
  { id: 'Sécurité', name: 'Sécurité', icon: <HelpCircle className="w-5 h-5" /> },
  { id: 'Comparaison', name: 'Comparaison', icon: <HelpCircle className="w-5 h-5" /> },
  { id: 'Garantie', name: 'Garantie & SAV', icon: <HelpCircle className="w-5 h-5" /> },
];

export function FAQPage({ navigate }: FAQPageProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openItems, setOpenItems] = useState<number[]>([]);

  const filteredFAQ = faqData.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Hero */}
      <section className="relative pt-24 sm:pt-32 lg:pt-40 pb-16 sm:pb-24 lg:pb-32 bg-gradient-to-br from-white via-[#FAF8F5] to-[#E8D5DC]/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="mb-8">
              <span className="block text-gray-900">Questions fréquentes</span>
              <span className="block text-[#6B1E3E]">Réponses honnêtes</span>
            </h1>
            <p className="text-xl text-[#8B7E74] leading-relaxed max-w-3xl mx-auto">
              Pas de langue de bois. Pas de réponses marketing. Juste ce que vous devez savoir avant d'acheter.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Recherche & Filtres */}
      <section className="py-12 bg-white border-y border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Barre de recherche */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8B7E74]" />
              <input
                type="text"
                placeholder="Rechercher une question..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-[#FAF8F5] border border-gray-200 rounded-2xl focus:outline-none focus:border-[#6B1E3E]/40 focus:ring-2 focus:ring-[#6B1E3E]/10 transition-all"
              />
            </div>
          </div>

          {/* Filtres par catégorie */}
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map(cat => (
              <motion.button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-full transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[#6B1E3E] text-white shadow-md'
                    : 'bg-[#FAF8F5] border border-gray-200 text-gray-700 hover:border-[#6B1E3E]/30'
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {cat.icon}
                <span>{cat.name}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Questions */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#FAF8F5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredFAQ.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-[#8B7E74]">
                Aucune question ne correspond à votre recherche.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFAQ.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-2xl border border-gray-200/50 overflow-hidden"
                >
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full px-8 py-6 flex items-start justify-between gap-4 hover:bg-[#FAF8F5]/50 transition-colors text-left"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-3 py-1 bg-[#6B1E3E]/10 border border-[#6B1E3E]/20 rounded-full text-xs text-[#6B1E3E]">
                          {item.category}
                        </span>
                      </div>
                      <h3 className="text-lg text-gray-900">{item.question}</h3>
                    </div>
                    <motion.div
                      animate={{ rotate: openItems.includes(index) ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0"
                    >
                      <ChevronDown className="w-6 h-6 text-[#6B1E3E]" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {openItems.includes(index) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-8 pb-6 pt-2 border-t border-gray-200/50">
                          <p className="text-[#8B7E74] leading-relaxed whitespace-pre-line">
                            {item.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact si pas de réponse */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="mb-6 text-gray-900">Vous ne trouvez pas votre réponse ?</h2>
            <p className="text-xl text-[#8B7E74] mb-10 max-w-2xl mx-auto">
              Posez-nous directement votre question. Nous répondons sous 24h, sans langue de bois.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:contact@hydral.fr"
                className="px-8 py-4 bg-[#6B1E3E] text-white rounded-full hover:bg-[#6B1E3E]/90 transition-colors"
              >
                Envoyer un email
              </a>
              <a
                href="tel:+33123456789"
                className="px-8 py-4 bg-white border-2 border-[#6B1E3E]/30 text-[#6B1E3E] rounded-full hover:border-[#6B1E3E] hover:bg-[#6B1E3E]/5 transition-colors"
              >
                Appeler le 01 23 45 67 89
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}