import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Ruler, CheckCircle2, AlertCircle, Upload, Camera, ArrowRight, Info } from 'lucide-react';

interface SinkCompatibilityCheckerProps {
  className?: string;
}

type CheckMethod = 'dimensions' | 'photo' | null;

export function SinkCompatibilityChecker({ className = '' }: SinkCompatibilityCheckerProps) {
  const [checkMethod, setCheckMethod] = useState<CheckMethod>(null);
  const [dimensions, setDimensions] = useState({ width: '', depth: '', holes: '1' });
  const [result, setResult] = useState<'compatible' | 'warning' | 'incompatible' | null>(null);

  const checkCompatibility = () => {
    const width = parseInt(dimensions.width);
    const depth = parseInt(dimensions.depth);

    // Critères compatibilité
    if (width >= 40 && depth >= 50) {
      setResult('compatible');
    } else if (width >= 35 && depth >= 40) {
      setResult('warning');
    } else {
      setResult('incompatible');
    }
  };

  const resetChecker = () => {
    setCheckMethod(null);
    setDimensions({ width: '', depth: '', holes: '1' });
    setResult(null);
  };

  return (
    <section className={`section-padding bg-white ${className}`}>
      <div className="section-container max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 px-6 py-4 bg-purple-50 border-2 border-purple-200 rounded-2xl mb-8">
            <Ruler className="w-6 h-6 text-purple-600" />
            <span className="text-2xl text-purple-700 font-medium">"Mon évier est-il assez grand ?"</span>
          </div>

          <h2 className="mb-6 text-gray-900">
            Vérifiez la compatibilité
            <span className="block text-[#6B1E3E]">de votre évier en 2 minutes</span>
          </h2>
          <p className="text-xl text-gray-600">
            99% des éviers sont compatibles, mais vérifions le vôtre
          </p>
        </motion.div>

        {!checkMethod && !result && (
          /* Choix de la méthode */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.button
              onClick={() => setCheckMethod('dimensions')}
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-br from-white to-[#FAF8F5] border-2 border-gray-200 rounded-3xl p-10 hover:border-[#6B1E3E]/50 hover:shadow-xl transition-all text-left group"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#6B1E3E]/10 flex items-center justify-center mb-6">
                <Ruler className="w-8 h-8 text-[#6B1E3E]" />
              </div>
              <h3 className="text-2xl text-gray-900 mb-3 group-hover:text-[#6B1E3E] transition-colors">
                Entrer les dimensions
              </h3>
              <p className="text-gray-600 mb-6">
                Mesurez votre espace sous l'évier et obtenez une réponse instantanée
              </p>
              <div className="flex items-center gap-2 text-[#6B1E3E] font-medium">
                <span>Vérifier maintenant</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.button>

            <motion.button
              onClick={() => setCheckMethod('photo')}
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-br from-white to-[#FAF8F5] border-2 border-gray-200 rounded-3xl p-10 hover:border-[#6B1E3E]/50 hover:shadow-xl transition-all text-left group"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#6B1E3E]/10 flex items-center justify-center mb-6">
                <Camera className="w-8 h-8 text-[#6B1E3E]" />
              </div>
              <h3 className="text-2xl text-gray-900 mb-3 group-hover:text-[#6B1E3E] transition-colors">
                Envoyer une photo
              </h3>
              <p className="text-gray-600 mb-6">
                Notre équipe analysera votre cuisine et vous conseillera sous 24h
              </p>
              <div className="flex items-center gap-2 text-[#6B1E3E] font-medium">
                <span>Demander une analyse</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.button>
          </div>
        )}

        {checkMethod === 'dimensions' && !result && (
          /* Formulaire dimensions */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-white to-[#FAF8F5] border-2 border-gray-200 rounded-3xl p-8 md:p-10"
          >
            <h3 className="text-2xl text-gray-900 mb-8 text-center">
              Mesurez l'espace sous votre évier
            </h3>

            {/* Schéma instructif */}
            <div className="bg-white rounded-2xl border-2 border-[#6B1E3E]/20 p-6 mb-8">
              <div className="text-center mb-4">
                <div className="text-4xl sm:text-5xl mb-4">📏</div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">Comment mesurer ?</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#6B1E3E] text-white flex items-center justify-center flex-shrink-0 text-xs">1</div>
                  <div>
                    <div className="font-medium text-gray-900 mb-1">Largeur</div>
                    <div className="text-gray-600">Distance de gauche à droite</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#6B1E3E] text-white flex items-center justify-center flex-shrink-0 text-xs">2</div>
                  <div>
                    <div className="font-medium text-gray-900 mb-1">Profondeur</div>
                    <div className="text-gray-600">Distance avant vers arrière</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#6B1E3E] text-white flex items-center justify-center flex-shrink-0 text-xs">3</div>
                  <div>
                    <div className="font-medium text-gray-900 mb-1">Trous</div>
                    <div className="text-gray-600">Comptez les trous disponibles</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Largeur (cm)
                </label>
                <input
                  type="number"
                  value={dimensions.width}
                  onChange={(e) => setDimensions({ ...dimensions, width: e.target.value })}
                  placeholder="Ex: 50"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#6B1E3E] focus:outline-none text-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profondeur (cm)
                </label>
                <input
                  type="number"
                  value={dimensions.depth}
                  onChange={(e) => setDimensions({ ...dimensions, depth: e.target.value })}
                  placeholder="Ex: 60"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#6B1E3E] focus:outline-none text-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Trous disponibles
                </label>
                <select
                  value={dimensions.holes}
                  onChange={(e) => setDimensions({ ...dimensions, holes: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#6B1E3E] focus:outline-none text-lg"
                >
                  <option value="0">Aucun trou libre</option>
                  <option value="1">1 trou libre</option>
                  <option value="2">2 trous libres</option>
                  <option value="3+">3 trous ou plus</option>
                </select>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={checkCompatibility}
                disabled={!dimensions.width || !dimensions.depth}
                className="flex-1 px-8 py-4 bg-gradient-to-r from-[#6B1E3E] to-[#8B2E4E] text-white rounded-full font-medium hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Vérifier la compatibilité
                <ArrowRight className="inline w-5 h-5 ml-2" />
              </button>
              <button
                onClick={resetChecker}
                className="px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-full font-medium hover:border-gray-400 transition-all"
              >
                Recommencer
              </button>
            </div>
          </motion.div>
        )}

        {checkMethod === 'photo' && !result && (
          /* Upload photo */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-white to-[#FAF8F5] border-2 border-gray-200 rounded-3xl p-8 md:p-10"
          >
            <h3 className="text-2xl text-gray-900 mb-8 text-center">
              Envoyez-nous des photos de votre évier
            </h3>

            {/* Zone upload */}
            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center mb-8 hover:border-[#6B1E3E] transition-colors cursor-pointer">
              <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <div className="text-lg text-gray-700 mb-2">
                Cliquez pour sélectionner des photos
              </div>
              <div className="text-sm text-gray-500">
                ou glissez-déposez vos fichiers ici
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 mb-8">
              <div className="flex items-start gap-3">
                <Info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900 mb-2">Pour une analyse optimale :</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Photo de l'évier vu de face</li>
                    <li>• Photo de l'espace sous l'évier (placard ouvert)</li>
                    <li>• Photo du robinet actuel (optionnel)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Form email */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Votre email (pour recevoir l'analyse)
              </label>
              <input
                type="email"
                placeholder="votre@email.com"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#6B1E3E] focus:outline-none"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex-1 px-8 py-4 bg-gradient-to-r from-[#6B1E3E] to-[#8B2E4E] text-white rounded-full font-medium hover:shadow-xl transition-all">
                Envoyer pour analyse gratuite
                <ArrowRight className="inline w-5 h-5 ml-2" />
              </button>
              <button
                onClick={resetChecker}
                className="px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-full font-medium hover:border-gray-400 transition-all"
              >
                Retour
              </button>
            </div>

            <p className="text-sm text-gray-500 text-center mt-6">
              Réponse sous 24h par notre équipe technique
            </p>
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {result && (
            /* Résultats */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`border-2 rounded-3xl p-8 md:p-10 ${
                result === 'compatible'
                  ? 'bg-green-50 border-green-200'
                  : result === 'warning'
                  ? 'bg-orange-50 border-orange-200'
                  : 'bg-red-50 border-red-200'
              }`}
            >
              <div className="text-center mb-8">
                {result === 'compatible' && (
                  <>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                      className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500 flex items-center justify-center"
                    >
                      <CheckCircle2 className="w-10 h-10 text-white" />
                    </motion.div>
                    <h3 className="text-3xl text-gray-900 mb-4">
                      ✅ Parfait ! Votre évier est compatible
                    </h3>
                    <p className="text-lg text-gray-700">
                      HYDRAL peut être installé sans problème dans votre cuisine
                    </p>
                  </>
                )}

                {result === 'warning' && (
                  <>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                      className="w-20 h-20 mx-auto mb-6 rounded-full bg-orange-500 flex items-center justify-center"
                    >
                      <AlertCircle className="w-10 h-10 text-white" />
                    </motion.div>
                    <h3 className="text-3xl text-gray-900 mb-4">
                      ⚠️ Installation possible avec adaptation
                    </h3>
                    <p className="text-lg text-gray-700">
                      Votre espace est un peu juste, mais notre équipe peut adapter l'installation
                    </p>
                  </>
                )}

                {result === 'incompatible' && (
                  <>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                      className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-500 flex items-center justify-center"
                    >
                      <AlertCircle className="w-10 h-10 text-white" />
                    </motion.div>
                    <h3 className="text-3xl text-gray-900 mb-4">
                      Espace insuffisant selon vos mesures
                    </h3>
                    <p className="text-lg text-gray-700">
                      Mais ne vous inquiétez pas, nous avons des solutions !
                    </p>
                  </>
                )}
              </div>

              {/* Prochaines étapes */}
              <div className="bg-white rounded-2xl p-6 mb-8">
                <h4 className="font-medium text-gray-900 mb-4">Prochaines étapes :</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#6B1E3E] text-white flex items-center justify-center flex-shrink-0 text-xs">1</div>
                    <span className="text-gray-700">
                      {result === 'compatible'
                        ? 'Réservez votre installation gratuite'
                        : 'Contactez notre équipe pour une étude personnalisée'}
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#6B1E3E] text-white flex items-center justify-center flex-shrink-0 text-xs">2</div>
                    <span className="text-gray-700">Notre technicien vérifie lors du rendez-vous</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#6B1E3E] text-white flex items-center justify-center flex-shrink-0 text-xs">3</div>
                    <span className="text-gray-700">
                      {result === 'incompatible'
                        ? 'Solutions alternatives proposées (installation murale, modules compacts)'
                        : 'Installation en 2-3h maximum'}
                    </span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 px-8 py-4 bg-gradient-to-r from-[#6B1E3E] to-[#8B2E4E] text-white rounded-full font-medium hover:shadow-xl transition-all">
                  {result === 'compatible' ? 'Réserver mon installation' : 'Demander une étude gratuite'}
                  <ArrowRight className="inline w-5 h-5 ml-2" />
                </button>
                <button
                  onClick={resetChecker}
                  className="px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-full font-medium hover:border-gray-400 transition-all"
                >
                  Refaire le test
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
