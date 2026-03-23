import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, ArrowRight, Sparkles, Clock } from 'lucide-react';
import { Page } from '../../App';

interface BehavioralTriggersProps {
  currentPage: Page;
  navigate: (page: Page) => void;
}

export function BehavioralTriggers({ currentPage, navigate }: BehavioralTriggersProps) {
  const [showHelpPopup, setShowHelpPopup] = useState(false);
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [showWelcomeBack, setShowWelcomeBack] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);

  // Track time spent
  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      setTimeSpent(elapsed);
    }, 1000);

    return () => clearInterval(interval);
  }, [currentPage]);

  // Show help popup after 2 minutes
  useEffect(() => {
    if (timeSpent >= 120 && !showHelpPopup && currentPage !== 'configurator') {
      const hasSeenHelp = sessionStorage.getItem('hydrao-help-popup-seen');
      if (!hasSeenHelp) {
        setShowHelpPopup(true);
        sessionStorage.setItem('hydrao-help-popup-seen', 'true');
      }
    }
  }, [timeSpent, currentPage]);

  // Exit intent detection (scroll 80% + mouse leave)
  useEffect(() => {
    let hasScrolled80 = false;

    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      if (scrollPercent > 80) {
        hasScrolled80 = true;
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && hasScrolled80 && !showExitIntent) {
        const hasSeenExit = sessionStorage.getItem('hydrao-exit-intent-seen');
        if (!hasSeenExit) {
          setShowExitIntent(true);
          sessionStorage.setItem('hydrao-exit-intent-seen', 'true');
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Welcome back returning visitor
  useEffect(() => {
    const visitCount = parseInt(localStorage.getItem('hydrao-visit-count') || '0');
    const newVisitCount = visitCount + 1;
    localStorage.setItem('hydrao-visit-count', newVisitCount.toString());

    if (visitCount > 0 && visitCount < 5) {
      const hasSeenWelcome = sessionStorage.getItem('hydrao-welcome-back-seen');
      if (!hasSeenWelcome) {
        setTimeout(() => {
          setShowWelcomeBack(true);
          sessionStorage.setItem('hydrao-welcome-back-seen', 'true');
        }, 2000);
      }
    }
  }, []);

  return (
    <>
      {/* Help Popup - After 2 minutes */}
      <AnimatePresence>
        {showHelpPopup && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: 50 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 50, x: 50 }}
            className="fixed bottom-24 right-6 z-[90] max-w-sm"
          >
            <div className="bg-white rounded-2xl shadow-2xl border-2 border-[#6B1E3E] p-6">
              <button
                onClick={() => setShowHelpPopup(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-[#6B1E3E] flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Besoin d'aide ?
                  </h3>
                  <p className="text-sm text-gray-600">
                    Vous explorez notre site depuis quelques minutes. Puis-je vous aider à trouver ce que vous cherchez ?
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => {
                    navigate('faq');
                    setShowHelpPopup(false);
                  }}
                  className="w-full px-4 py-3 bg-[#6B1E3E] text-white rounded-xl hover:bg-[#8B2E4E] transition-colors font-medium text-sm flex items-center justify-between"
                >
                  <span>Voir la FAQ</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    navigate('support');
                    setShowHelpPopup(false);
                  }}
                  className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium text-sm"
                >
                  Contacter un expert
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Exit Intent - Scroll 80% + Mouse leave */}
      <AnimatePresence>
        {showExitIntent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl max-w-lg w-full"
            >
              <div className="p-8 text-center">
                <button
                  onClick={() => setShowExitIntent(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#6B1E3E] to-[#8B2E4E] flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>

                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  Avant de partir...
                </h2>
                <p className="text-gray-600 mb-6">
                  Découvrez combien vous pourriez économiser avec HYDRAO en seulement 2 minutes
                </p>

                <div className="bg-gradient-to-br from-[#6B1E3E]/10 to-[#8B2E4E]/10 rounded-2xl p-6 mb-6">
                  <div className="flex items-center justify-center gap-8 text-center">
                    <div>
                      <div className="text-3xl font-bold text-[#6B1E3E]">600€+</div>
                      <div className="text-sm text-gray-600">économisés/an</div>
                    </div>
                    <div className="h-12 w-px bg-gray-300" />
                    <div>
                      <div className="text-3xl font-bold text-[#6B1E3E]">2000</div>
                      <div className="text-sm text-gray-600">bouteilles évitées</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => {
                      navigate('savings');
                      setShowExitIntent(false);
                    }}
                    className="w-full px-6 py-4 bg-gradient-to-r from-[#6B1E3E] to-[#8B2E4E] text-white rounded-xl hover:shadow-lg transition-all font-semibold flex items-center justify-center gap-2"
                  >
                    <span>Calculer mes économies</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setShowExitIntent(false)}
                    className="w-full px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors text-sm"
                  >
                    Non merci, je continue
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Welcome Back - Returning visitor */}
      <AnimatePresence>
        {showWelcomeBack && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[90] max-w-md"
          >
            <div className="bg-gradient-to-br from-[#6B1E3E] to-[#8B2E4E] text-white rounded-2xl shadow-2xl p-6">
              <button
                onClick={() => setShowWelcomeBack(false)}
                className="absolute top-3 right-3 text-white/70 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">
                    Content de vous revoir ! 👋
                  </h3>
                  <p className="text-sm text-white/90">
                    Prêt à franchir le pas vers une cuisine plus intelligente ?
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  navigate('configurator');
                  setShowWelcomeBack(false);
                }}
                className="w-full mt-4 px-4 py-3 bg-white text-[#6B1E3E] rounded-xl hover:shadow-lg transition-all font-semibold flex items-center justify-center gap-2"
              >
                <span>Choisir mon HYDRAO</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Hook pour tracker le comportement utilisateur
export function useBehaviorTracking(currentPage: Page) {
  useEffect(() => {
    const startTime = Date.now();
    let scrollDepth = 0;

    const handleScroll = () => {
      const percent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      scrollDepth = Math.max(scrollDepth, percent);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);
      window.removeEventListener('scroll', handleScroll);

      // Log analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'page_engagement', {
          page: currentPage,
          time_spent: timeSpent,
          scroll_depth: Math.round(scrollDepth)
        });
      }

      console.log(`[Behavior] Page: ${currentPage}, Time: ${timeSpent}s, Scroll: ${Math.round(scrollDepth)}%`);
    };
  }, [currentPage]);
}