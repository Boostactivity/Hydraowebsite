import React, { useState } from 'react';
import { Image as ImageIcon, AlertCircle } from 'lucide-react';

interface AccessibleImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  decorative?: boolean;
  longDescription?: string;
  caption?: string;
}

export function AccessibleImage({
  src,
  alt,
  decorative = false,
  longDescription,
  caption,
  className = '',
  ...props
}: AccessibleImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Generate unique ID for long description
  const descId = longDescription ? `desc-${Math.random().toString(36).substr(2, 9)}` : undefined;

  if (hasError) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-100 rounded-lg p-6 ${className}`}
        role="img"
        aria-label={alt}
      >
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-600">Image non disponible</p>
          {alt && <p className="text-xs text-gray-500 mt-1">{alt}</p>}
        </div>
      </div>
    );
  }

  return (
    <figure className={className}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 animate-pulse">
          <ImageIcon className="w-8 h-8 text-gray-400" />
        </div>
      )}
      
      <img
        {...props}
        src={src}
        alt={decorative ? '' : alt}
        aria-describedby={descId}
        role={decorative ? 'presentation' : undefined}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setHasError(true);
          setIsLoading(false);
        }}
        className={`${isLoading ? 'invisible' : 'visible'}`}
      />

      {longDescription && (
        <div id={descId} className="sr-only">
          {longDescription}
        </div>
      )}

      {caption && (
        <figcaption className="mt-2 text-sm text-gray-600 text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

// Product image with structured alt text
interface ProductImageProps {
  product: {
    name: string;
    category?: string;
    color?: string;
    features?: string[];
  };
  src: string;
  className?: string;
}

export function ProductImage({ product, src, className }: ProductImageProps) {
  // Generate descriptive alt text
  const altText = [
    product.name,
    product.color && `couleur ${product.color}`,
    product.category,
  ]
    .filter(Boolean)
    .join(', ');

  const longDescription = product.features?.length
    ? `${product.name}. Caractéristiques: ${product.features.join(', ')}.`
    : undefined;

  return (
    <AccessibleImage
      src={src}
      alt={altText}
      longDescription={longDescription}
      className={className}
    />
  );
}

// Decorative image (no alt text needed)
export function DecorativeImage({ src, className, ...props }: Omit<AccessibleImageProps, 'alt'>) {
  return (
    <img
      {...props}
      src={src}
      alt=""
      role="presentation"
      className={className}
    />
  );
}

// Icon with accessible label
interface AccessibleIconProps {
  icon: React.ReactNode;
  label: string;
  decorative?: boolean;
}

export function AccessibleIcon({ icon, label, decorative = false }: AccessibleIconProps) {
  if (decorative) {
    return (
      <span role="presentation" aria-hidden="true">
        {icon}
      </span>
    );
  }

  return (
    <span role="img" aria-label={label}>
      {icon}
      <span className="sr-only">{label}</span>
    </span>
  );
}

// Complex image with detailed description
interface ComplexImageProps {
  src: string;
  alt: string;
  detailedDescription: React.ReactNode;
  className?: string;
}

export function ComplexImage({ src, alt, detailedDescription, className }: ComplexImageProps) {
  const [showDescription, setShowDescription] = useState(false);
  const descId = `complex-desc-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={className}>
      <AccessibleImage src={src} alt={alt} aria-describedby={descId} />
      
      <button
        onClick={() => setShowDescription(!showDescription)}
        className="mt-2 text-sm text-[#6B1E3E] hover:underline font-semibold"
        aria-expanded={showDescription}
      >
        {showDescription ? 'Masquer' : 'Afficher'} la description détaillée
      </button>

      {showDescription && (
        <div id={descId} className="mt-4 p-4 bg-gray-50 rounded-lg text-sm text-gray-700">
          {detailedDescription}
        </div>
      )}
    </div>
  );
}

// Image gallery with keyboard navigation
interface GalleryImageProps {
  images: Array<{ src: string; alt: string; caption?: string }>;
  className?: string;
}

export function AccessibleImageGallery({ images, className }: GalleryImageProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowLeft':
        setCurrentIndex((prev) => Math.max(0, prev - 1));
        break;
      case 'ArrowRight':
        setCurrentIndex((prev) => Math.min(images.length - 1, prev + 1));
        break;
      case 'Home':
        setCurrentIndex(0);
        break;
      case 'End':
        setCurrentIndex(images.length - 1);
        break;
    }
  };

  return (
    <div className={className}>
      <div
        role="region"
        aria-label="Galerie d'images"
        aria-live="polite"
        onKeyDown={handleKeyDown}
        tabIndex={0}
        className="focus:outline-none focus:ring-4 focus:ring-purple-300 rounded-lg"
      >
        <AccessibleImage
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
          caption={images[currentIndex].caption}
        />
      </div>

      <div className="flex items-center justify-between mt-4">
        <button
          onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
          disabled={currentIndex === 0}
          className="px-4 py-2 bg-[#6B1E3E] text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Image précédente"
        >
          Précédent
        </button>

        <span className="text-sm text-gray-600" aria-live="polite" aria-atomic="true">
          Image {currentIndex + 1} sur {images.length}
        </span>

        <button
          onClick={() => setCurrentIndex((prev) => Math.min(images.length - 1, prev + 1))}
          disabled={currentIndex === images.length - 1}
          className="px-4 py-2 bg-[#6B1E3E] text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Image suivante"
        >
          Suivant
        </button>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 mt-4" role="tablist" aria-label="Miniatures de la galerie">
        {images.map((image, index) => (
          <button
            key={index}
            role="tab"
            aria-selected={currentIndex === index}
            aria-controls={`image-${index}`}
            onClick={() => setCurrentIndex(index)}
            className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
              currentIndex === index
                ? 'border-[#6B1E3E] ring-4 ring-purple-300'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <img src={image.src} alt="" role="presentation" className="w-full h-full object-cover" />
            <span className="sr-only">
              {image.alt} {currentIndex === index ? '(sélectionné)' : ''}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

// Alt text best practices guide
export const altTextGuidelines = {
  products: {
    good: 'Robinet HYDRAO 5-en-1, finition chrome, avec écran digital',
    bad: 'robinet.jpg',
    reason: 'Décrit ce que l\'image montre, pas le nom du fichier',
  },
  actions: {
    good: 'Télécharger le guide d\'installation PDF',
    bad: 'Cliquez ici',
    reason: 'Décrit l\'action, pas juste l\'instruction',
  },
  decorative: {
    good: '',
    bad: 'Image de fond',
    reason: 'Images décoratives doivent avoir alt vide avec role="presentation"',
  },
  complex: {
    good: 'Graphique économies HYDRAO. Description détaillée disponible ci-dessous.',
    bad: 'Graphique',
    reason: 'Indication qu\'une description détaillée est disponible',
  },
  context: {
    good: 'Marie Dubois, cliente satisfaite',
    bad: 'Photo de profil',
    reason: 'Contexte important pour comprendre l\'image',
  },
};

// Alt text validator component
interface AltTextValidatorProps {
  alt: string;
  type: 'product' | 'action' | 'decorative' | 'complex' | 'context';
}

export function AltTextValidator({ alt, type }: AltTextValidatorProps) {
  const issues: string[] = [];

  if (!alt && type !== 'decorative') {
    issues.push('❌ Texte alternatif manquant');
  }

  if (alt && alt.length < 10 && type !== 'decorative') {
    issues.push('⚠️ Texte alternatif trop court (min 10 caractères)');
  }

  if (alt && alt.length > 125) {
    issues.push('⚠️ Texte alternatif trop long (max 125 caractères). Utilisez longDescription.');
  }

  if (alt && /\.(jpg|jpeg|png|gif|svg|webp)$/i.test(alt)) {
    issues.push('❌ Ne pas inclure l\'extension de fichier');
  }

  if (alt && /^(image|photo|picture) (of|de)/i.test(alt)) {
    issues.push('⚠️ Éviter "image de..." ou "photo de...". Décrivez directement.');
  }

  const isValid = issues.length === 0;

  return (
    <div className={`p-3 rounded-lg ${isValid ? 'bg-green-50' : 'bg-orange-50'}`}>
      <div className="flex items-center gap-2 mb-2">
        {isValid ? (
          <>
            <span className="text-green-600 font-semibold">✓ Valide</span>
            <span className="text-sm text-green-700">Alt text conforme</span>
          </>
        ) : (
          <>
            <span className="text-orange-600 font-semibold">⚠ À améliorer</span>
          </>
        )}
      </div>
      
      {issues.length > 0 && (
        <ul className="space-y-1 text-sm">
          {issues.map((issue, index) => (
            <li key={index} className="text-orange-800">
              {issue}
            </li>
          ))}
        </ul>
      )}

      {isValid && (
        <p className="text-sm text-green-700 mt-2">
          💡 Bonne pratique: {altTextGuidelines[type].reason}
        </p>
      )}
    </div>
  );
}
