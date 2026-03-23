// BASE DE DONNÉES ENRICHIE - À intégrer dans UltimateCalculator.tsx

export const waterDatabaseEnriched = {
  carrefour: [
    // MDD Carrefour Classic'
    { marque: "Carrefour Classic'", format: "1×1,5L", prixPack: 0.17, prixLitre: 0.11, bottlesPerPack: 1, litersPerBottle: 1.5, type: 'plate' },
    { marque: "Carrefour Classic'", format: "6×1,5L", prixPack: 0.85, prixLitre: 0.09, bottlesPerPack: 6, litersPerBottle: 1.5, type: 'plate' },
    
    // Cristaline
    { marque: "Cristaline", format: "1×1,5L", prixPack: 0.25, prixLitre: 0.17, bottlesPerPack: 1, litersPerBottle: 1.5, type: 'plate' },
    { marque: "Cristaline", format: "6×1,5L", prixPack: 1.39, prixLitre: 0.15, bottlesPerPack: 6, litersPerBottle: 1.5, type: 'plate' },
    
    // Mont Roucous
    { marque: "Mont Roucous", format: "1×1L", prixPack: 0.65, prixLitre: 0.65, bottlesPerPack: 1, litersPerBottle: 1, type: 'plate' },
    { marque: "Mont Roucous", format: "6×1L", prixPack: 3.29, prixLitre: 0.55, bottlesPerPack: 6, litersPerBottle: 1, type: 'plate' },
    
    // Vittel
    { marque: "Vittel", format: "1×1L", prixPack: 0.69, prixLitre: 0.69, bottlesPerPack: 1, litersPerBottle: 1, type: 'plate' },
    { marque: "Vittel", format: "6×1L", prixPack: 3.40, prixLitre: 0.57, bottlesPerPack: 6, litersPerBottle: 1, type: 'plate' },
    { marque: "Vittel", format: "1×1,5L", prixPack: 0.79, prixLitre: 0.53, bottlesPerPack: 1, litersPerBottle: 1.5, type: 'plate' },
    { marque: "Vittel", format: "6×1,5L", prixPack: 4.10, prixLitre: 0.46, bottlesPerPack: 6, litersPerBottle: 1.5, type: 'plate' },
    
    // Volvic
    { marque: "Volvic", format: "1×1L", prixPack: 0.79, prixLitre: 0.79, bottlesPerPack: 1, litersPerBottle: 1, type: 'plate' },
    { marque: "Volvic", format: "6×1L", prixPack: 3.95, prixLitre: 0.66, bottlesPerPack: 6, litersPerBottle: 1, type: 'plate' },
    { marque: "Volvic", format: "1×1,5L", prixPack: 0.89, prixLitre: 0.59, bottlesPerPack: 1, litersPerBottle: 1.5, type: 'plate' },
    { marque: "Volvic", format: "6×1,5L", prixPack: 4.09, prixLitre: 0.45, bottlesPerPack: 6, litersPerBottle: 1.5, type: 'plate' },
    
    // Evian
    { marque: "Evian", format: "1×50cl", prixPack: 0.65, prixLitre: 1.30, bottlesPerPack: 1, litersPerBottle: 0.5, type: 'plate' },
    { marque: "Evian", format: "6×50cl", prixPack: 3.09, prixLitre: 1.03, bottlesPerPack: 6, litersPerBottle: 0.5, type: 'plate' },
    { marque: "Evian", format: "1×1L", prixPack: 0.79, prixLitre: 0.79, bottlesPerPack: 1, litersPerBottle: 1, type: 'plate' },
    { marque: "Evian", format: "6×1L", prixPack: 3.69, prixLitre: 0.62, bottlesPerPack: 6, litersPerBottle: 1, type: 'plate' },
    { marque: "Evian", format: "1×1,5L", prixPack: 0.99, prixLitre: 0.66, bottlesPerPack: 1, litersPerBottle: 1.5, type: 'plate' },
    { marque: "Evian", format: "6×1,5L", prixPack: 4.49, prixLitre: 0.50, bottlesPerPack: 6, litersPerBottle: 1.5, type: 'plate' },
    
    // Perrier
    { marque: "Perrier", format: "1×20cl", prixPack: 0.69, prixLitre: 3.45, bottlesPerPack: 1, litersPerBottle: 0.2, type: 'gazeuse' },
    { marque: "Perrier", format: "8×20cl", prixPack: 4.45, prixLitre: 2.78, bottlesPerPack: 8, litersPerBottle: 0.2, type: 'gazeuse' },
    { marque: "Perrier", format: "1×1L", prixPack: 1.19, prixLitre: 1.19, bottlesPerPack: 1, litersPerBottle: 1, type: 'gazeuse' },
    { marque: "Perrier", format: "6×1L", prixPack: 5.79, prixLitre: 0.97, bottlesPerPack: 6, litersPerBottle: 1, type: 'gazeuse' },
    
    // Badoit
    { marque: "Badoit", format: "1×50cl", prixPack: 0.79, prixLitre: 1.58, bottlesPerPack: 1, litersPerBottle: 0.5, type: 'gazeuse' },
    { marque: "Badoit", format: "6×50cl", prixPack: 3.85, prixLitre: 1.28, bottlesPerPack: 6, litersPerBottle: 0.5, type: 'gazeuse' },
    { marque: "Badoit", format: "1×1L", prixPack: 1.19, prixLitre: 1.19, bottlesPerPack: 1, litersPerBottle: 1, type: 'gazeuse' },
    { marque: "Badoit", format: "6×1L", prixPack: 5.89, prixLitre: 0.98, bottlesPerPack: 6, litersPerBottle: 1, type: 'gazeuse' },
    
    // San Pellegrino
    { marque: "San Pellegrino", format: "1×1L", prixPack: 1.09, prixLitre: 1.09, bottlesPerPack: 1, litersPerBottle: 1, type: 'gazeuse' },
    { marque: "San Pellegrino", format: "6×1L", prixPack: 5.19, prixLitre: 0.87, bottlesPerPack: 6, litersPerBottle: 1, type: 'gazeuse' }
  ],
  
  monoprix: [
    // MDD Monoprix Source Claire
    { marque: "Monoprix Source Claire", format: "1×50cl", prixPack: 0.35, prixLitre: 0.70, bottlesPerPack: 1, litersPerBottle: 0.5, type: 'plate' },
    { marque: "Monoprix Source Claire", format: "6×50cl", prixPack: 1.85, prixLitre: 0.62, bottlesPerPack: 6, litersPerBottle: 0.5, type: 'plate' },
    
    // Cristaline
    { marque: "Cristaline", format: "1×1,5L", prixPack: 0.25, prixLitre: 0.17, bottlesPerPack: 1, litersPerBottle: 1.5, type: 'plate' },
    { marque: "Cristaline", format: "6×1,5L", prixPack: 1.39, prixLitre: 0.15, bottlesPerPack: 6, litersPerBottle: 1.5, type: 'plate' },
    
    // Vittel
    { marque: "Vittel", format: "1×1L", prixPack: 0.65, prixLitre: 0.65, bottlesPerPack: 1, litersPerBottle: 1, type: 'plate' },
    { marque: "Vittel", format: "6×1L", prixPack: 3.29, prixLitre: 0.55, bottlesPerPack: 6, litersPerBottle: 1, type: 'plate' },
    
    // Volvic
    { marque: "Volvic", format: "1×1L", prixPack: 0.79, prixLitre: 0.79, bottlesPerPack: 1, litersPerBottle: 1, type: 'plate' },
    { marque: "Volvic", format: "6×1L", prixPack: 3.95, prixLitre: 0.66, bottlesPerPack: 6, litersPerBottle: 1, type: 'plate' },
    { marque: "Volvic", format: "1×1,5L", prixPack: 0.89, prixLitre: 0.59, bottlesPerPack: 1, litersPerBottle: 1.5, type: 'plate' },
    { marque: "Volvic", format: "6×1,5L", prixPack: 4.09, prixLitre: 0.45, bottlesPerPack: 6, litersPerBottle: 1.5, type: 'plate' },
    
    // Evian
    { marque: "Evian", format: "1×50cl", prixPack: 0.65, prixLitre: 1.30, bottlesPerPack: 1, litersPerBottle: 0.5, type: 'plate' },
    { marque: "Evian", format: "6×50cl", prixPack: 3.09, prixLitre: 1.03, bottlesPerPack: 6, litersPerBottle: 0.5, type: 'plate' },
    { marque: "Evian", format: "1×1L", prixPack: 0.79, prixLitre: 0.79, bottlesPerPack: 1, litersPerBottle: 1, type: 'plate' },
    { marque: "Evian", format: "6×1L", prixPack: 3.69, prixLitre: 0.62, bottlesPerPack: 6, litersPerBottle: 1, type: 'plate' },
    
    // Wattwiller
    { marque: "Wattwiller", format: "1×1,5L", prixPack: 0.95, prixLitre: 0.63, bottlesPerPack: 1, litersPerBottle: 1.5, type: 'plate' },
    { marque: "Wattwiller", format: "6×1,5L", prixPack: 4.45, prixLitre: 0.49, bottlesPerPack: 6, litersPerBottle: 1.5, type: 'plate' },
    
    // Perrier
    { marque: "Perrier", format: "1×20cl", prixPack: 0.69, prixLitre: 3.45, bottlesPerPack: 1, litersPerBottle: 0.2, type: 'gazeuse' },
    { marque: "Perrier", format: "8×20cl", prixPack: 4.45, prixLitre: 2.78, bottlesPerPack: 8, litersPerBottle: 0.2, type: 'gazeuse' },
    
    // Badoit
    { marque: "Badoit", format: "1×50cl", prixPack: 0.79, prixLitre: 1.58, bottlesPerPack: 1, litersPerBottle: 0.5, type: 'gazeuse' },
    { marque: "Badoit", format: "6×50cl", prixPack: 3.85, prixLitre: 1.28, bottlesPerPack: 6, litersPerBottle: 0.5, type: 'gazeuse' },
    
    // San Pellegrino
    { marque: "San Pellegrino", format: "1×1L", prixPack: 1.09, prixLitre: 1.09, bottlesPerPack: 1, litersPerBottle: 1, type: 'gazeuse' },
    { marque: "San Pellegrino", format: "6×1L", prixPack: 5.19, prixLitre: 0.87, bottlesPerPack: 6, litersPerBottle: 1, type: 'gazeuse' },
    
    // Cristaline pétillante
    { marque: "Cristaline pétillante", format: "1×1,5L", prixPack: 0.39, prixLitre: 0.26, bottlesPerPack: 1, litersPerBottle: 1.5, type: 'gazeuse' },
    { marque: "Cristaline pétillante", format: "6×1,5L", prixPack: 2.00, prixLitre: 0.22, bottlesPerPack: 6, litersPerBottle: 1.5, type: 'gazeuse' }
  ],
  
  leclerc: [
    // MDD Leclerc Marque Repère
    { marque: "Eaux de source Marque Repère", format: "1×1,5L", prixPack: 0.15, prixLitre: 0.10, bottlesPerPack: 1, litersPerBottle: 1.5, type: 'plate' },
    { marque: "Eaux de source Marque Repère", format: "6×1,5L", prixPack: 0.79, prixLitre: 0.09, bottlesPerPack: 6, litersPerBottle: 1.5, type: 'plate' },
    
    // Cristaline
    { marque: "Cristaline", format: "1×1,5L", prixPack: 0.23, prixLitre: 0.15, bottlesPerPack: 1, litersPerBottle: 1.5, type: 'plate' },
    { marque: "Cristaline", format: "6×1,5L", prixPack: 1.25, prixLitre: 0.14, bottlesPerPack: 6, litersPerBottle: 1.5, type: 'plate' },
    
    // Vittel
    { marque: "Vittel", format: "1×1,5L", prixPack: 0.75, prixLitre: 0.50, bottlesPerPack: 1, litersPerBottle: 1.5, type: 'plate' },
    { marque: "Vittel", format: "6×1,5L", prixPack: 3.65, prixLitre: 0.41, bottlesPerPack: 6, litersPerBottle: 1.5, type: 'plate' },
    
    // Volvic
    { marque: "Volvic", format: "1×1,5L", prixPack: 0.79, prixLitre: 0.53, bottlesPerPack: 1, litersPerBottle: 1.5, type: 'plate' },
    { marque: "Volvic", format: "6×1,5L", prixPack: 3.89, prixLitre: 0.43, bottlesPerPack: 6, litersPerBottle: 1.5, type: 'plate' },
    
    // Evian
    { marque: "Evian", format: "1×1L", prixPack: 0.69, prixLitre: 0.69, bottlesPerPack: 1, litersPerBottle: 1, type: 'plate' },
    { marque: "Evian", format: "6×1L", prixPack: 3.49, prixLitre: 0.58, bottlesPerPack: 6, litersPerBottle: 1, type: 'plate' },
    { marque: "Evian", format: "1×1,5L", prixPack: 0.89, prixLitre: 0.59, bottlesPerPack: 1, litersPerBottle: 1.5, type: 'plate' },
    { marque: "Evian", format: "6×1,5L", prixPack: 4.29, prixLitre: 0.48, bottlesPerPack: 6, litersPerBottle: 1.5, type: 'plate' },
    
    // Perrier
    { marque: "Perrier", format: "1×1L", prixPack: 1.09, prixLitre: 1.09, bottlesPerPack: 1, litersPerBottle: 1, type: 'gazeuse' },
    { marque: "Perrier", format: "6×1L", prixPack: 5.29, prixLitre: 0.88, bottlesPerPack: 6, litersPerBottle: 1, type: 'gazeuse' },
    
    // Badoit
    { marque: "Badoit", format: "1×1L", prixPack: 1.09, prixLitre: 1.09, bottlesPerPack: 1, litersPerBottle: 1, type: 'gazeuse' },
    { marque: "Badoit", format: "6×1L", prixPack: 5.49, prixLitre: 0.92, bottlesPerPack: 6, litersPerBottle: 1, type: 'gazeuse' },
    
    // San Pellegrino
    { marque: "San Pellegrino", format: "1×1L", prixPack: 0.99, prixLitre: 0.99, bottlesPerPack: 1, litersPerBottle: 1, type: 'gazeuse' },
    { marque: "San Pellegrino", format: "6×1L", prixPack: 4.89, prixLitre: 0.82, bottlesPerPack: 6, litersPerBottle: 1, type: 'gazeuse' },
    
    // Salvetat
    { marque: "Salvetat", format: "1×1,15L", prixPack: 0.69, prixLitre: 0.60, bottlesPerPack: 1, litersPerBottle: 1.15, type: 'gazeuse' },
    { marque: "Salvetat", format: "6×1,15L", prixPack: 3.50, prixLitre: 0.51, bottlesPerPack: 6, litersPerBottle: 1.15, type: 'gazeuse' }
  ],
  
  auchan: [
    // MDD Auchan Source Montcalm
    { marque: "Auchan Source Montcalm", format: "1×1,5L", prixPack: 0.16, prixLitre: 0.11, bottlesPerPack: 1, litersPerBottle: 1.5, type: 'plate' },
    { marque: "Auchan Source Montcalm", format: "6×1,5L", prixPack: 0.82, prixLitre: 0.09, bottlesPerPack: 6, litersPerBottle: 1.5, type: 'plate' },
    
    // Cristaline
    { marque: "Cristaline", format: "1×1,5L", prixPack: 0.25, prixLitre: 0.17, bottlesPerPack: 1, litersPerBottle: 1.5, type: 'plate' },
    { marque: "Cristaline", format: "6×1,5L", prixPack: 1.35, prixLitre: 0.15, bottlesPerPack: 6, litersPerBottle: 1.5, type: 'plate' },
    
    // Evian
    { marque: "Evian", format: "1×1,5L", prixPack: 0.99, prixLitre: 0.66, bottlesPerPack: 1, litersPerBottle: 1.5, type: 'plate' },
    { marque: "Evian", format: "6×1,5L", prixPack: 4.49, prixLitre: 0.50, bottlesPerPack: 6, litersPerBottle: 1.5, type: 'plate' },
    
    // Vittel
    { marque: "Vittel", format: "1×1,5L", prixPack: 0.85, prixLitre: 0.57, bottlesPerPack: 1, litersPerBottle: 1.5, type: 'plate' },
    { marque: "Vittel", format: "6×1,5L", prixPack: 4.05, prixLitre: 0.45, bottlesPerPack: 6, litersPerBottle: 1.5, type: 'plate' },
    
    // Volvic
    { marque: "Volvic", format: "1×1,5L", prixPack: 0.85, prixLitre: 0.57, bottlesPerPack: 1, litersPerBottle: 1.5, type: 'plate' },
    { marque: "Volvic", format: "6×1,5L", prixPack: 4.05, prixLitre: 0.45, bottlesPerPack: 6, litersPerBottle: 1.5, type: 'plate' }
  ],
  
  intermarche: [
    // MDD Intermarché Pâturages
    { marque: "Intermarché Pâturages", format: "1×1,5L", prixPack: 0.19, prixLitre: 0.13, bottlesPerPack: 1, litersPerBottle: 1.5, type: 'plate' },
    { marque: "Intermarché Pâturages", format: "6×1,5L", prixPack: 0.99, prixLitre: 0.11, bottlesPerPack: 6, litersPerBottle: 1.5, type: 'plate' },
    
    // Cristaline
    { marque: "Cristaline", format: "1×1,5L", prixPack: 0.24, prixLitre: 0.16, bottlesPerPack: 1, litersPerBottle: 1.5, type: 'plate' },
    { marque: "Cristaline", format: "6×1,5L", prixPack: 1.29, prixLitre: 0.14, bottlesPerPack: 6, litersPerBottle: 1.5, type: 'plate' },
    
    // Evian
    { marque: "Evian", format: "1×1,5L", prixPack: 0.95, prixLitre: 0.63, bottlesPerPack: 1, litersPerBottle: 1.5, type: 'plate' },
    { marque: "Evian", format: "6×1,5L", prixPack: 4.39, prixLitre: 0.49, bottlesPerPack: 6, litersPerBottle: 1.5, type: 'plate' },
    
    // Vittel
    { marque: "Vittel", format: "1×1,5L", prixPack: 0.79, prixLitre: 0.53, bottlesPerPack: 1, litersPerBottle: 1.5, type: 'plate' },
    { marque: "Vittel", format: "6×1,5L", prixPack: 3.95, prixLitre: 0.44, bottlesPerPack: 6, litersPerBottle: 1.5, type: 'plate' },
    
    // Volvic
    { marque: "Volvic", format: "1×1,5L", prixPack: 0.79, prixLitre: 0.53, bottlesPerPack: 1, litersPerBottle: 1.5, type: 'plate' },
    { marque: "Volvic", format: "6×1,5L", prixPack: 3.99, prixLitre: 0.44, bottlesPerPack: 6, litersPerBottle: 1.5, type: 'plate' }
  ]
};
