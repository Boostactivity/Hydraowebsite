import React, { useState } from 'react';
import { Check, X, Info, Ruler, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface UnderSinkCheckerProps {
  onClose?: () => void;
}

export function UnderSinkChecker({ onClose }: UnderSinkCheckerProps) {
  const [width, setWidth] = useState(60);
  const [height, setHeight] = useState(60);
  const [depth, setDepth] = useState(50);
  const [showResults, setShowResults] = useState(false);

  // Dimensions modules HYDRAL
  const modules = {
    combi3L: { width: 30, height: 42, depth: 38, name: 'COMBI 3L (bouillante + froide)' },
    combi7L: { width: 35, height: 51, depth: 38, name: 'COMBI 7L (bouillante + froide)' },
    cube: { width: 17, height: 41, depth: 45, name: 'CUBE (eau pétillante)' }
  };

  // Espace minimum recommandé (margins pour installation)
  const minClearance = 5; // 5cm de chaque côté

  const checkFit = () => {
    setShowResults(true);
  };

  const canFitCombi3L = 
    width >= modules.combi3L.width + minClearance * 2 &&
    height >= modules.combi3L.height + minClearance &&
    depth >= modules.combi3L.depth + minClearance;

  const canFitCombi7L = 
    width >= modules.combi7L.width + minClearance * 2 &&
    height >= modules.combi7L.height + minClearance &&
    depth >= modules.combi7L.depth + minClearance;

  const canFitCube = 
    width >= modules.cube.width + minClearance * 2 &&
    height >= modules.cube.height + minClearance &&
    depth >= modules.cube.depth + minClearance;

  const canFitCompletePack = canFitCombi7L && canFitCube && 
    width >= modules.combi7L.width + modules.cube.width + minClearance * 3;

  return (
    <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-xl max-w-4xl mx-auto">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h3 className="text-2xl text-gray-900 mb-2">Vérification de compatibilité</h3>
          <p className="text-[#8B7E74]">
            Mesurez l'espace disponible sous votre évier pour vérifier la compatibilité.
          </p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left: Inputs */}
        <div className="space-y-8">
          <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-gray-200/50">
            <div className="flex items-center gap-2 mb-6">
              <Ruler className="w-5 h-5 text-[#6B1E3E]" />
              <h4 className="text-lg text-gray-900">Dimensions de votre espace</h4>
            </div>

            {/* Width */}
            <div className="mb-6">
              <label className="flex items-center justify-between mb-3">
                <span className="text-gray-700">Largeur (cm)</span>
                <span className="text-2xl text-[#6B1E3E]">{width}</span>
              </label>
              <input
                type="range"
                min="30"
                max="120"
                value={width}
                onChange={(e) => setWidth(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-[#6B1E3E]"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>30cm</span>
                <span>120cm</span>
              </div>
            </div>

            {/* Height */}
            <div className="mb-6">
              <label className="flex items-center justify-between mb-3">
                <span className="text-gray-700">Hauteur (cm)</span>
                <span className="text-2xl text-[#6B1E3E]">{height}</span>
              </label>
              <input
                type="range"
                min="30"
                max="100"
                value={height}
                onChange={(e) => setHeight(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-[#6B1E3E]"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>30cm</span>
                <span>100cm</span>
              </div>
            </div>

            {/* Depth */}
            <div className="mb-6">
              <label className="flex items-center justify-between mb-3">
                <span className="text-gray-700">Profondeur (cm)</span>
                <span className="text-2xl text-[#6B1E3E]">{depth}</span>
              </label>
              <input
                type="range"
                min="30"
                max="80"
                value={depth}
                onChange={(e) => setDepth(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-[#6B1E3E]"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>30cm</span>
                <span>80cm</span>
              </div>
            </div>

            <motion.button
              onClick={checkFit}
              className="w-full py-4 bg-gradient-to-r from-[#6B1E3E] to-[#6B1E3E]/90 text-white rounded-full shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Vérifier la compatibilité
            </motion.button>
          </div>

          {/* Info box */}
          <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-200">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-900">
              <strong>Comment mesurer ?</strong>
              <br />
              Mesurez l'espace libre sous votre évier (après avoir enlevé poubelle, produits, etc.). Incluez un espace de 5cm minimum autour des modules pour l'aération et les branchements.
            </div>
          </div>
        </div>

        {/* Right: Results */}
        <div>
          <AnimatePresence mode="wait">
            {!showResults ? (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex items-center justify-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300"
              >
                <div className="text-center p-8">
                  <Ruler className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">
                    Entrez vos dimensions et cliquez sur "Vérifier"
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                <h4 className="text-lg text-gray-900 mb-4">Compatibilité de vos modules</h4>

                {/* COMBI 3L */}
                <div className={`p-4 rounded-2xl border-2 ${
                  canFitCombi3L 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-red-50 border-red-200'
                }`}>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        {canFitCombi3L ? (
                          <Check className="w-5 h-5 text-green-600" />
                        ) : (
                          <X className="w-5 h-5 text-red-600" />
                        )}
                        <span className="text-gray-900">{modules.combi3L.name}</span>
                      </div>
                      <div className="text-xs text-gray-600">
                        {modules.combi3L.width} × {modules.combi3L.height} × {modules.combi3L.depth} cm
                      </div>
                    </div>
                  </div>
                  {canFitCombi3L ? (
                    <p className="text-sm text-green-700">✓ Compatible avec votre espace</p>
                  ) : (
                    <p className="text-sm text-red-700">✗ Espace insuffisant</p>
                  )}
                </div>

                {/* COMBI 7L */}
                <div className={`p-4 rounded-2xl border-2 ${
                  canFitCombi7L 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-red-50 border-red-200'
                }`}>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        {canFitCombi7L ? (
                          <Check className="w-5 h-5 text-green-600" />
                        ) : (
                          <X className="w-5 h-5 text-red-600" />
                        )}
                        <span className="text-gray-900">{modules.combi7L.name}</span>
                      </div>
                      <div className="text-xs text-gray-600">
                        {modules.combi7L.width} × {modules.combi7L.height} × {modules.combi7L.depth} cm
                      </div>
                    </div>
                  </div>
                  {canFitCombi7L ? (
                    <p className="text-sm text-green-700">✓ Compatible avec votre espace</p>
                  ) : (
                    <p className="text-sm text-red-700">✗ Espace insuffisant</p>
                  )}
                </div>

                {/* CUBE */}
                <div className={`p-4 rounded-2xl border-2 ${
                  canFitCube 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-red-50 border-red-200'
                }`}>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        {canFitCube ? (
                          <Check className="w-5 h-5 text-green-600" />
                        ) : (
                          <X className="w-5 h-5 text-red-600" />
                        )}
                        <span className="text-gray-900">{modules.cube.name}</span>
                      </div>
                      <div className="text-xs text-gray-600">
                        {modules.cube.width} × {modules.cube.height} × {modules.cube.depth} cm
                      </div>
                    </div>
                  </div>
                  {canFitCube ? (
                    <p className="text-sm text-green-700">✓ Compatible avec votre espace</p>
                  ) : (
                    <p className="text-sm text-red-700">✗ Espace insuffisant</p>
                  )}
                </div>

                {/* Pack Complet */}
                <div className={`p-5 rounded-2xl border-2 ${
                  canFitCompletePack 
                    ? 'bg-gradient-to-br from-[#6B1E3E]/5 to-[#6B1E3E]/10 border-[#6B1E3E]' 
                    : 'bg-gray-50 border-gray-300'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    {canFitCompletePack ? (
                      <Check className="w-5 h-5 text-[#6B1E3E]" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-gray-500" />
                    )}
                    <span className="text-gray-900">Pack Complet (COMBI 7L + CUBE)</span>
                  </div>
                  {canFitCompletePack ? (
                    <p className="text-sm text-[#6B1E3E]">
                      ✓ Vous pouvez installer le pack complet avec eau pétillante !
                    </p>
                  ) : (
                    <p className="text-sm text-gray-600">
                      Espace insuffisant pour les 2 modules côte à côte. Optez pour COMBI seul ou installez CUBE ailleurs.
                    </p>
                  )}
                </div>

                {/* Recommendation */}
                <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <h5 className="text-gray-900 mb-2">Notre recommandation</h5>
                  <p className="text-sm text-gray-700">
                    {canFitCompletePack ? (
                      "Votre espace est idéal pour le Pack Complet. Vous aurez toutes les fonctionnalités HYDRAL."
                    ) : canFitCombi7L ? (
                      "Installez le COMBI 7L sous l'évier. Le CUBE peut être installé sur le côté ou dans un autre meuble."
                    ) : canFitCombi3L ? (
                      "Optez pour le COMBI 3L (compact). Parfait pour un usage quotidien 1-2 personnes."
                    ) : (
                      "Contactez notre service pour une étude personnalisée. Solutions alternatives possibles."
                    )}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
