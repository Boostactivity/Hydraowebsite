import { Check } from 'lucide-react';

export type ColorisOption = {
  id: string;
  name: string;
  hex: string;
};

// Les 5 coloris disponibles pour les robinets
export const ROBINET_COLORIS: ColorisOption[] = [
  { id: 'noir-mat', name: 'Noir mat', hex: '#1A1A1A' },
  { id: 'chrome-brillant', name: 'Chrome brillant', hex: '#C0C0C0' },
  { id: 'nickel-brosse', name: 'Nickel brossé', hex: '#8C8C8C' },
  { id: 'or-brosse', name: 'Or brossé', hex: '#D4AF37' },
  { id: 'gris-metallise', name: 'Gris métallisé', hex: '#4A4A4A' }
];

interface ColorisSelectorProps {
  selectedColoris: string;
  onSelectColoris: (colorisId: string) => void;
  colorisOptions?: ColorisOption[];
}

export function ColorisSelector({ 
  selectedColoris, 
  onSelectColoris,
  colorisOptions = ROBINET_COLORIS
}: ColorisSelectorProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-gray-900">Choisissez votre coloris</h4>
        {selectedColoris && (
          <span className="text-xs text-[#6B1E3E] font-medium">
            {colorisOptions.find(c => c.id === selectedColoris)?.name}
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {colorisOptions.map((coloris) => {
          const isSelected = selectedColoris === coloris.id;
          const isWhite = coloris.hex === '#F5F5F5' || coloris.hex === '#FFFFFF';
          
          return (
            <button
              key={coloris.id}
              onClick={() => onSelectColoris(coloris.id)}
              className={`relative p-4 rounded-xl border-2 transition-all hover:-translate-y-0.5 active:scale-98 ${
                isSelected
                  ? 'border-[#6B1E3E] bg-[#6B1E3E]/5 shadow-md'
                  : 'border-gray-200 hover:border-[#6B1E3E]/30 bg-white'
              }`}
            >
              {/* Échantillon de couleur */}
              <div className="flex flex-col items-center gap-2">
                <div 
                  className={`w-10 h-10 rounded-full shadow-sm ${
                    isWhite ? 'border border-gray-300' : ''
                  }`}
                  style={{ backgroundColor: coloris.hex }}
                />
                
                <span className={`text-xs text-center font-medium ${
                  isSelected ? 'text-[#6B1E3E]' : 'text-gray-700'
                }`}>
                  {coloris.name}
                </span>
              </div>

              {/* Checkmark pour coloris sélectionné */}
              {isSelected && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#6B1E3E] rounded-full flex items-center justify-center shadow-md">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      <p className="text-xs text-gray-500 text-center">
        Visualisez instantanément votre robinet dans le coloris choisi
      </p>
    </div>
  );
}