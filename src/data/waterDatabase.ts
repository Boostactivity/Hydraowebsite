// ==================== BASE DE DONNÉES EAU COMPLÈTE PAR ENSEIGNE ====================
// Prix relevés 2025/2026 en France métropolitaine

export type WaterType = 'plate' | 'gazeuse';

export type Enseigne =
  | 'Carrefour'
  | 'Leclerc'
  | 'Auchan'
  | 'Intermarché'
  | 'Monoprix'
  | 'Lidl'
  | 'Aldi'
  | 'Casino'
  | 'Franprix'
  | 'Système U';

export interface WaterProduct {
  marque: string;
  enseigne: Enseigne;
  format: string;
  prixPack: number;
  bottlesPerPack: number;
  litersPerBottle: number;
  type: WaterType;
}

export interface AggregatedWater {
  marque: string;
  format: string;
  prixMoyen: number;
  prixMin: number;
  prixMax: number;
  bottlesPerPack: number;
  litersPerBottle: number;
  type: WaterType;
  enseignes: string[];
}

// ==================== TOUTES LES EAUX PAR ENSEIGNE ====================
export const waterDatabase: WaterProduct[] = [

  // ================================================================
  //                       CARREFOUR
  // ================================================================

  // --- MDD Carrefour ---
  { marque: "Eau de source Carrefour", enseigne: "Carrefour", format: "6×1,5L", prixPack: 0.85, bottlesPerPack: 6, litersPerBottle: 1.5, type: 'plate' },
  { marque: "Eau de source Carrefour", enseigne: "Carrefour", format: "1×1,5L", prixPack: 0.17, bottlesPerPack: 1, litersPerBottle: 1.5, type: 'plate' },
  // --- Cristaline ---
  { marque: "Cristaline", enseigne: "Carrefour", format: "6×1,5L", prixPack: 1.39, bottlesPerPack: 6, litersPerBottle: 1.5, type: 'plate' },
  { marque: "Cristaline", enseigne: "Carrefour", format: "1×1,5L", prixPack: 0.25, bottlesPerPack: 1, litersPerBottle: 1.5, type: 'plate' },
  { marque: "Cristaline", enseigne: "Carrefour", format: "6×50cl", prixPack: 0.95, bottlesPerPack: 6, litersPerBottle: 0.5, type: 'plate' },
  // --- Evian ---
  { marque: "Evian", enseigne: "Carrefour", format: "6×1,5L", prixPack: 4.49, bottlesPerPack: 6, litersPerBottle: 1.5, type: 'plate' },
  { marque: "Evian", enseigne: "Carrefour", format: "1×1,5L", prixPack: 0.99, bottlesPerPack: 1, litersPerBottle: 1.5, type: 'plate' },
  { marque: "Evian", enseigne: "Carrefour", format: "6×1L", prixPack: 3.69, bottlesPerPack: 6, litersPerBottle: 1, type: 'plate' },
  { marque: "Evian", enseigne: "Carrefour", format: "1×1L", prixPack: 0.79, bottlesPerPack: 1, litersPerBottle: 1, type: 'plate' },
  { marque: "Evian", enseigne: "Carrefour", format: "6×50cl", prixPack: 3.09, bottlesPerPack: 6, litersPerBottle: 0.5, type: 'plate' },
  // --- Vittel ---
  { marque: "Vittel", enseigne: "Carrefour", format: "6×1,5L", prixPack: 4.10, bottlesPerPack: 6, litersPerBottle: 1.5, type: 'plate' },
  { marque: "Vittel", enseigne: "Carrefour", format: "1×1,5L", prixPack: 0.79, bottlesPerPack: 1, litersPerBottle: 1.5, type: 'plate' },
  { marque: "Vittel", enseigne: "Carrefour", format: "6×1L", prixPack: 3.40, bottlesPerPack: 6, litersPerBottle: 1, type: 'plate' },
  { marque: "Vittel", enseigne: "Carrefour", format: "1×1L", prixPack: 0.69, bottlesPerPack: 1, litersPerBottle: 1, type: 'plate' },
  // --- Volvic ---
  { marque: "Volvic", enseigne: "Carrefour", format: "6×1,5L", prixPack: 4.09, bottlesPerPack: 6, litersPerBottle: 1.5, type: 'plate' },
  { marque: "Volvic", enseigne: "Carrefour", format: "1×1,5L", prixPack: 0.89, bottlesPerPack: 1, litersPerBottle: 1.5, type: 'plate' },
  { marque: "Volvic", enseigne: "Carrefour", format: "6×1L", prixPack: 3.95, bottlesPerPack: 6, litersPerBottle: 1, type: 'plate' },
  { marque: "Volvic", enseigne: "Carrefour", format: "1×1L", prixPack: 0.79, bottlesPerPack: 1, litersPerBottle: 1, type: 'plate' },
  // --- Contrex ---
  { marque: "Contrex", enseigne: "Carrefour", format: "6×1,5L", prixPack: 4.29, bottlesPerPack: 6, litersPerBottle: 1.5, type: 'plate' },
  { marque: "Contrex", enseigne: "Carrefour", format: "6×1L", prixPack: 3.59, bottlesPerPack: 6, litersPerBottle: 1, type: 'plate' },
  // --- Hépar ---
  { marque: "Hépar", enseigne: "Carrefour", format: "6×1L", prixPack: 5.29, bottlesPerPack: 6, litersPerBottle: 1, type: 'plate' },
  // --- Mont Roucous ---
  { marque: "Mont Roucous", enseigne: "Carrefour", format: "6×1L", prixPack: 3.29, bottlesPerPack: 6, litersPerBottle: 1, type: 'plate' },
  { marque: "Mont Roucous", enseigne: "Carrefour", format: "1×1L", prixPack: 0.65, bottlesPerPack: 1, litersPerBottle: 1, type: 'plate' },
  // --- Thonon ---
  { marque: "Thonon", enseigne: "Carrefour", format: "6×1,5L", prixPack: 2.79, bottlesPerPack: 6, litersPerBottle: 1.5, type: 'plate' },
  // --- Courmayeur ---
  { marque: "Courmayeur", enseigne: "Carrefour", format: "6×1,5L", prixPack: 4.59, bottlesPerPack: 6, litersPerBottle: 1.5, type: 'plate' },
  // --- Wattwiller ---
  { marque: "Wattwiller", enseigne: "Carrefour", format: "6×1,5L", prixPack: 4.49, bottlesPerPack: 6, litersPerBottle: 1.5, type: 'plate' },
  // --- Gazeuses Carrefour ---
  { marque: "Perrier", enseigne: "Carrefour", format: "6×1L", prixPack: 5.79, bottlesPerPack: 6, litersPerBottle: 1, type: 'gazeuse' },
  { marque: "Perrier", enseigne: "Carrefour", format: "1×1L", prixPack: 1.19, bottlesPerPack: 1, litersPerBottle: 1, type: 'gazeuse' },
  { marque: "Perrier", enseigne: "Carrefour", format: "6×50cl", prixPack: 3.89, bottlesPerPack: 6, litersPerBottle: 0.5, type: 'gazeuse' },
  { marque: "Badoit", enseigne: "Carrefour", format: "6×1L", prixPack: 5.89, bottlesPerPack: 6, litersPerBottle: 1, type: 'gazeuse' },
  { marque: "Badoit", enseigne: "Carrefour", format: "1×1L", prixPack: 1.19, bottlesPerPack: 1, litersPerBottle: 1, type: 'gazeuse' },
  { marque: "Badoit", enseigne: "Carrefour", format: "6×50cl", prixPack: 3.85, bottlesPerPack: 6, litersPerBottle: 0.5, type: 'gazeuse' },
  { marque: "San Pellegrino", enseigne: "Carrefour", format: "6×1L", prixPack: 5.19, bottlesPerPack: 6, litersPerBottle: 1, type: 'gazeuse' },
  { marque: "San Pellegrino", enseigne: "Carrefour", format: "1×1L", prixPack: 1.09, bottlesPerPack: 1, litersPerBottle: 1, type: 'gazeuse' },
  { marque: "Salvetat", enseigne: "Carrefour", format: "6×1,25L", prixPack: 3.59, bottlesPerPack: 6, litersPerBottle: 1.25, type: 'gazeuse' },
  { marque: "Vichy Célestins", enseigne: "Carrefour", format: "6×1,25L", prixPack: 5.19, bottlesPerPack: 6, litersPerBottle: 1.25, type: 'gazeuse' },
  { marque: "St-Yorre", enseigne: "Carrefour", format: "6×1,25L", prixPack: 4.89, bottlesPerPack: 6, litersPerBottle: 1.25, type: 'gazeuse' },
  { marque: "Quézac", enseigne: "Carrefour", format: "6×1,15L", prixPack: 3.89, bottlesPerPack: 6, litersPerBottle: 1.15, type: 'gazeuse' },
  { marque: "Rozana", enseigne: "Carrefour", format: "6×1L", prixPack: 4.59, bottlesPerPack: 6, litersPerBottle: 1, type: 'gazeuse' },
  { marque: "Cristaline pétillante", enseigne: "Carrefour", format: "6×1,5L", prixPack: 1.99, bottlesPerPack: 6, litersPerBottle: 1.5, type: 'gazeuse' },
  { marque: "Perrier Fines Bulles", enseigne: "Carrefour", format: "6×1L", prixPack: 5.39, bottlesPerPack: 6, litersPerBottle: 1, type: 'gazeuse' },

  // ================================================================
  //                       LECLERC
  // ================================================================

  // --- MDD Leclerc ---
  { marque: "Eau de source Marque Repère (Leclerc)", enseigne: "Leclerc", format: "6×1,5L", prixPack: 0.79, bottlesPerPack: 6, litersPerBottle: 1.5, type: 'plate' },
  { marque: "Eau de source Marque Repère (Leclerc)", enseigne: "Leclerc", format: "1×1,5L", prixPack: 0.15, bottlesPerPack: 1, litersPerBottle: 1.5, type: 'plate' },
  // --- Cristaline ---
  { marque: "Cristaline", enseigne: "Leclerc", format: "6×1,5L", prixPack: 1.25, bottlesPerPack: 6, litersPerBottle: 1.5, type: 'plate' },
  { marque: "Cristaline", enseigne: "Leclerc", format: "1×1,5L", prixPack: 0.23, bottlesPerPack: 1, litersPerBottle: 1.5, type: 'plate' },
  // --- Evian ---
  { marque: "Evian", enseigne: "Leclerc", format: "6×1,5L", prixPack: 4.29, bottlesPerPack: 6, litersPerBottle: 1.5, type: 'plate' },
  { marque: "Evian", enseigne: "Leclerc", format: "1×1,5L", prixPack: 0.89, bottlesPerPack: 1, litersPerBottle: 1.5, type: 'plate' },
  { marque: "Evian", enseigne: "Leclerc", format: "6×1L", prixPack: 3.49, bottlesPerPack: 6, litersPerBottle: 1, type: 'plate' },
  { marque: "Evian", enseigne: "Leclerc", format: "1×1L", prixPack: 0.69, bottlesPerPack: 1, litersPerBottle: 1, type: 'plate' },
  // --- Vittel ---
  { marque: "Vittel", enseigne: "Leclerc", format: "6×1,5L", prixPack: 3.65, bottlesPerPack: 6, litersPerBottle: 1.5, type: 'plate' },
  { marque: "Vittel", enseigne: "Leclerc", format: "1×1,5L", prixPack: 0.75, bottlesPerPack: 1, litersPerBottle: 1.5, type: 'plate' },
  // --- Volvic ---
  { marque: "Volvic", enseigne: "Leclerc", format: "6×1,5L", prixPack: 3.89, bottlesPerPack: 6, litersPerBottle: 1.5, type: 'plate' },
  { marque: "Volvic", enseigne: "Leclerc", format: "1×1,5L", prixPack: 0.79, bottlesPerPack: 1, litersPerBottle: 1.5, type: 'plate' },
  // --- Contrex ---
  { marque: "Contrex", enseigne: "Leclerc", format: "6×1,5L", prixPack: 4.09, bottlesPerPack: 6, litersPerBottle: 1.5, type: 'plate' },
  // --- Hépar ---
  { marque: "Hépar", enseigne: "Leclerc", format: "6×1L", prixPack: 5.09, bottlesPerPack: 6, litersPerBottle: 1, type: 'plate' },
  // --- Thonon ---
  { marque: "Thonon", enseigne: "Leclerc", format: "6×1,5L", prixPack: 2.49, bottlesPerPack: 6, litersPerBottle: 1.5, type: 'plate' },
  // --- Courmayeur ---
  { marque: "Courmayeur", enseigne: "Leclerc", format: "6×1,5L", prixPack: 4.39, bottlesPerPack: 6, litersPerBottle: 1.5, type: 'plate' },
  // --- Gazeuses Leclerc ---
  { marque: "Perrier", enseigne: "Leclerc", format: "6×1L", prixPack: 5.29, bottlesPerPack: 6, litersPerBottle: 1, type: 'gazeuse' },
  { marque: "Perrier", enseigne: "Leclerc", format: "1×1L", prixPack: 1.09, bottlesPerPack: 1, litersPerBottle: 1, type: 'gazeuse' },
  { marque: "Badoit", enseigne: "Leclerc", format: "6×1L", prixPack: 5.49, bottlesPerPack: 6, litersPerBottle: 1, type: 'gazeuse' },
  { marque: "Badoit", enseigne: "Leclerc", format: "1×1L", prixPack: 1.09, bottlesPerPack: 1, litersPerBottle: 1, type: 'gazeuse' },
  { marque: "San Pellegrino", enseigne: "Leclerc", format: "6×1L", prixPack: 4.89, bottlesPerPack: 6, litersPerBottle: 1, type: 'gazeuse' },
  { marque: "San Pellegrino", enseigne: "Leclerc", format: "1×1L", prixPack: 0.99, bottlesPerPack: 1, litersPerBottle: 1, type: 'gazeuse' },
  { marque: "Salvetat", enseigne: "Leclerc", format: "6×1,25L", prixPack: 3.39, bottlesPerPack: 6, litersPerBottle: 1.25, type: 'gazeuse' },
  { marque: "Salvetat", enseigne: "Leclerc", format: "1×1,25L", prixPack: 0.69, bottlesPerPack: 1, litersPerBottle: 1.25, type: 'gazeuse' },
  { marque: "Vichy Célestins", enseigne: "Leclerc", format: "6×1,25L", prixPack: 4.89, bottlesPerPack: 6, litersPerBottle: 1.25, type: 'gazeuse' },
  { marque: "St-Yorre", enseigne: "Leclerc", format: "6×1,25L", prixPack: 4.69, bottlesPerPack: 6, litersPerBottle: 1.25, type: 'gazeuse' },
  { marque: "Quézac", enseigne: "Leclerc", format: "6×1,15L", prixPack: 3.69, bottlesPerPack: 6, litersPerBottle: 1.15, type: 'gazeuse' },
  { marque: "Rozana", enseigne: "Leclerc", format: "6×1L", prixPack: 4.39, bottlesPerPack: 6, litersPerBottle: 1, type: 'gazeuse' },
  { marque: "Cristaline pétillante", enseigne: "Leclerc", format: "6×1,5L", prixPack: 1.79, bottlesPerPack: 6, litersPerBottle: 1.5, type: 'gazeuse' },

  // ================================================================
  //                       AUCHAN
  // ================================================================

  // --- MDD Auchan ---
  { marque: "Eau de montagne Auchan", enseigne: "Auchan", format: "6×1,5L", prixPack: 0.82, bottlesPerPack: 6, litersPerBottle: 1.5, type: 'plate' },
  { marque: "Eau de montagne Auchan", enseigne: "Auchan", format: "1×1,5L", prixPack: 0.16, bottlesPerPack: 1, litersPerBottle: 1.5, type: 'plate' },
  // --- Cristaline ---
  { marque: "Cristaline", enseigne: "Auchan", format: "6×1,5L", prixPack: 1.35, bottlesPerPack: 6, litersPerBottle: 1.5, type: 'plate' },
  { marque: "Cristaline", enseigne: "Auchan", format: "1×1,5L", prixPack: 0.25, bottlesPerPack: 1, litersPerBottle: 1.5, type: 'plate' },
  // --- Evian ---
  { marque: "Evian", enseigne: "Auchan", format: "6×1,5L", prixPack: 4.49, bottlesPerPack: 6, litersPerBottle: 1.5, type: 'plate' },
  { marque: "Evian", enseigne: "Auchan", format: "1×1,5L", prixPack: 0.99, bottlesPerPack: 1, litersPerBottle: 1.5, type: 'plate' },
  { marque: "Evian", enseigne: "Auchan", format: "6×1L", prixPack: 3.69, bottlesPerPack: 6, litersPerBottle: 1, type: 'plate' },
  // --- Vittel ---
  { marque: "Vittel", enseigne: "Auchan", format: "6×1,5L", prixPack: 4.05, bottlesPerPack: 6, litersPerBottle: 1.5, type: 'plate' },
  { marque: "Vittel", enseigne: "Auchan", format: "1×1,5L", prixPack: 0.85, bottlesPerPack: 1, litersPerBottle: 1.5, type: 'plate' },
  // --- Volvic ---
  { marque: "Volvic", enseigne: "Auchan", format: "6×1,5L", prixPack: 4.05, bottlesPerPack: 6, litersPerBottle: 1.5, type: 'plate' },
  { marque: "Volvic", enseigne: "Auchan", format: "1×1,5L", prixPack: 0.85, bottlesPerPack: 1, litersPerBottle: 1.5, type: 'plate' },
  // --- Contrex ---
  { marque: "Contrex", enseigne: "Auchan", format: "6×1,5L", prixPack: 4.19, bottlesPerPack: 6, litersPerBottle: 1.5, type: 'plate' },
  // --- Hépar ---
  { marque: "Hépar", enseigne: "Auchan", format: "6×1L", prixPack: 5.19, bottlesPerPack: 6, litersPerBottle: 1, type: 'plate' },
  // --- Gazeuses Auchan ---
  { marque: "Perrier", enseigne: "Auchan", format: "6×1L", prixPack: 5.59, bottlesPerPack: 6, litersPerBottle: 1, type: 'gazeuse' },
  { marque: "Badoit", enseigne: "Auchan", format: "6×1L", prixPack: 5.79, bottlesPerPack: 6, litersPerBottle: 1, type: 'gazeuse' },
  { marque: "San Pellegrino", enseigne: "Auchan", format: "6×1L", prixPack: 5.09, bottlesPerPack: 6, litersPerBottle: 1, type: 'gazeuse' },
  { marque: "Salvetat", enseigne: "Auchan", format: "6×1,25L", prixPack: 3.49, bottlesPerPack: 6, litersPerBottle: 1.25, type: 'gazeuse' },
  { marque: "Vichy Célestins", enseigne: "Auchan", format: "6×1,25L", prixPack: 5.09, bottlesPerPack: 6, litersPerBottle: 1.25, type: 'gazeuse' },
  { marque: "St-Yorre", enseigne: "Auchan", format: "6×1,25L", prixPack: 4.79, bottlesPerPack: 6, litersPerBottle: 1.25, type: 'gazeuse' },
  { marque: "Quézac", enseigne: "Auchan", format: "6×1,15L", prixPack: 3.79, bottlesPerPack: 6, litersPerBottle: 1.15, type: 'gazeuse' },
  { marque: "Cristaline pétillante", enseigne: "Auchan", format: "6×1,5L", prixPack: 1.89, bottlesPerPack: 6, litersPerBottle: 1.5, type: 'gazeuse' },
  { marque: "Eau gazeuse Auchan", enseigne: "Auchan", format: "6×1,5L", prixPack: 1.49, bottlesPerPack: 6, litersPerBottle: 1.5, type: 'gazeuse' },

  // ================================================================
  //                       INTERMARCHÉ
  // ================================================================

  // --- MDD Intermarché ---
  { marque: "Eau de source Pâturages (Intermarché)", enseigne: "Intermarché", format: "6×1,5L", prixPack: 0.99, bottlesPerPack: 6, litersPerBottle: 1.5, type: 'plate' },
  { marque: "Eau de source Pâturages (Intermarché)", enseigne: "Intermarché", format: "1×1,5L", prixPack: 0.19, bottlesPerPack: 1, litersPerBottle: 1.5, type: 'plate' },
  // --- Cristaline ---
  { marque: "Cristaline", enseigne: "Intermarché", format: "6×1,5L", prixPack: 1.29, bottlesPerPack: 6, litersPerBottle: 1.5, type: 'plate' },
  { marque: "Cristaline", enseigne: "Intermarché", format: "1×1,5L", prixPack: 0.24, bottlesPerPack: 1, litersPerBottle: 1.5, type: 'plate' },
  // --- Evian ---
  { marque: "Evian", enseigne: "Intermarché", format: "6×1,5L", prixPack: 4.39, bottlesPerPack: 6, litersPerBottle: 1.5, type: 'plate' },
  { marque: "Evian", enseigne: "Intermarché", format: "1×1,5L", prixPack: 0.95, bottlesPerPack: 1, litersPerBottle: 1.5, type: 'plate' },
  // --- Vittel ---
  { marque: "Vittel", enseigne: "Intermarché", format: "6×1,5L", prixPack: 3.95, bottlesPerPack: 6, litersPerBottle: 1.5, type: 'plate' },
  { marque: "Vittel", enseigne: "Intermarché", format: "1×1,5L", prixPack: 0.79, bottlesPerPack: 1, litersPerBottle: 1.5, type: 'plate' },
  // --- Volvic ---
  { marque: "Volvic", enseigne: "Intermarché", format: "6×1,5L", prixPack: 3.99, bottlesPerPack: 6, litersPerBottle: 1.5, type: 'plate' },
  { marque: "Volvic", enseigne: "Intermarché", format: "1×1,5L", prixPack: 0.79, bottlesPerPack: 1, litersPerBottle: 1.5, type: 'plate' },
  // --- Contrex ---
  { marque: "Contrex", enseigne: "Intermarché", format: "6×1,5L", prixPack: 4.15, bottlesPerPack: 6, litersPerBottle: 1.5, type: 'plate' },
  // --- Gazeuses Intermarché ---
  { marque: "Perrier", enseigne: "Intermarché", format: "6×1L", prixPack: 5.49, bottlesPerPack: 6, litersPerBottle: 1, type: 'gazeuse' },
  { marque: "Badoit", enseigne: "Intermarché", format: "6×1L", prixPack: 5.69, bottlesPerPack: 6, litersPerBottle: 1, type: 'gazeuse' },
  { marque: "San Pellegrino", enseigne: "Intermarché", format: "6×1L", prixPack: 4.99, bottlesPerPack: 6, litersPerBottle: 1, type: 'gazeuse' },
  { marque: "Salvetat", enseigne: "Intermarché", format: "6×1,25L", prixPack: 3.45, bottlesPerPack: 6, litersPerBottle: 1.25, type: 'gazeuse' },
  { marque: "Quézac", enseigne: "Intermarché", format: "6×1,15L", prixPack: 3.75, bottlesPerPack: 6, litersPerBottle: 1.15, type: 'gazeuse' },
  { marque: "Cristaline pétillante", enseigne: "Intermarché", format: "6×1,5L", prixPack: 1.85, bottlesPerPack: 6, litersPerBottle: 1.5, type: 'gazeuse' },

  // ================================================================
  //                       MONOPRIX
  // ================================================================

  // --- MDD Monoprix ---
  { marque: "Eau de source Monoprix", enseigne: "Monoprix", format: "6×1,5L", prixPack: 1.09, bottlesPerPack: 6, litersPerBottle: 1.5, type: 'plate' },
  { marque: "Eau de source Monoprix", enseigne: "Monoprix", format: "6×50cl", prixPack: 0.85, bottlesPerPack: 6, litersPerBottle: 0.5, type: 'plate' },
  // --- Cristaline ---
  { marque: "Cristaline", enseigne: "Monoprix", format: "6×1,5L", prixPack: 1.39, bottlesPerPack: 6, litersPerBottle: 1.5, type: 'plate' },
  { marque: "Cristaline", enseigne: "Monoprix", format: "1×1,5L", prixPack: 0.25, bottlesPerPack: 1, litersPerBottle: 1.5, type: 'plate' },
  // --- Evian ---
  { marque: "Evian", enseigne: "Monoprix", format: "6×1,5L", prixPack: 4.59, bottlesPerPack: 6, litersPerBottle: 1.5, type: 'plate' },
  { marque: "Evian", enseigne: "Monoprix", format: "6×1L", prixPack: 3.69, bottlesPerPack: 6, litersPerBottle: 1, type: 'plate' },
  { marque: "Evian", enseigne: "Monoprix", format: "6×50cl", prixPack: 3.09, bottlesPerPack: 6, litersPerBottle: 0.5, type: 'plate' },
  { marque: "Evian", enseigne: "Monoprix", format: "1×1L", prixPack: 0.79, bottlesPerPack: 1, litersPerBottle: 1, type: 'plate' },
  // --- Vittel ---
  { marque: "Vittel", enseigne: "Monoprix", format: "6×1L", prixPack: 3.29, bottlesPerPack: 6, litersPerBottle: 1, type: 'plate' },
  { marque: "Vittel", enseigne: "Monoprix", format: "1×1L", prixPack: 0.65, bottlesPerPack: 1, litersPerBottle: 1, type: 'plate' },
  // --- Volvic ---
  { marque: "Volvic", enseigne: "Monoprix", format: "6×1,5L", prixPack: 4.09, bottlesPerPack: 6, litersPerBottle: 1.5, type: 'plate' },
  { marque: "Volvic", enseigne: "Monoprix", format: "6×1L", prixPack: 3.95, bottlesPerPack: 6, litersPerBottle: 1, type: 'plate' },
  { marque: "Volvic", enseigne: "Monoprix", format: "1×1L", prixPack: 0.79, bottlesPerPack: 1, litersPerBottle: 1, type: 'plate' },
  // --- Wattwiller ---
  { marque: "Wattwiller", enseigne: "Monoprix", format: "6×1,5L", prixPack: 4.45, bottlesPerPack: 6, litersPerBottle: 1.5, type: 'plate' },
  { marque: "Wattwiller", enseigne: "Monoprix", format: "1×1,5L", prixPack: 0.95, bottlesPerPack: 1, litersPerBottle: 1.5, type: 'plate' },
  // --- Gazeuses Monoprix ---
  { marque: "Perrier", enseigne: "Monoprix", format: "6×1L", prixPack: 5.69, bottlesPerPack: 6, litersPerBottle: 1, type: 'gazeuse' },
  { marque: "Badoit", enseigne: "Monoprix", format: "6×1L", prixPack: 5.89, bottlesPerPack: 6, litersPerBottle: 1, type: 'gazeuse' },
  { marque: "Badoit", enseigne: "Monoprix", format: "6×50cl", prixPack: 3.85, bottlesPerPack: 6, litersPerBottle: 0.5, type: 'gazeuse' },
  { marque: "San Pellegrino", enseigne: "Monoprix", format: "6×1L", prixPack: 5.19, bottlesPerPack: 6, litersPerBottle: 1, type: 'gazeuse' },
  { marque: "Cristaline pétillante", enseigne: "Monoprix", format: "6×1,5L", prixPack: 2.00, bottlesPerPack: 6, litersPerBottle: 1.5, type: 'gazeuse' },

  // ================================================================
  //                       SYSTÈME U
  // ================================================================

  // --- MDD Système U ---
  { marque: "Eau de source U (Système U)", enseigne: "Système U", format: "6×1,5L", prixPack: 0.89, bottlesPerPack: 6, litersPerBottle: 1.5, type: 'plate' },
  { marque: "Eau de source U (Système U)", enseigne: "Système U", format: "1×1,5L", prixPack: 0.18, bottlesPerPack: 1, litersPerBottle: 1.5, type: 'plate' },
  // --- Cristaline ---
  { marque: "Cristaline", enseigne: "Système U", format: "6×1,5L", prixPack: 1.35, bottlesPerPack: 6, litersPerBottle: 1.5, type: 'plate' },
  // --- Evian ---
  { marque: "Evian", enseigne: "Système U", format: "6×1,5L", prixPack: 4.45, bottlesPerPack: 6, litersPerBottle: 1.5, type: 'plate' },
  { marque: "Evian", enseigne: "Système U", format: "6×1L", prixPack: 3.59, bottlesPerPack: 6, litersPerBottle: 1, type: 'plate' },
  // --- Vittel ---
  { marque: "Vittel", enseigne: "Système U", format: "6×1,5L", prixPack: 3.99, bottlesPerPack: 6, litersPerBottle: 1.5, type: 'plate' },
  // --- Volvic ---
  { marque: "Volvic", enseigne: "Système U", format: "6×1,5L", prixPack: 4.05, bottlesPerPack: 6, litersPerBottle: 1.5, type: 'plate' },
  // --- Gazeuses Système U ---
  { marque: "Perrier", enseigne: "Système U", format: "6×1L", prixPack: 5.59, bottlesPerPack: 6, litersPerBottle: 1, type: 'gazeuse' },
  { marque: "Badoit", enseigne: "Système U", format: "6×1L", prixPack: 5.75, bottlesPerPack: 6, litersPerBottle: 1, type: 'gazeuse' },
  { marque: "San Pellegrino", enseigne: "Système U", format: "6×1L", prixPack: 5.09, bottlesPerPack: 6, litersPerBottle: 1, type: 'gazeuse' },
  { marque: "Salvetat", enseigne: "Système U", format: "6×1,25L", prixPack: 3.55, bottlesPerPack: 6, litersPerBottle: 1.25, type: 'gazeuse' },

  // ================================================================
  //                       CASINO / FRANPRIX
  // ================================================================

  // --- MDD Casino ---
  { marque: "Eau de source Casino", enseigne: "Casino", format: "6×1,5L", prixPack: 0.95, bottlesPerPack: 6, litersPerBottle: 1.5, type: 'plate' },
  // --- Cristaline ---
  { marque: "Cristaline", enseigne: "Casino", format: "6×1,5L", prixPack: 1.39, bottlesPerPack: 6, litersPerBottle: 1.5, type: 'plate' },
  // --- Evian ---
  { marque: "Evian", enseigne: "Casino", format: "6×1,5L", prixPack: 4.55, bottlesPerPack: 6, litersPerBottle: 1.5, type: 'plate' },
  // --- Vittel ---
  { marque: "Vittel", enseigne: "Casino", format: "6×1,5L", prixPack: 4.09, bottlesPerPack: 6, litersPerBottle: 1.5, type: 'plate' },
  // --- Volvic ---
  { marque: "Volvic", enseigne: "Casino", format: "6×1,5L", prixPack: 4.15, bottlesPerPack: 6, litersPerBottle: 1.5, type: 'plate' },
  // --- Gazeuses Casino ---
  { marque: "Perrier", enseigne: "Casino", format: "6×1L", prixPack: 5.79, bottlesPerPack: 6, litersPerBottle: 1, type: 'gazeuse' },
  { marque: "Badoit", enseigne: "Casino", format: "6×1L", prixPack: 5.89, bottlesPerPack: 6, litersPerBottle: 1, type: 'gazeuse' },

  // ================================================================
  //                       LIDL
  // ================================================================

  // --- MDD Lidl ---
  { marque: "Eau de source Saskia (Lidl)", enseigne: "Lidl", format: "6×1,5L", prixPack: 0.69, bottlesPerPack: 6, litersPerBottle: 1.5, type: 'plate' },
  { marque: "Eau de source Saskia (Lidl)", enseigne: "Lidl", format: "1×1,5L", prixPack: 0.13, bottlesPerPack: 1, litersPerBottle: 1.5, type: 'plate' },
  // --- Evian ---
  { marque: "Evian", enseigne: "Lidl", format: "6×1,5L", prixPack: 4.39, bottlesPerPack: 6, litersPerBottle: 1.5, type: 'plate' },
  // --- Volvic ---
  { marque: "Volvic", enseigne: "Lidl", format: "6×1,5L", prixPack: 3.99, bottlesPerPack: 6, litersPerBottle: 1.5, type: 'plate' },
  // --- Gazeuses Lidl ---
  { marque: "Eau gazeuse Saskia (Lidl)", enseigne: "Lidl", format: "6×1,5L", prixPack: 1.29, bottlesPerPack: 6, litersPerBottle: 1.5, type: 'gazeuse' },

  // ================================================================
  //                       ALDI
  // ================================================================

  // --- MDD Aldi ---
  { marque: "Eau de source Fontaine Jolive (Aldi)", enseigne: "Aldi", format: "6×1,5L", prixPack: 0.72, bottlesPerPack: 6, litersPerBottle: 1.5, type: 'plate' },
  { marque: "Eau de source Fontaine Jolive (Aldi)", enseigne: "Aldi", format: "1×1,5L", prixPack: 0.14, bottlesPerPack: 1, litersPerBottle: 1.5, type: 'plate' },
  // --- Evian ---
  { marque: "Evian", enseigne: "Aldi", format: "6×1,5L", prixPack: 4.35, bottlesPerPack: 6, litersPerBottle: 1.5, type: 'plate' },
  // --- Gazeuses Aldi ---
  { marque: "Eau gazeuse Fontaine Jolive (Aldi)", enseigne: "Aldi", format: "6×1,5L", prixPack: 1.35, bottlesPerPack: 6, litersPerBottle: 1.5, type: 'gazeuse' },
];

// ==================== FONCTIONS D'AGRÉGATION ====================

/** Retourne toutes les marques uniques pour un type d'eau */
export function getUniqueMarques(waterType: WaterType): string[] {
  const marques = new Set<string>();
  waterDatabase
    .filter(p => p.type === waterType)
    .forEach(p => marques.add(p.marque));
  return Array.from(marques).sort();
}

/** Retourne les formats agrégés (prix moyen, min, max, enseignes) pour une marque */
export function getFormatsForMarque(marque: string): AggregatedWater[] {
  const formatMap = new Map<string, WaterProduct[]>();

  waterDatabase
    .filter(p => p.marque === marque)
    .forEach(p => {
      if (!formatMap.has(p.format)) formatMap.set(p.format, []);
      formatMap.get(p.format)!.push(p);
    });

  const aggregated: AggregatedWater[] = [];
  formatMap.forEach((products, format) => {
    const prices = products.map(p => p.prixPack);
    const avgPrix = prices.reduce((sum, p) => sum + p, 0) / prices.length;
    aggregated.push({
      marque: products[0].marque,
      format,
      prixMoyen: Math.round(avgPrix * 100) / 100,
      prixMin: Math.min(...prices),
      prixMax: Math.max(...prices),
      bottlesPerPack: products[0].bottlesPerPack,
      litersPerBottle: products[0].litersPerBottle,
      type: products[0].type,
      enseignes: products.map(p => p.enseigne)
    });
  });

  return aggregated;
}

/** Retourne la liste plate pour le ConversionTunnel (format simplifié) */
export function getWaterListForTunnel(): { brand: string; format: string; packPrice: number; pricePerLiter: number; type: 'still' | 'sparkling' }[] {
  // Agréger toutes les marques+formats en moyenne
  const key = (p: WaterProduct) => `${p.marque}|${p.format}`;
  const map = new Map<string, WaterProduct[]>();

  waterDatabase.forEach(p => {
    const k = key(p);
    if (!map.has(k)) map.set(k, []);
    map.get(k)!.push(p);
  });

  const result: { brand: string; format: string; packPrice: number; pricePerLiter: number; type: 'still' | 'sparkling' }[] = [];
  map.forEach((products) => {
    const avgPrice = products.reduce((s, p) => s + p.prixPack, 0) / products.length;
    const totalLiters = products[0].bottlesPerPack * products[0].litersPerBottle;
    const pricePerLiter = totalLiters > 0 ? avgPrice / totalLiters : 0;
    result.push({
      brand: products[0].marque,
      format: products[0].format,
      packPrice: Math.round(avgPrice * 100) / 100,
      pricePerLiter: Math.round(pricePerLiter * 100) / 100,
      type: products[0].type === 'plate' ? 'still' : 'sparkling'
    });
  });

  return result.sort((a, b) => a.packPrice - b.packPrice);
}

/** Microplastiques adaptés au volume (240 000 particules par litre - étude PNAS 2024) */
export function getMicroplasticsPerBottle(litersPerBottle: number): number {
  return Math.round(240000 * litersPerBottle);
}
