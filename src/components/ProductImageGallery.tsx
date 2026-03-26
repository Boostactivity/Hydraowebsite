import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import mattBlackImage from 'figma:asset/cb012487c8e9251d2e8d275f7b2078135d0b6e71.png';
import mattBlackImage2 from 'figma:asset/3f01b53a06901483d974931b853c2c7fcd2cd90e.png';
import mattBlackImage3 from 'figma:asset/34f15b516878f9444e820ffe79c92b6f460bbcff.png';
import chromeBrillantImage from 'figma:asset/5454ff11ee6825dc019bd65b717efd2549be9282.png';
import chromeBrillantImage2 from 'figma:asset/2269ffd704c3a702579045450db0c1da17df5597.png';
import chromeBrillantImage3 from 'figma:asset/d1f0deca8673def675075340fc21797fc65d573a.png';
import nickelBrosseImage from 'figma:asset/ae387035b13c403bc67e44f640c3fa2e5cc3ed31.png';
import nickelBrosseImage2 from 'figma:asset/b73251087b4eede05583a68f2ba45f1911f0343b.png';
import nickelBrosseImage3 from 'figma:asset/e594697f0a193d86366d6eddad81cf3e1bc91f3d.png';
import orBrosseImage from 'figma:asset/3b0291b7436075a29671cd3199ee81ebbb1c349d.png';
import orBrosseImage2 from 'figma:asset/7723295fa5109e5c3b2fba0889f4a607c5ff4c10.png';
import orBrosseImage3 from 'figma:asset/f48ee0a1110bc62466a0f7fe521ac29a4170a918.png';
import grisMetalliseImage from 'figma:asset/69b2ac2ddbebb7df61da03657da18182f9468a9e.png';
import grisMetalliseImage2 from 'figma:asset/1174ff5140dfe6ba9618eb25f3e0c8d4f9c0159a.png';
import grisMetalliseImage3 from 'figma:asset/cb30198bda25705dfe0eebda1678b044f2e15012.png';

interface ProductImage {
  id: string;
  alt: string;
  url: string;
}

interface ProductImageGalleryProps {
  productName: string;
  colorName: string;
  modelSKU: string;
  colorId: string;
}

// Mapping des images par modèle et coloris
const FAUCET_IMAGES: Record<string, Record<string, ProductImage[]>> = {
  'pure': {
    'noir-mat': [
      { 
        id: 'front-noir', 
        alt: 'Robinet HYDRAL Pure finition noir mat — robinet 5-en-1 eau bouillante gazeuse filtrée vue de face', 
        url: mattBlackImage 
      },
      { 
        id: 'detail-noir', 
        alt: 'Robinet HYDRAL Pure finition noir mat — eau bouillante instantanée robinet cuisine', 
        url: mattBlackImage2
      },
      { 
        id: 'context-noir', 
        alt: 'Robinet HYDRAL Pure noir mat en contexte cuisine — robinet multifonction design', 
        url: mattBlackImage3 
      }
    ],
    'chrome-brillant': [
      { 
        id: 'front-chrome', 
        alt: 'Robinet HYDRAL Pure finition chrome brillant — robinet 5-en-1 eau bouillante gazeuse filtrée', 
        url: chromeBrillantImage 
      },
      { 
        id: 'detail-chrome', 
        alt: 'Robinet HYDRAL Pure chrome brillant — détail finition robinet multifonction cuisine', 
        url: chromeBrillantImage2 
      },
      { 
        id: 'context-chrome', 
        alt: 'Robinet HYDRAL Pure chrome brillant en contexte cuisine — robinet eau bouillante instantanée', 
        url: chromeBrillantImage3 
      }
    ],
    'nickel-brosse': [
      { 
        id: 'front-nickel', 
        alt: 'Robinet HYDRAL Pure finition nickel brossé — robinet 5-en-1 eau filtrée gazeuse bouillante', 
        url: nickelBrosseImage 
      },
      { 
        id: 'detail-nickel', 
        alt: 'Robinet HYDRAL Pure nickel brossé — détail finition robinet multifonction', 
        url: nickelBrosseImage2 
      },
      { 
        id: 'context-nickel', 
        alt: 'Robinet HYDRAL Pure nickel brossé en contexte cuisine — robinet eau gazeuse filtrée', 
        url: nickelBrosseImage3 
      }
    ],
    'or-brosse': [
      { 
        id: 'front-or', 
        alt: 'Robinet HYDRAL Pure finition or brossé — eau gazeuse citron robinet 5-en-1', 
        url: orBrosseImage 
      },
      { 
        id: 'detail-or', 
        alt: 'Robinet HYDRAL Pure or brossé — eau bouillante instantanée thé en 3 secondes', 
        url: orBrosseImage2 
      },
      { 
        id: 'context-or', 
        alt: 'Robinet HYDRAL Pure or brossé en contexte cuisine — robinet multifonction design premium', 
        url: orBrosseImage3 
      }
    ],
    'gris-metallise': [
      { 
        id: 'front-gris', 
        alt: 'Robinet HYDRAL Pure finition gris métallisé — eau gazeuse filtrée robinet cuisine', 
        url: grisMetalliseImage 
      },
      { 
        id: 'detail-gris', 
        alt: 'Robinet HYDRAL Pure gris métallisé — eau bouillante instantanée robinet 5-en-1', 
        url: grisMetalliseImage2 
      },
      { 
        id: 'context-gris', 
        alt: 'Robinet HYDRAL Pure gris métallisé en contexte cuisine — robinet eau filtrée design', 
        url: grisMetalliseImage3 
      }
    ]
  },
  'spark': {
    'noir-mat': [
      { id: 'front-noir', alt: 'Robinet HYDRAL Spark finition noir mat — robinet 5-en-1 eau gazeuse filtrée bouillante', url: mattBlackImage },
      { id: 'detail-noir', alt: 'Robinet HYDRAL Spark noir mat — eau bouillante instantanée robinet multifonction', url: mattBlackImage2 },
      { id: 'context-noir', alt: 'Robinet HYDRAL Spark noir mat en contexte cuisine — robinet eau gazeuse design', url: mattBlackImage3 }
    ],
    'chrome-brillant': [
      { id: 'front-chrome', alt: 'Robinet HYDRAL Spark chrome brillant — eau gazeuse citron robinet 5-en-1', url: chromeBrillantImage },
      { id: 'detail-chrome', alt: 'Robinet HYDRAL Spark chrome brillant — eau bouillante instantanée thé robinet cuisine', url: chromeBrillantImage2 },
      { id: 'context-chrome', alt: 'Robinet HYDRAL Spark chrome brillant en contexte cuisine — robinet multifonction premium', url: chromeBrillantImage3 }
    ],
    'nickel-brosse': [
      { id: 'front-nickel', alt: 'Robinet HYDRAL Spark nickel brossé — eau gazeuse filtrée robinet cuisine', url: nickelBrosseImage },
      { id: 'detail-nickel', alt: 'Robinet HYDRAL Spark nickel brossé — eau bouillante instantanée robinet 5-en-1', url: nickelBrosseImage2 },
      { id: 'context-nickel', alt: 'Robinet HYDRAL Spark nickel brossé en contexte cuisine — robinet eau gazeuse design', url: nickelBrosseImage3 }
    ],
    'or-brosse': [
      { id: 'front-or', alt: 'Robinet HYDRAL Spark or brossé — eau gazeuse citron robinet multifonction', url: orBrosseImage },
      { id: 'detail-or', alt: 'Robinet HYDRAL Spark or brossé — eau bouillante thé robinet cuisine premium', url: orBrosseImage2 },
      { id: 'context-or', alt: 'Robinet HYDRAL Spark or brossé en contexte cuisine — robinet 5-en-1 design', url: orBrosseImage3 }
    ],
    'gris-metallise': [
      { id: 'front-gris', alt: 'Robinet HYDRAL Spark gris métallisé — eau gazeuse filtrée robinet 5-en-1', url: grisMetalliseImage },
      { id: 'detail-gris', alt: 'Robinet HYDRAL Spark gris métallisé — eau bouillante instantanée robinet cuisine', url: grisMetalliseImage2 },
      { id: 'context-gris', alt: 'Robinet HYDRAL Spark gris métallisé en contexte cuisine — robinet multifonction', url: grisMetalliseImage3 }
    ]
  },
  'one': {
    'noir-mat': [
      { id: 'front-noir', alt: 'Robinet HYDRAL One finition noir mat — robinet 5-en-1 tout-en-un eau bouillante gazeuse filtrée', url: mattBlackImage },
      { id: 'detail-noir', alt: 'Robinet HYDRAL One noir mat — eau bouillante instantanée robinet multifonction cuisine', url: mattBlackImage2 },
      { id: 'context-noir', alt: 'Robinet HYDRAL One noir mat en contexte cuisine — robinet tout-en-un design', url: mattBlackImage3 }
    ],
    'chrome-brillant': [
      { id: 'front-chrome', alt: 'Robinet HYDRAL One chrome brillant — eau gazeuse citron robinet 5-en-1 cuisine', url: chromeBrillantImage },
      { id: 'detail-chrome', alt: 'Robinet HYDRAL One chrome brillant — eau bouillante thé en 3 secondes robinet cuisine', url: chromeBrillantImage2 },
      { id: 'context-chrome', alt: 'Robinet HYDRAL One chrome brillant en contexte cuisine — robinet tout-en-un premium', url: chromeBrillantImage3 }
    ],
    'nickel-brosse': [
      { id: 'front-nickel', alt: 'Robinet HYDRAL One nickel brossé — eau gazeuse filtrée robinet multifonction', url: nickelBrosseImage },
      { id: 'detail-nickel', alt: 'Robinet HYDRAL One nickel brossé — eau bouillante instantanée robinet 5-en-1', url: nickelBrosseImage2 },
      { id: 'context-nickel', alt: 'Robinet HYDRAL One nickel brossé en contexte cuisine — robinet eau gazeuse filtrée design', url: nickelBrosseImage3 }
    ],
    'or-brosse': [
      { id: 'front-or', alt: 'Robinet HYDRAL One or brossé — eau gazeuse citron robinet tout-en-un cuisine', url: orBrosseImage },
      { id: 'detail-or', alt: 'Robinet HYDRAL One or brossé — eau bouillante thé robinet multifonction premium', url: orBrosseImage2 },
      { id: 'context-or', alt: 'Robinet HYDRAL One or brossé en contexte cuisine — robinet 5-en-1 design premium', url: orBrosseImage3 }
    ],
    'gris-metallise': [
      { id: 'front-gris', alt: 'Robinet HYDRAL One gris métallisé — eau gazeuse filtrée robinet cuisine 5-en-1', url: grisMetalliseImage },
      { id: 'detail-gris', alt: 'Robinet HYDRAL One gris métallisé — eau bouillante instantanée robinet tout-en-un', url: grisMetalliseImage2 },
      { id: 'context-gris', alt: 'Robinet HYDRAL One gris métallisé en contexte cuisine — robinet multifonction design', url: grisMetalliseImage3 }
    ]
  }
};

export function ProductImageGallery({ productName, colorName, modelSKU, colorId }: ProductImageGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isZooming, setIsZooming] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  // Récupérer les images correspondant au modèle et coloris sélectionnés
  const images = FAUCET_IMAGES[modelSKU]?.[colorId] || [];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    
    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setZoomPosition({ x, y });
  };

  // Réinitialiser l'index quand le coloris change
  const prevColorId = useRef(colorId);
  if (prevColorId.current !== colorId) {
    setSelectedImageIndex(0);
    prevColorId.current = colorId;
  }

  if (images.length === 0) {
    return (
      <div className="w-full aspect-square bg-gray-100 rounded-2xl flex items-center justify-center">
        <p className="text-sm text-gray-500">Images non disponibles</p>
      </div>
    );
  }

  const currentImage = images[selectedImageIndex];

  return (
    <div className="w-full">
      {/* Image principale avec zoom */}
      <div className="relative mb-4">
        <div
          ref={imageRef}
          className="relative w-full aspect-square bg-white rounded-2xl border-2 border-gray-200 overflow-hidden cursor-zoom-in"
          onMouseEnter={() => setIsZooming(true)}
          onMouseLeave={() => setIsZooming(false)}
          onMouseMove={handleMouseMove}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`${colorId}-${selectedImageIndex}`}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="w-full h-full"
            >
              <ImageWithFallback
                src={currentImage.url}
                alt={currentImage.alt}
                className="w-full h-full object-cover transition-transform duration-100"
                style={{
                  transform: isZooming ? 'scale(2)' : 'scale(1)',
                  transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`
                }}
              />
            </motion.div>
          </AnimatePresence>

          {/* Badge du coloris */}
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-gray-200">
            <p className="text-xs font-medium text-gray-900">{colorName}</p>
          </div>

          {/* Indicateur de zoom */}
          {isZooming && (
            <div className="absolute top-4 right-4 bg-black/70 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm">
              Zoom actif
            </div>
          )}
        </div>

        {/* Compteur d'images */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm">
          {selectedImageIndex + 1} / {images.length}
        </div>
      </div>

      {/* Vignettes */}
      <div className="flex gap-3">
        {images.map((image, index) => (
          <button
            key={image.id}
            onClick={() => setSelectedImageIndex(index)}
            className={`relative flex-1 aspect-square rounded-xl overflow-hidden border-2 transition-all hover:-translate-y-0.5 ${
              selectedImageIndex === index
                ? 'border-[#6B1E3E] ring-2 ring-[#6B1E3E]/20'
                : 'border-gray-200 hover:border-[#6B1E3E]/50'
            }`}
          >
            <ImageWithFallback
              src={image.url}
              alt={image.alt}
              className="w-full h-full object-cover"
            />

            {/* Indicateur de sélection */}
            {selectedImageIndex === index && (
              <div className="absolute inset-0 bg-[#6B1E3E]/10 pointer-events-none" />
            )}
          </button>
        ))}
      </div>

      {/* Instructions pour desktop */}
      <p className="text-xs text-gray-500 text-center mt-4 hidden sm:block">
        Survolez l'image principale pour zoomer • Cliquez sur les vignettes pour changer de vue
      </p>

      {/* Instructions pour mobile */}
      <p className="text-xs text-gray-500 text-center mt-4 sm:hidden">
        Touchez les vignettes pour changer de vue
      </p>
    </div>
  );
}