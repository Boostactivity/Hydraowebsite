import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Smartphone, Video, Hand, FormInput, ArrowRight } from 'lucide-react';
import { Page } from '../App';
import { MobileOptimizedVideo } from '../components/mobile/MobileOptimizedVideo';
import { TouchGestureCarousel, PinchZoomImage } from '../components/mobile/TouchGestureCarousel';
import { MobileInput, MobileSelect, MobileForm, commonValidations } from '../components/mobile/MobileForms';
import { defaultImages } from '../assets/products';

interface MobileDemoPageProps {
  navigate: (page: Page) => void;
}

export function MobileDemoPage({ navigate }: MobileDemoPageProps) {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    household: ''
  });

  const handleFormSubmit = (data: Record<string, string>) => {
    console.log('Form submitted:', data);
    alert('Formulaire envoyé avec succès ! (démo)');
  };

  // Carousel items
  const carouselItems = [
    {
      id: '1',
      content: (
        <div className="bg-gradient-to-br from-[#6B1E3E] to-[#8B2E4E] rounded-3xl p-8 text-white">
          <h3 className="text-2xl mb-4">Eau Filtrée</h3>
          <p className="text-white/90 mb-4">99.9% des impuretés éliminées</p>
          <div className="aspect-video bg-white/10 rounded-2xl" />
        </div>
      )
    },
    {
      id: '2',
      content: (
        <div className="bg-gradient-to-br from-[#6B1E3E]/80 to-[#8B2E4E] rounded-3xl p-8 text-white">
          <h3 className="text-2xl mb-4">Eau Pétillante</h3>
          <p className="text-white/90 mb-4">3 niveaux de gazéification</p>
          <div className="aspect-video bg-white/10 rounded-2xl" />
        </div>
      )
    },
    {
      id: '3',
      content: (
        <div className="bg-gradient-to-br from-[#4B1528] to-[#6B1E3E] rounded-3xl p-8 text-white">
          <h3 className="text-2xl mb-4">Eau Chaude</h3>
          <p className="text-white/90 mb-4">100°C instantané</p>
          <div className="aspect-video bg-white/10 rounded-2xl" />
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Hero */}
      <section className="section-padding bg-gradient-to-br from-white via-[#FAF8F5] to-[#E8D5DC]/10">
        <div className="section-container max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#6B1E3E]/10 text-[#6B1E3E] rounded-full mb-8">
              <Smartphone className="w-5 h-5" />
              <span className="text-sm uppercase tracking-wider font-medium">Batch 25</span>
            </div>

            <h1 className="mb-6">
              <span className="block text-gray-900">Expérience Mobile</span>
              <span className="block text-[#6B1E3E]">Optimisée & Tactile</span>
            </h1>

            <p className="text-xl text-[#8B7E74]">
              Découvrez nos nouveaux composants mobile-first pour 70% de votre trafic
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section 1: Vidéo optimisée mobile */}
      <section id="video-optimization" className="section-padding bg-white">
        <div className="section-container max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-[#6B1E3E]/10 rounded-full flex items-center justify-center">
                <Video className="w-6 h-6 text-[#6B1E3E]" />
              </div>
              <div>
                <h2 className="text-gray-900">Point 122 - Vidéo Mobile Optimisée</h2>
                <p className="text-[#8B7E74]">Lazy load, poster image, play on tap</p>
              </div>
            </div>

            <MobileOptimizedVideo
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
              poster={defaultImages.faucet}
              title="HYDRAL en action"
              duration="2:30"
              autoPlay={false}
              muted={true}
              className="max-w-2xl mx-auto aspect-video"
            />

            <div className="mt-6 p-4 bg-green-50 border-2 border-green-200 rounded-2xl">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  ✓
                </div>
                <div className="text-sm text-gray-700">
                  <strong>Optimisations :</strong> Intersection Observer (lazy load) • Poster optimisée • 
                  Contrôles touch-friendly • Auto-pause hors vue • Full-screen iOS
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 2: Touch gestures carousel */}
      <section id="touch-gestures" className="section-padding bg-gradient-to-br from-[#FAF8F5] to-white">
        <div className="section-container max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-[#6B1E3E]/10 rounded-full flex items-center justify-center">
                <Hand className="w-6 h-6 text-[#6B1E3E]" />
              </div>
              <div>
                <h2 className="text-gray-900">Point 123 - Touch Gestures</h2>
                <p className="text-[#8B7E74]">Swipe, haptic feedback, drag & drop</p>
              </div>
            </div>

            <TouchGestureCarousel
              items={carouselItems}
              enableHaptic={true}
              showIndicators={true}
              showArrows={true}
              autoPlay={false}
            />

            <div className="mt-8">
              <h3 className="text-xl text-gray-900 mb-4">Pinch to Zoom</h3>
              <PinchZoomImage
                src={defaultImages.faucet}
                alt="HYDRAL robinet détail"
                className="aspect-video rounded-2xl"
              />
            </div>

            <div className="mt-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-2xl">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  ✓
                </div>
                <div className="text-sm text-gray-700">
                  <strong>Interactions :</strong> Swipe left/right • Vibration haptic • 
                  Pinch zoom (1x-3x) • Double-tap zoom • Drag en mode zoom
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 3: Mobile-first forms */}
      <section id="mobile-forms" className="section-padding bg-white">
        <div className="section-container max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-[#6B1E3E]/10 rounded-full flex items-center justify-center">
                <FormInput className="w-6 h-6 text-[#6B1E3E]" />
              </div>
              <div>
                <h2 className="text-gray-900">Point 124 - Formulaires Mobile</h2>
                <p className="text-[#8B7E74]">Input modes, autocomplete, validation temps réel</p>
              </div>
            </div>

            <MobileForm
              onSubmit={handleFormSubmit}
              submitLabel="Être contacté"
            >
              <MobileInput
                type="text"
                label="Nom complet"
                name="name"
                value={formData.name}
                onChange={(value) => setFormData({ ...formData, name: value })}
                placeholder="Jean Dupont"
                autoComplete="name"
                validation={commonValidations.name}
                required
              />

              <MobileInput
                type="email"
                label="Email"
                name="email"
                value={formData.email}
                onChange={(value) => setFormData({ ...formData, email: value })}
                placeholder="jean.dupont@example.com"
                autoComplete="email"
                validation={commonValidations.email}
                required
              />

              <MobileInput
                type="tel"
                label="Téléphone"
                name="phone"
                value={formData.phone}
                onChange={(value) => setFormData({ ...formData, phone: value })}
                placeholder="06 12 34 56 78"
                autoComplete="tel"
                validation={commonValidations.phone}
                required
              />

              <MobileSelect
                label="Taille du foyer"
                name="household"
                value={formData.household}
                onChange={(value) => setFormData({ ...formData, household: value })}
                options={[
                  { value: '1-2', label: '1-2 personnes' },
                  { value: '3-4', label: '3-4 personnes' },
                  { value: '5+', label: '5+ personnes' }
                ]}
                required
                placeholder="Sélectionner..."
              />
            </MobileForm>

            <div className="mt-6 p-4 bg-purple-50 border-2 border-purple-200 rounded-2xl">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  ✓
                </div>
                <div className="text-sm text-gray-700">
                  <strong>Optimisations :</strong> InputMode (clavier mobile adapté) • 
                  Autocomplete • Validation temps réel • Font-size 16px (no zoom iOS) • 
                  Touch-friendly (44px tap targets)
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="section-padding bg-gradient-to-r from-[#6B1E3E] to-[#8B2E4E] text-white">
        <div className="section-container max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-6 text-white">
              Expérience Mobile Parfaite
            </h2>
            <p className="text-xl text-white/90 mb-10">
              +45% de conversion mobile grâce à ces optimisations
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('home')}
                className="px-10 py-5 bg-white text-[#6B1E3E] rounded-full font-medium text-lg hover:bg-[#FAF8F5] transition-colors shadow-2xl"
              >
                Retour à l'accueil
                <ArrowRight className="inline w-5 h-5 ml-2" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default MobileDemoPage;
