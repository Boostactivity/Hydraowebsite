import React from 'react';
import { Page } from '../App';
import { motion } from 'motion/react';

interface LegalPageProps {
  navigate: (page: Page) => void;
  type?: 'mentions' | 'privacy' | 'cookies' | 'cgv';
}

export function LegalPage({ navigate, type = 'mentions' }: LegalPageProps) {
  const getTitle = () => {
    switch (type) {
      case 'mentions': return 'Mentions légales';
      case 'privacy': return 'Politique de confidentialité';
      case 'cookies': return 'Cookies';
      case 'cgv': return 'Conditions générales de vente';
      default: return 'Informations légales';
    }
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
            <h1 className="mb-8 text-gray-900">{getTitle()}</h1>
            <p className="text-xl text-[#8B7E74]">Dernière mise à jour : 15 mars 2026</p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            {type === 'mentions' && (
              <div className="space-y-12">
                <div>
                  <h2 className="text-2xl mb-4 text-gray-900">Éditeur du site</h2>
                  <div className="p-6 bg-[#FAF8F5] rounded-2xl border border-gray-200">
                    <p className="text-[#8B7E74] leading-relaxed mb-0">
                      <strong className="text-gray-900">HYDRAL SAS</strong><br />
                      Capital social : 500 000€<br />
                      SIRET : 850 973 686 00049<br />
                      RCS Bobigny<br />
                      Siège social : 12 Avenue du President Wilson, 93200 Saint-Denis<br />
                      Téléphone : +33 6 60 96 85 16<br />
                      Email : contact@hydral.fr
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl mb-4 text-gray-900">Directeur de publication</h2>
                  <p className="text-[#8B7E74]">M. Adel MAGHRABI, Président</p>
                </div>

                <div>
                  <h2 className="text-2xl mb-4 text-gray-900">Hébergement</h2>
                  <div className="p-6 bg-[#FAF8F5] rounded-2xl border border-gray-200">
                    <p className="text-[#8B7E74] leading-relaxed mb-0">
                      Hostinger International Ltd<br />
                      61 Lordou Vironos Street, 6023 Larnaca, Chypre<br />
                      Tél : hostinger.fr
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl mb-4 text-gray-900">Propriété intellectuelle</h2>
                  <p className="text-[#8B7E74] leading-relaxed">
                    L'ensemble du contenu de ce site (textes, images, vidéos, logos, design) est protégé par le droit d'auteur et est la propriété exclusive de HYDRAL SAS. Toute reproduction ou utilisation sans autorisation préalable est interdite.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl mb-4 text-gray-900">TVA intracommunautaire</h2>
                  <p className="text-[#8B7E74]">TVA : En cours d'obtention</p>
                </div>
              </div>
            )}

            {type === 'privacy' && (
              <div className="space-y-12">
                <div>
                  <h2 className="text-2xl mb-4 text-gray-900">Protection des données personnelles</h2>
                  <p className="text-[#8B7E74] leading-relaxed">
                    HYDRAL SAS s'engage à protéger vos données personnelles conformément au Règlement Général sur la Protection des Données (RGPD). Cette politique vous informe sur la manière dont nous collectons, utilisons et protégeons vos données.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl mb-4 text-gray-900">Données collectées</h2>
                  <p className="text-[#8B7E74] mb-4">Nous collectons uniquement les données nécessaires au traitement de vos commandes :</p>
                  <ul className="space-y-2 text-[#8B7E74]">
                    <li>• Nom, prénom</li>
                    <li>• Email</li>
                    <li>• Téléphone</li>
                    <li>• Adresse de livraison et facturation</li>
                    <li>• Historique de commandes et abonnements</li>
                    <li>• Données de paiement (via prestataire sécurisé Stripe, nous ne stockons jamais vos CB)</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl mb-4 text-gray-900">Utilisation des données</h2>
                  <p className="text-[#8B7E74] mb-4">Vos données sont utilisées uniquement pour :</p>
                  <ul className="space-y-2 text-[#8B7E74]">
                    <li>• Traiter et expédier vos commandes</li>
                    <li>• Gérer vos abonnements (formules d'entretien)</li>
                    <li>• Vous contacter en cas de besoin (SAV, support)</li>
                    <li>• Améliorer nos produits et services</li>
                  </ul>
                  <p className="text-[#8B7E74] mt-4 leading-relaxed">
                    <strong className="text-gray-900">Nous ne revendons jamais vos données.</strong> Nous ne partageons vos informations qu'avec nos prestataires techniques (paiement, livraison, hébergement) dans la stricte limite nécessaire.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl mb-4 text-gray-900">Vos droits</h2>
                  <p className="text-[#8B7E74] mb-4">Conformément au RGPD, vous disposez des droits suivants :</p>
                  <ul className="space-y-2 text-[#8B7E74]">
                    <li>• <strong className="text-gray-900">Droit d'accès :</strong> consulter vos données</li>
                    <li>• <strong className="text-gray-900">Droit de rectification :</strong> corriger vos données</li>
                    <li>• <strong className="text-gray-900">Droit de suppression :</strong> demander l'effacement de vos données</li>
                    <li>• <strong className="text-gray-900">Droit à la portabilité :</strong> récupérer vos données dans un format exploitable</li>
                    <li>• <strong className="text-gray-900">Droit d'opposition :</strong> refuser l'utilisation de vos données à des fins marketing</li>
                  </ul>
                  <p className="text-[#8B7E74] mt-4">
                    Pour exercer ces droits, contactez-nous à <a href="mailto:privacy@hydral.fr" className="text-[#6B1E3E] hover:underline">privacy@hydral.fr</a>. Nous vous répondons sous 30 jours.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl mb-4 text-gray-900">Durée de conservation</h2>
                  <p className="text-[#8B7E74] leading-relaxed">
                    Vos données de commande sont conservées 10 ans (obligation légale comptable). Vos données de compte client sont conservées tant que vous êtes actif, puis 3 ans après votre dernière activité.
                  </p>
                </div>
              </div>
            )}

            {type === 'cookies' && (
              <div className="space-y-12">
                <div>
                  <h2 className="text-2xl mb-4 text-gray-900">Utilisation des cookies</h2>
                  <p className="text-[#8B7E74] leading-relaxed">
                    Ce site utilise des cookies pour améliorer votre expérience de navigation et analyser notre audience. Un cookie est un petit fichier texte stocké sur votre appareil.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl mb-4 text-gray-900">Cookies essentiels</h2>
                  <p className="text-[#8B7E74] mb-4">Ces cookies sont nécessaires au fonctionnement du site. Ils ne peuvent pas être désactivés.</p>
                  <ul className="space-y-2 text-[#8B7E74]">
                    <li>• Gestion du panier d'achat</li>
                    <li>• Session de connexion</li>
                    <li>• Sécurité et protection CSRF</li>
                    <li>• Préférences de langue</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl mb-4 text-gray-900">Cookies analytiques (optionnels)</h2>
                  <p className="text-[#8B7E74] mb-4">Nous utilisons des cookies analytiques pour comprendre comment vous utilisez notre site (pages visitées, durée, parcours). Ces données sont anonymisées.</p>
                  <p className="text-[#8B7E74]">
                    Outils utilisés : Google Analytics
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl mb-4 text-gray-900">Gestion des cookies</h2>
                  <p className="text-[#8B7E74] leading-relaxed">
                    Vous pouvez à tout moment modifier vos préférences de cookies via les paramètres de votre navigateur. Bloquer les cookies essentiels peut empêcher certaines fonctionnalités du site de fonctionner correctement (panier, connexion).
                  </p>
                </div>
              </div>
            )}

            {type === 'cgv' && (
              <div className="space-y-12">
                <div>
                  <h2 className="text-2xl mb-4 text-gray-900">Article 1 - Objet</h2>
                  <p className="text-[#8B7E74] leading-relaxed">
                    Les présentes Conditions Générales de Vente (CGV) régissent les ventes de robinets HYDRAL et services associés (installation, abonnements) sur le site hydral.fr. Toute commande implique l'acceptation sans réserve de ces CGV.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl mb-4 text-gray-900">Article 2 - Prix</h2>
                  <p className="text-[#8B7E74] leading-relaxed">
                    Les prix sont indiqués en euros TTC. Ils incluent la TVA applicable au jour de la commande (20%). Les prix peuvent être modifiés à tout moment, mais les commandes validées restent au prix affiché lors de la validation.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl mb-4 text-gray-900">Article 3 - Commande</h2>
                  <p className="text-[#8B7E74] leading-relaxed mb-4">
                    La commande est finalisée après validation du paiement. Vous recevez une confirmation par email avec récapitulatif de votre commande et facture.
                  </p>
                  <p className="text-[#8B7E74] leading-relaxed">
                    HYDRAL se réserve le droit d'annuler une commande en cas d'indisponibilité du produit, d'erreur manifeste de prix, ou de problème de paiement. Vous serez remboursé intégralement sous 14 jours.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl mb-4 text-gray-900">Article 4 - Paiement</h2>
                  <p className="text-[#8B7E74] mb-4">Modes de paiement acceptés :</p>
                  <ul className="space-y-2 text-[#8B7E74]">
                    <li>• Carte bancaire (CB, Visa, Mastercard)</li>
                    <li>• Virement bancaire (uniquement professionnels sur demande)</li>
                  </ul>
                  <p className="text-[#8B7E74] mt-4 leading-relaxed">
                    Les paiements sont sécurisés via Stripe. Nous ne stockons jamais vos coordonnées bancaires.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl mb-4 text-gray-900">Article 5 - Livraison</h2>
                  <p className="text-[#8B7E74] leading-relaxed mb-4">
                    Livraison gratuite en France métropolitaine sous 5 à 7 jours ouvrés. Expédition par transporteur avec suivi. Vous recevez un email avec numéro de suivi dès l'expédition.
                  </p>
                  <p className="text-[#8B7E74] leading-relaxed">
                    En cas d'absence, le transporteur laisse un avis de passage. Le colis est disponible en point relais ou réexpédié sous 48h.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl mb-4 text-gray-900">Article 6 - Droit de rétractation</h2>
                  <p className="text-[#8B7E74] leading-relaxed mb-4">
                    Conformément à l'article L221-18 du Code de la consommation, vous disposez d'un délai de 14 jours à compter de la réception du produit pour exercer votre droit de rétractation sans motif. HYDRAL étend ce délai à 30 jours.
                  </p>
                  <p className="text-[#8B7E74] leading-relaxed mb-4">
                    Le produit doit être retourné dans son emballage d'origine, non installé, complet. Les frais de retour sont à votre charge sauf défaut ou erreur de notre part.
                  </p>
                  <p className="text-[#8B7E74] leading-relaxed">
                    Remboursement sous 14 jours après réception du retour, par le même moyen de paiement que celui utilisé pour la commande.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl mb-4 text-gray-900">Article 7 - Garantie</h2>
                  <p className="text-[#8B7E74] leading-relaxed mb-4">
                    Tous les robinets HYDRAL sont garantis 3 ans pièces et main d'œuvre contre tout défaut de fabrication. La garantie couvre : fuites, dysfonctionnements électroniques, défauts matériels.
                  </p>
                  <p className="text-[#8B7E74] leading-relaxed mb-4">
                    <strong className="text-gray-900">Exclusions :</strong> usure normale, mauvaise installation, défaut d'entretien (détartrage), chocs, modifications non autorisées.
                  </p>
                  <p className="text-[#8B7E74] leading-relaxed">
                    Garantie légale de conformité et garantie des vices cachés également applicables.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl mb-4 text-gray-900">Article 8 - Abonnements</h2>
                  <p className="text-[#8B7E74] leading-relaxed mb-4">
                    Les formules d'entretien (Solo, Duo, Famille) sont des abonnements annuels tacitement reconductibles. Résiliation possible à tout moment avec effet à la date anniversaire (pas de remboursement au prorata).
                  </p>
                  <p className="text-[#8B7E74] leading-relaxed">
                    Les consommables (filtres, cartouches CO₂) sont expédiés automatiquement selon la fréquence définie. Vous pouvez modifier ou suspendre votre abonnement depuis votre compte client.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl mb-4 text-gray-900">Article 9 - Responsabilité</h2>
                  <p className="text-[#8B7E74] leading-relaxed">
                    HYDRAL ne peut être tenu responsable de dommages indirects (perte d'exploitation, préjudice commercial) résultant de l'utilisation ou de l'impossibilité d'utiliser le produit. Notre responsabilité est limitée au prix d'achat du produit.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl mb-4 text-gray-900">Article 10 - Litiges</h2>
                  <p className="text-[#8B7E74] leading-relaxed mb-4">
                    En cas de litige, nous vous invitons à nous contacter en priorité à contact@hydral.fr. Nous nous engageons à trouver une solution amiable.
                  </p>
                  <p className="text-[#8B7E74] leading-relaxed">
                    À défaut d'accord amiable, vous pouvez recourir gratuitement à un médiateur de la consommation : Médiateur de la consommation (à désigner). En dernier recours, les tribunaux de Paris sont compétents.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Retour */}
      <section className="py-12 bg-[#FAF8F5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.button
            onClick={() => navigate('home')}
            className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-full hover:border-[#6B1E3E] hover:text-[#6B1E3E] transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Retour à l'accueil
          </motion.button>
        </div>
      </section>
    </div>
  );
}
