import React, { useState } from 'react';
import { Page } from '../App';
import { Wrench, Users, BookOpen, Shield, Euro, Phone, Mail, MapPin, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { InstallationWizard } from '../components/tools/InstallationWizard';

interface InstallersPageProps {
  navigate: (page: Page) => void;
}

export function InstallersPage({ navigate }: InstallersPageProps) {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
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
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#6B1E3E]/10 rounded-full mb-8 border border-[#6B1E3E]/20">
              <Wrench className="w-4 h-4 text-[#6B1E3E]" />
              <span className="text-sm text-[#6B1E3E]">Réseau installateurs pro</span>
            </div>
            <h1 className="mb-8">
              <span className="block text-gray-900">Vous êtes plombier-installateur ?</span>
              <span className="block text-[#6B1E3E]">Devenez partenaire HYDRAL</span>
            </h1>
            <p className="text-xl text-[#8B7E74] leading-relaxed max-w-3xl mx-auto">
              Nous cherchons des professionnels sérieux pour installer nos robinets chez nos clients. Pas de démarchage, pas de vente. Juste de l'installation technique de qualité.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pourquoi travailler avec nous */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="mb-6 text-gray-900">Ce que nous proposons</h2>
            <p className="text-xl text-[#8B7E74] max-w-3xl mx-auto">
              Un partenariat honnête, des clients qualifiés, une rémunération claire.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-10 bg-gradient-to-br from-[#FAF8F5] to-white rounded-3xl border border-gray-200/50"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#6B1E3E]/10 flex items-center justify-center mb-8">
                <Users className="w-8 h-8 text-[#6B1E3E]" />
              </div>
              <h3 className="text-2xl mb-4 text-gray-900">Clients qualifiés</h3>
              <p className="text-[#8B7E74] mb-6 leading-relaxed">
                Nous ne vous envoyons que des clients qui ont déjà commandé leur robinet et souhaitent une installation pro. Pas de prospection, pas de devis à vendre.
              </p>
              <ul className="space-y-2 text-[#8B7E74]">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#6B1E3E] flex-shrink-0 mt-0.5" />
                  <span>Client a déjà payé le robinet</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#6B1E3E] flex-shrink-0 mt-0.5" />
                  <span>Besoin d'installation confirmé</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#6B1E3E] flex-shrink-0 mt-0.5" />
                  <span>Coordonnées complètes fournies</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-10 bg-gradient-to-br from-[#FAF8F5] to-white rounded-3xl border border-gray-200/50"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#6B1E3E]/10 flex items-center justify-center mb-8">
                <BookOpen className="w-8 h-8 text-[#6B1E3E]" />
              </div>
              <h3 className="text-2xl mb-4 text-gray-900">Formation technique</h3>
              <p className="text-[#8B7E74] mb-6 leading-relaxed">
                1 journée de formation sur l'installation des robinets HYDRAL. Raccordement électrique, boiler, module CO₂. Gratuit, avec certification.
              </p>
              <ul className="space-y-2 text-[#8B7E74]">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#6B1E3E] flex-shrink-0 mt-0.5" />
                  <span>Formation 1 jour (Lyon ou Paris)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#6B1E3E] flex-shrink-0 mt-0.5" />
                  <span>Documentation technique complète</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#6B1E3E] flex-shrink-0 mt-0.5" />
                  <span>Hotline technique 7j/7</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-10 bg-gradient-to-br from-[#6B1E3E] to-[#6B1E3E]/90 text-white rounded-3xl"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mb-8">
                <Euro className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl mb-4">Rémunération claire</h3>
              <p className="text-white/90 mb-6 leading-relaxed">
                Pas de commission compliquée. Un tarif fixe par installation, payé sous 7 jours. Simple. Transparent.
              </p>
              <div className="space-y-4">
                <div className="p-4 bg-white/10 rounded-2xl border border-white/20">
                  <p className="text-sm text-white/70 mb-1">Installation standard</p>
                  <p className="text-3xl">280€ HT</p>
                </div>
                <div className="p-4 bg-white/10 rounded-2xl border border-white/20">
                  <p className="text-sm text-white/70 mb-1">Installation + CUBE</p>
                  <p className="text-3xl">380€ HT</p>
                </div>
                <p className="text-sm text-white/70">Paiement sous 7 jours ouvrés</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Ce qu'on attend de vous */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-[#FAF8F5] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="mb-6 text-gray-900">Ce qu'on attend de vous</h2>
            <p className="text-xl text-[#8B7E74] max-w-3xl mx-auto">
              Nos clients payent cher pour un robinet premium. Ils méritent une installation irréprochable.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="p-8 bg-white rounded-3xl border border-gray-200/50">
              <h3 className="text-xl mb-4 text-gray-900">Prérequis obligatoires</h3>
              <ul className="space-y-3 text-[#8B7E74]">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#6B1E3E] flex-shrink-0 mt-0.5" />
                  <span>Minimum 3 ans d'expérience en plomberie</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#6B1E3E] flex-shrink-0 mt-0.5" />
                  <span>Assurance décennale à jour</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#6B1E3E] flex-shrink-0 mt-0.5" />
                  <span>Habilitation électrique (raccordement boiler 230V)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#6B1E3E] flex-shrink-0 mt-0.5" />
                  <span>Zone d'intervention stable (pas de nomade)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#6B1E3E] flex-shrink-0 mt-0.5" />
                  <span>Disponibilité sous 7-10 jours maximum</span>
                </li>
              </ul>
            </div>

            <div className="p-8 bg-white rounded-3xl border border-gray-200/50">
              <h3 className="text-xl mb-4 text-gray-900">Engagement qualité</h3>
              <ul className="space-y-3 text-[#8B7E74]">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#6B1E3E] flex-shrink-0 mt-0.5" />
                  <span>Installation propre (protection plan de travail, nettoyage)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#6B1E3E] flex-shrink-0 mt-0.5" />
                  <span>Explication au client du fonctionnement</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#6B1E3E] flex-shrink-0 mt-0.5" />
                  <span>Respect des consignes de montage HYDRAL</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#6B1E3E] flex-shrink-0 mt-0.5" />
                  <span>Compte-rendu photo après installation</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#6B1E3E] flex-shrink-0 mt-0.5" />
                  <span>SAV sous 48h en cas de problème</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Formulaire de candidature */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="mb-6 text-gray-900">Candidature</h2>
            <p className="text-xl text-[#8B7E74]">
              Remplissez ce formulaire. Nous vous recontactons sous 48h pour planifier la formation.
            </p>
          </div>

          {!formSubmitted ? (
            <motion.form
              onSubmit={handleSubmit}
              className="bg-gradient-to-br from-[#FAF8F5] to-white p-10 rounded-3xl border border-gray-200/50"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="space-y-6">
                {/* Informations personnelles */}
                <div>
                  <h3 className="text-xl mb-6 text-gray-900">Informations personnelles</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-[#8B7E74] mb-2">Prénom *</label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#6B1E3E] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-[#8B7E74] mb-2">Nom *</label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#6B1E3E] transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Entreprise */}
                <div>
                  <h3 className="text-xl mb-6 text-gray-900">Entreprise</h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm text-[#8B7E74] mb-2">Nom de l'entreprise *</label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#6B1E3E] transition-colors"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm text-[#8B7E74] mb-2">SIRET *</label>
                        <input
                          type="text"
                          required
                          placeholder="XXX XXX XXX XXXXX"
                          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#6B1E3E] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-[#8B7E74] mb-2">Année de création *</label>
                        <input
                          type="number"
                          required
                          placeholder="2010"
                          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#6B1E3E] transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact */}
                <div>
                  <h3 className="text-xl mb-6 text-gray-900">Contact</h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm text-[#8B7E74] mb-2">Email professionnel *</label>
                      <input
                        type="email"
                        required
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#6B1E3E] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-[#8B7E74] mb-2">Téléphone *</label>
                      <input
                        type="tel"
                        required
                        placeholder="06 XX XX XX XX"
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#6B1E3E] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-[#8B7E74] mb-2">Zone d'intervention principale *</label>
                      <input
                        type="text"
                        required
                        placeholder="ex: Île-de-France, Lyon et périphérie..."
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#6B1E3E] transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Qualifications */}
                <div>
                  <h3 className="text-xl mb-6 text-gray-900">Qualifications</h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm text-[#8B7E74] mb-2">Années d'expérience en plomberie *</label>
                      <select
                        required
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#6B1E3E] transition-colors"
                      >
                        <option value="">Sélectionnez</option>
                        <option value="3-5">3-5 ans</option>
                        <option value="5-10">5-10 ans</option>
                        <option value="10-15">10-15 ans</option>
                        <option value="15+">15+ ans</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-[#8B7E74] mb-2">Certifications (Qualibat, RGE...)</label>
                      <textarea
                        rows={3}
                        placeholder="Listez vos certifications si applicable"
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#6B1E3E] transition-colors resize-none"
                      />
                    </div>
                    <div>
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          required
                          className="mt-1 w-5 h-5 text-[#6B1E3E] border-gray-300 rounded focus:ring-[#6B1E3E]"
                        />
                        <span className="text-sm text-[#8B7E74]">
                          Je confirme disposer d'une <strong>assurance décennale à jour</strong> couvrant l'installation de robinets et équipements sanitaires.
                        </span>
                      </label>
                    </div>
                    <div>
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          required
                          className="mt-1 w-5 h-5 text-[#6B1E3E] border-gray-300 rounded focus:ring-[#6B1E3E]"
                        />
                        <span className="text-sm text-[#8B7E74]">
                          Je confirme disposer d'une <strong>habilitation électrique</strong> pour le raccordement d'appareils 230V.
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <div className="pt-6 border-t border-gray-200">
                  <motion.button
                    type="submit"
                    className="w-full px-12 py-5 bg-[#6B1E3E] text-white rounded-full text-lg hover:bg-[#6B1E3E]/90 transition-colors"
                    whileHover={{ scale: 1.02, y: -3 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Envoyer ma candidature
                  </motion.button>
                  <p className="text-sm text-[#8B7E74] text-center mt-4">
                    Réponse sous 48h • Formation gratuite
                  </p>
                </div>
              </div>
            </motion.form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-br from-[#6B1E3E] to-[#6B1E3E]/90 text-white p-12 rounded-3xl text-center"
            >
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-8">
                <Check className="w-10 h-10" />
              </div>
              <h3 className="text-3xl mb-4">Candidature envoyée !</h3>
              <p className="text-xl text-white/90 mb-8">
                Nous étudions votre profil et vous recontactons sous 48h pour planifier la formation.
              </p>
              <p className="text-sm text-white/70">
                Vérifiez vos emails (et spams) dans les prochains jours.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Contact direct */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-[#FAF8F5] to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="mb-6 text-gray-900">Des questions avant de candidater ?</h2>
            <p className="text-xl text-[#8B7E74]">
              Contactez notre responsable réseau installateurs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 bg-white rounded-3xl border border-gray-200/50 text-center">
              <div className="w-12 h-12 bg-[#6B1E3E]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-[#6B1E3E]" />
              </div>
              <p className="text-sm text-[#8B7E74] mb-2">Téléphone</p>
              <p className="text-lg text-gray-900">01 XX XX XX XX</p>
            </div>

            <div className="p-8 bg-white rounded-3xl border border-gray-200/50 text-center">
              <div className="w-12 h-12 bg-[#6B1E3E]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-[#6B1E3E]" />
              </div>
              <p className="text-sm text-[#8B7E74] mb-2">Email</p>
              <p className="text-lg text-gray-900">pro@hydral.fr</p>
            </div>

            <div className="p-8 bg-white rounded-3xl border border-gray-200/50 text-center">
              <div className="w-12 h-12 bg-[#6B1E3E]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-[#6B1E3E]" />
              </div>
              <p className="text-sm text-[#8B7E74] mb-2">Formations</p>
              <p className="text-lg text-gray-900">Paris & Lyon</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}