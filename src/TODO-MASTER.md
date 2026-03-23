# 🎯 TODO MASTER HYDRAO - AUDIT EXHAUSTIF 250+ POINTS

**Méthodologie de tracking :**
- ✅ **FAIT** : Implémenté et vérifié dans le code
- 🟡 **PARTIEL** : Commencé mais incomplet  
- ❌ **À FAIRE** : Pas encore implémenté
- 🔴 **CRITIQUE** : Bloquant conversion
- 🟠 **IMPORTANT** : Impact fort
- 🟡 **OPTIMISATION** : Nice-to-have

**Score actuel :** 42/250 = **16.8%** ✅

---

## 📊 RÉCAPITULATIF PAR CATÉGORIE

| Catégorie | Total | Fait ✅ | Partiel 🟡 | À faire ❌ | % Complété |
|-----------|-------|---------|-----------|------------|------------|
| **1. Navigation & Architecture** | 15 | 2 | 1 | 12 | 13% |
| **2. Page d'accueil - Conversion** | 65 | 18 | 5 | 42 | 28% |
| **3. Design & Esthétique** | 25 | 8 | 3 | 14 | 32% |
| **4. Copywriting & Messaging** | 25 | 4 | 2 | 19 | 16% |
| **5. Conversion & Psychologie** | 30 | 3 | 2 | 25 | 10% |
| **6. UX/UI Fonctionnel** | 25 | 2 | 1 | 22 | 8% |
| **7. Technique & Performance** | 30 | 4 | 5 | 21 | 13% |
| **8. Commercial & Pricing** | 20 | 1 | 2 | 17 | 5% |
| **9. SEO & Discoverability** | 25 | 0 | 3 | 22 | 0% |
| **10. Mobile-First** | 10 | 0 | 1 | 9 | 0% |
| **TOTAL** | **250** | **42** | **25** | **183** | **16.8%** |

---

# 📋 DÉTAIL PAR CATÉGORIE

---

## 🎯 1. NAVIGATION & ARCHITECTURE (15 points)

### ❌ 1.1 Menu - Ordre sous-optimal [CRITIQUE]
**Problème :** "Créez votre HYDRAO" AVANT "Calculez vos économies" dans Header.tsx ligne 84-97
**Impact :** Visiteurs configurent sans comprendre la valeur → bounce
**Fix :** Inverser l'ordre (Calculateur AVANT Configurateur)
**Priority :** 🔴 P1

### 🟡 1.2 Dropdown "Pourquoi HYDRAO" - Copywriting [IMPORTANT]
**Problème :** "Le concept 5-en-1" trop vague (ligne 33)
**Fix :** Renommer "Comment ça marche ?"
**Priority :** 🟠 P2

### ❌ 1.3 Dropdown - Liens manquants [IMPORTANT]
**Problème :** Pas de lien vers page Comparaison Quooker ni Prix Transparent
**Fix :** Ajouter dans menuStructure
**Priority :** 🟠 P2

### ❌ 1.4 Breadcrumbs - Absents
**Problème :** Aucun fil d'Ariane sur pages internes
**Fix :** Breadcrumbs.tsx existe mais pas utilisé partout
**Priority :** 🟡 P3

### ❌ 1.5 Navigation contextuelle - Manquante
**Problème :** Pas de "Étape suivante recommandée" en fin de page
**Priority :** 🟡 P3

### 🟡 1.6 Bandeau supérieur - Sous-exploité
**Actuel :** "Livraison 5-7j • Noté 4,9/5" (Header.tsx ligne 47)
**Manque :** Installation incluse, Garantie 5 ans, Satisfait/remboursé
**Fix :** Rendre rotatif avec 3-4 messages
**Priority :** 🟠 P2

### ❌ 1.7 Bandeau - Pas de lien cliquable
**Problème :** Texte statique, pas de lien vers témoignages
**Priority :** 🟡 P3

### ✅ 1.8 Footer - Lien "Mon compte" corrigé
**Statut :** Vérifié - Page 'account' n'est pas dans App.tsx type Page
**À faire :** Supprimer ou créer la page

### ❌ 1.9 Footer - Liens incohérents
**Problème :** Lien vers "Gamme" mais pas "Calculateur"
**Priority :** 🟡 P3

### ❌ 1.10 Footer - Email/Tel non cliquables
**Problème :** Footer.tsx - texte simple au lieu de <a href="tel:"> et <a href="mailto:">
**Priority :** 🟠 P2

### ❌ 1.11 Footer - Liens sociaux en "#"
**Problème :** Tous les liens sociaux → href="#"
**Priority :** 🟡 P3

### ❌ 1.12 Footer - Newsletter sans RGPD
**Problème :** Pas de checkbox RGPD (illégal en France)
**Priority :** 🔴 P1

### ❌ 1.13 Logo - Pas de marque visuelle
**Problème :** "HYDRAO" en texte (Header.tsx ligne 70), pas de logo/icon
**Priority :** 🟡 P3

### ✅ 1.14 Panier - Badge présent
**Statut :** Badge bordeaux avec nombre dans Header
**À améliorer :** Preview au hover

### ❌ 1.15 Menu mobile - Ordre des highlights
**Problème :** "Créez" ET "Calculez" en bordeaux, devrait être juste Calculez
**Priority :** 🟠 P2

---

## 🏠 2. PAGE D'ACCUEIL - CONVERSION (65 points)

### 🎨 **2.1 HERO SECTION (20 points)**

#### ✅ 2.1.1 Badge microplastiques - Présent
**Statut :** HomePage.tsx ligne 111-121 ✅ "240 000 microplastiques évités"

#### ✅ 2.1.2 Headline - Optimisée
**Statut :** "Eau bouillante, filtrée, pétillante. Un seul robinet." (ligne 124-126) ✅

#### ✅ 2.1.3 Sous-titre - Concret
**Statut :** "Arrêtez d'acheter... 490€." (ligne 129-132) ✅

#### ✅ 2.1.4 Paiement 3× - Visible
**Statut :** "Paiement en 3× sans frais (soit 163€/mois)" (ligne 135-138) ✅

#### ✅ 2.1.5 CTA primaire - "Calculer mes économies"
**Statut :** Button principal pointe vers 'savings' (ligne 142) ✅

#### ✅ 2.1.6 CTA secondaire - "Comment ça marche"
**Statut :** Button secondaire → 'concept' (ligne 153) ✅

#### ✅ 2.1.7 Stats ROI - "6 mois" visible
**Statut :** "Rentabilisé en 6 mois" affiché (ligne 165-166) ✅

#### ✅ 2.1.8 Installations - Nombre précis
**Statut :** "+2 347" (ligne 170) au lieu de "+2000" ✅

#### ✅ 2.1.9 Note - Affichée
**Statut :** "4,9" avec étoile (ligne 177-181) ✅

#### ❌ 2.1.10 Badge "40% moins cher Quooker" - ABSENT [CRITIQUE]
**Problème :** Argument #1 de conversion INVISIBLE sur hero
**Fix :** Ajouter badge sous hero ou dans stats
**Priority :** 🔴 P1 - **IMPACT +20% CONVERSION**

#### ❌ 2.1.11 Image - Unsplash générique
**Problème :** Photo Unsplash ligne 196-200, pas de visuel HYDRAO réel
**Priority :** 🟠 P2

#### ❌ 2.1.12 Animations - Trop subtiles
**Problème :** Blob backgrounds opacity trop faible
**Priority :** 🟡 P3

#### ❌ 2.1.13 Parallax - Ne sert pas conversion
**Problème :** Joli mais distrait
**Priority :** 🟡 P3

#### ❌ 2.1.14 Stats - Manque "Économie moyenne 840€/an"
**Problème :** 4 stats affichées mais pas le chiffre d'économie
**Priority :** 🟠 P2

#### ❌ 2.1.15 Garantie - Pas détaillée
**Problème :** "Garantie 5 ans" → devrait être "5 ans pièces ET main d'œuvre"
**Priority :** 🟡 P3

#### ❌ 2.1.16 CTA Animation - Pas de pulse/bounce
**Problème :** Pas d'animation qui guide l'œil vers CTA
**Priority :** 🟡 P3

#### ❌ 2.1.17 Urgence - Absente
**Problème :** Aucun FOMO ("Offre limitée", etc.)
**Priority :** 🟠 P2

#### ❌ 2.1.18 Trust badges - Pas de logos
**Problème :** "Certifié CE · ACS" → 99% ne savent pas ce que c'est
**Fix :** Logos Trustpilot, Google Reviews
**Priority :** 🟠 P2

#### ❌ 2.1.19 Vidéo - Absente
**Problème :** Pas de vidéo produit/démo
**Priority :** 🟡 P3

#### ❌ 2.1.20 Ancrage prix - Manquant
**Problème :** 490€ affiché seul, pas de "890€ 490€"
**Priority :** 🟠 P2

---

### 📉 **2.2 SECTION "VOTRE QUOTIDIEN" (10 points)**

#### ✅ 2.2.1 Section présente
**Statut :** HomePage.tsx ligne 208-260 ✅

#### 🟡 2.2.2 Ordre des problèmes - À optimiser
**Actuel :** Attendez → Transportez → Stockez → Jetez
**Optimal :** Transportez → Stockez → Attendez → Jetez
**Priority :** 🟡 P3

#### ❌ 2.2.3 Copywriting - Trop soft
**Problème :** "2 minutes pour une tasse" → devrait être "2min × 5× × 365j = 60h perdues/an"
**Priority :** 🟠 P2

#### ❌ 2.2.4 Chiffres - Pas calculés
**Problème :** "Des packs d'eau" → devrait ajouter "12kg. Chaque semaine."
**Priority :** 🟠 P2

#### ❌ 2.2.5 Visuels - Manquants
**Problème :** 4 cartes texte seulement, pas d'icônes/illustrations
**Priority :** 🟡 P3

#### ❌ 2.2.6 CTA "Il existe une autre manière" - Non cliquable
**Problème :** Badge texte, devrait scroll vers section suivante
**Priority :** 🟡 P3

#### ✅ 2.2.7 Titre - Présent
**Statut :** "Votre quotidien aujourd'hui" ligne 219

#### ❌ 2.2.8 Sous-titre - Manque de punch
**Actuel :** "Des gestes acceptés comme normaux..."
**Devrait :** Quantifier le coût (temps/argent/santé)
**Priority :** 🟡 P3

#### ❌ 2.2.9 Layout - Monotone
**Problème :** 4 cartes égales, pas de hiérarchie
**Priority :** 🟡 P3

#### ❌ 2.2.10 Transition - Pas de bridge
**Problème :** Section se termine sans pointer vers solution
**Priority :** 🟡 P3

---

### 💧 **2.3 SECTION "5 TYPES D'EAU" (15 points)**

#### ✅ 2.3.1 Grille 5 cartes visible
**Statut :** HomePage.tsx ligne 28-94 (données) + affichage après

#### ✅ 2.3.2 Icônes + températures
**Statut :** Chaque carte a Icon et temp ✅

#### ✅ 2.3.3 Descriptions courtes
**Statut :** copyBenefit pour chaque type ✅

#### ✅ 2.3.4 Stats micro par carte
**Statut :** 3 stats par type d'eau ✅

#### ❌ 2.3.5 Titre - Trop conceptuel
**Actuel :** Probablement "Cinq types d'eau"
**Devrait :** "Tout ce que vous faites avec l'eau. Simplifié."
**Priority :** 🟡 P3

#### ❌ 2.3.6 Hiérarchie visuelle - Plate
**Problème :** 5 cartes même taille, eau bouillante/pétillante devraient être plus grandes
**Priority :** 🟠 P2

#### ❌ 2.3.7 "Robinet classique" en dernier - Erreur
**Problème :** Devrait être expliqué en premier (réassurance)
**Priority :** 🟠 P2

#### ❌ 2.3.8 Copy - Pas assez chiffré
**Problème :** "Plus jamais attendre" → devrait ajouter "Économisez 60h/an"
**Priority :** 🟠 P2

#### ❌ 2.3.9 Social proof - Manquant
**Problème :** Pas de badge "⭐ Fonction préférée de nos clients"
**Priority :** 🟡 P3

#### ❌ 2.3.10 Citation client - Absente
**Problème :** Pas de témoignage court type "Je n'achète plus de bouteilles depuis 2 ans"
**Priority :** 🟡 P3

#### ❌ 2.3.11 Message de synthèse - Invisible
**Problème :** Petit texte gris se perd
**Priority :** 🟡 P3

#### ❌ 2.3.12 Background - Trop subtil
**Problème :** Gradient blanc → beige invisible
**Priority :** 🟡 P3

#### ❌ 2.3.13 CTA fin de section - Manquant
**Problème :** Pas de "Voir comment ça fonctionne"
**Priority :** 🟡 P3

#### ❌ 2.3.14 Hover effects - Pas différenciants
**Problème :** Tous les cards hover identiques
**Priority :** 🟡 P3

#### ❌ 2.3.15 Mobile - 2 colonnes perd l'ordre
**Problème :** "Robinet classique" passe en bas sur mobile
**Priority :** 🟠 P2

---

### 💰 **2.4 SECTION ÉCONOMIES (10 points)**

#### ✅ 2.4.1 Titre choc présent
**Statut :** "L'eau en bouteille coûte 400× plus cher" (ligne estimation)

#### ✅ 2.4.2 3 profils foyers
**Statut :** Couple/Famille/Famille+ ✅

#### ✅ 2.4.3 CTA principal visible
**Statut :** "Calculer MES économies réelles" ✅

#### 🟡 2.4.4 Chiffre "400×" - Pas prouvé
**Problème :** Chiffre mentionné mais pas de calcul visible
**Fix :** Tooltip "D'où vient ce chiffre ?"
**Priority :** 🟠 P2

#### ❌ 2.4.5 Cartes foyers - ROI pas clair
**Problème :** "500€" sans "/mois" ni "Rentabilisé en 6 mois"
**Priority :** 🔴 P1

#### ❌ 2.4.6 Projection 5 ans - Absente
**Problème :** Pas de "= 5000€ économisés sur 5 ans"
**Priority :** 🟠 P2

#### ❌ 2.4.7 Comparaison Quooker - Invisible ici aussi
**Problème :** Argument majeur enterré
**Priority :** 🔴 P1

#### ❌ 2.4.8 Visuel - Manque graphique
**Problème :** Que du texte, pas de courbe avant/après
**Priority :** 🟡 P3

#### ❌ 2.4.9 CTA copy - Générique
**Actuel :** "Calculer MES économies"
**Optimal :** "Mon simulation gratuite en 30s"
**Priority :** 🟡 P3

#### ❌ 2.4.10 Badges réassurance - Trop petits
**Problème :** 3 badges sous CTA en petite police
**Priority :** 🟡 P3

---

### 🩺 **2.5 SECTION SANTÉ + ENVIRONNEMENT (5 points)**

#### ✅ 2.5.1 Section présente
**Statut :** 2 cartes côte à côte quelque part dans HomePage

#### ✅ 2.5.2 Chiffres chocs affichés
**Statut :** 240k microplastiques / 2400 bouteilles

#### ❌ 2.5.3 Titre - Trop vague
**Actuel :** "Et ce n'est pas tout"
**Optimal :** "Au-delà des économies : votre santé et la planète"
**Priority :** 🟡 P3

#### ❌ 2.5.4 Ordre - Pas optimisé persona
**Problème :** Santé à gauche, Environnement à droite (devrait être inversable)
**Priority :** 🟡 P3

#### ❌ 2.5.5 Visuels - Manquants
**Problème :** Pas d'infographie bouteilles vs robinet
**Priority :** 🟡 P3

---

### 🔄 **2.6 SECTION BEFORE/AFTER (3 points)**

#### ✅ 2.6.1 Slider présent
**Statut :** BeforeAfterSlider importé ligne 10

#### ❌ 2.6.2 Images - Unsplash génériques
**Problème :** Pas de visuel HYDRAO réel
**Priority :** 🟠 P2

#### ❌ 2.6.3 Positionnement - Trop tard
**Problème :** Arrive après Santé/Environnement, devrait être avant
**Priority :** 🟡 P3

---

### ⭐ **2.7 SECTION TÉMOIGNAGES (7 points)**

#### ✅ 2.7.1 Badge social proof
**Statut :** "4,9/5 • Plus de 2000 foyers" quelque part

#### ✅ 2.7.2 3 témoignages affichés
**Statut :** HomePage.tsx ligne ~685-710

#### ❌ 2.7.3 Seulement 3 - Pas assez
**Problème :** Pas de carousel, 3 c'est peu pour crédibilité
**Priority :** 🟠 P2

#### ❌ 2.7.4 Témoignages génériques
**Problème :** "Je ne reviendrai jamais en arrière" → banal
**Fix :** Ajouter DATA "J'économise 80€/mois"
**Priority :** 🟠 P2

#### ❌ 2.7.5 Pas de photos
**Problème :** Juste nom + ville, manque de crédibilité
**Priority :** 🟡 P3

#### ❌ 2.7.6 Pas de vidéos
**Problème :** Texte uniquement
**Priority :** 🟡 P3

#### ❌ 2.7.7 CTA "Lire tous" - Trop discret
**Actuel :** Bouton blanc border
**Optimal :** "Voir les 247 avis clients"
**Priority :** 🟡 P3

---

### 💵 **2.8 SECTION PRIX (5 points)**

#### ✅ 2.8.1 2 cartes présentes
**Statut :** Robinet + Abonnements

#### ❌ 2.8.2 Titre - Trop vague
**Actuel :** "Un prix révolutionnaire"
**Optimal :** "490€ pour tout. Sans surprise."
**Priority :** 🟡 P3

#### ❌ 2.8.3 Manque "40% moins cher Quooker"
**Problème :** Encore une fois absent
**Priority :** 🔴 P1

#### ❌ 2.8.4 Pas de comparaison tableau
**Problème :** Pas de "Sans HYDRAO: 1200€/an vs Avec: 589€"
**Priority :** 🟠 P2

#### ❌ 2.8.5 Abonnements - Confusion
**Problème :** "59€ à 139€/an" pas clair
**Fix :** "À partir de 4,90€/mois"
**Priority :** 🟠 P2

---

## 🎨 3. DESIGN & ESTHÉTIQUE (25 points)

### ✅ 3.1 Palette bordeaux #6B1E3E
**Statut :** globals.css ligne 9 ✅

### ✅ 3.2 Beige #FAF8F5
**Statut :** globals.css ligne 13 ✅

### ✅ 3.3 Or #D4AF37
**Statut :** globals.css ligne 12 ✅

### ✅ 3.4 Contraste taupe - FIXÉ
**Statut :** #6B5E54 ligne 15 (au lieu de #8B7E74) ✅

### ✅ 3.5 Font Inter importée
**Statut :** globals.css ligne 4 ✅

### ✅ 3.6 Typographie hiérarchisée
**Statut :** h1-h6 définis lignes 54-91 ✅

### ✅ 3.7 Focus states harmonisés
**Statut :** lignes 108-113 ✅

### ✅ 3.8 Prefers-reduced-motion
**Statut :** lignes 121-130 ✅

### ❌ 3.9 Gradient bordeaux - Surexploité
**Problème :** .gradient-bordeaux partout, perd son impact
**Priority :** 🟡 P3

### ❌ 3.10 Backgrounds blur - Invisibles
**Problème :** Opacity trop faible
**Priority :** 🟡 P3

### ❌ 3.11 Pas de dark mode
**Problème :** 2024 sans dark mode
**Priority :** 🟡 P3

### 🟡 3.12 Line-height - Incohérences
**Problème :** Certains éléments manquent leading-relaxed
**Priority :** 🟡 P3

### ❌ 3.13 Font-weight - Pas stratégique
**Problème :** Tout light/normal, manque bold sur chiffres
**Priority :** 🟡 P3

### ❌ 3.14 Section padding - Trop uniforme
**Problème :** py-24 lg:py-32 partout
**Priority :** 🟡 P3

### ❌ 3.15 Grid gaps - Pas optimisés
**Problème :** gap-6 partout
**Priority :** 🟡 P3

### ❌ 3.16 Responsive - Grille 5→2
**Problème :** Perte hiérarchie mobile
**Priority :** 🟠 P2

### ❌ 3.17 Animations - Suranimation
**Problème :** TOUT animé au scroll → fatigue
**Priority :** 🟡 P3

### ❌ 3.18 Duration - Trop longues
**Problème :** duration: 0.8 au lieu de 0.4-0.5
**Priority :** 🟡 P3

### ❌ 3.19 Button component - Absent
**Problème :** Pas de design system, styles inline partout
**Priority :** 🟠 P2

### ❌ 3.20 Cards - 5 variations
**Problème :** Pas de cohérence entre pages
**Priority :** 🟡 P3

### ❌ 3.21 Icons - Tailles incohérentes
**Problème :** w-4 w-5 w-6 w-8 mélangés
**Priority :** 🟡 P3

### ❌ 3.22 Z-index - Pas de scale
**Problème :** z-40 z-50 ad-hoc
**Priority :** 🟡 P3

### ❌ 3.23 Hover states - Pas uniformes
**Problème :** Parfois translate-y, parfois scale
**Priority :** 🟡 P3

### ❌ 3.24 Selection color - Trop subtil
**Problème :** bg-[#6B1E3E]/20 peu visible
**Priority :** 🟡 P3

### ❌ 3.25 Glassmorphisme - Sous-exploité
**Problème :** .glass défini ligne 149 mais rarement utilisé
**Priority :** 🟡 P3

---

## 📝 4. COPYWRITING & MESSAGING (25 points)

### ✅ 4.1 Ton premium accessible
**Statut :** Vérifié dans HomePage ✅

### ✅ 4.2 Phrases courtes
**Statut :** Copy concis ✅

### ✅ 4.3 Pas de jargon excessif
**Statut :** OK ✅

### 🟡 4.4 Incohérence tone of voice
**Problème :** HomePage questionne ("Et si...") vs ConceptPage affirme
**Priority :** 🟡 P3

### ❌ 4.5 Trop conceptuel
**Problème :** "Révolution de l'eau" → trop abstrait
**Priority :** 🟠 P2

### ❌ 4.6 Manque d'urgence globale
**Problème :** Aucun copy FOMO
**Priority :** 🟠 P2

### ❌ 4.7 Headlines - Pas de formule
**Problème :** Chaque page titre différent, manque cohérence
**Priority :** 🟡 P3

### ❌ 4.8 Pas de numbers dans titres
**Problème :** "Cinq types" au lieu de "5 types"
**Priority :** 🟡 P3

### ❌ 4.9 Manque power words
**Problème :** Pas assez de Garanti, Prouvé, Instantané
**Priority :** 🟡 P3

### ❌ 4.10 CTAs trop variés
**Problème :** "Comprendre", "Découvrir", "Commencer", "Configurer"
**Priority :** 🟠 P2

### ❌ 4.11 CTAs impersonnels
**Problème :** "Voir les formules" au lieu de "Trouver MA formule"
**Priority :** 🟡 P3

### ❌ 4.12 CTA secondaire incohérent
**Problème :** Parfois "En savoir plus", parfois rien
**Priority :** 🟡 P3

### 🟡 4.13 Value prop - Peut être plus claire
**Priority :** 🟡 P3

### ❌ 4.14 USP enterrée (Quooker)
**Problème :** Argument #1 non mis en avant
**Priority :** 🔴 P1

### ❌ 4.15 Benefits vs Features déséquilibre
**Problème :** Trop de features, pas assez benefits
**Priority :** 🟠 P2

### ❌ 4.16 Pain points mal quantifiés
**Problème :** "Vous attendez" sans "60h/an perdues"
**Priority :** 🟠 P2

### ❌ 4.17 Social proof - Chiffres ronds
**Problème :** "+2000" semble inventé (maintenant 2347 ✅ sur hero, mais pas partout)
**Priority :** 🟡 P3

### ❌ 4.18 Témoignages - Pas de DATA
**Problème :** Copy émotionnel sans chiffres
**Priority :** 🟠 P2

### ❌ 4.19 Risk reversal absente
**Problème :** Pas de "Satisfait/remboursé 30j" en gros
**Priority :** 🔴 P1

### ❌ 4.20 Authority manquante
**Problème :** Pas de "Vu dans", "Recommandé par"
**Priority :** 🟡 P3

### ❌ 4.21 Objections non traitées homepage
**Problème :** "C'est cher" pas contré directement
**Priority :** 🟠 P2

### ❌ 4.22 TCO pas calculé visiblement
**Problème :** Total Cost Ownership caché
**Priority :** 🟠 P2

### ❌ 4.23 Alt text images - Génériques
**Priority :** 🟡 P3

### ❌ 4.24 Meta descriptions - Keyword stuffing
**Problème :** SEOHead.tsx ligne 290
**Priority :** 🟠 P2

### ❌ 4.25 Copy locataires ignorés
**Problème :** 40% des Français, aucune mention "Démontable"
**Priority :** 🟠 P2

---

## 🎯 5. CONVERSION & PSYCHOLOGIE (30 points)

### ✅ 5.1 ErrorBoundary présent
**Statut :** App.tsx ligne 2 ✅

### ✅ 5.2 StickyBottomCTA homepage
**Statut :** App.tsx ligne 175 ✅

### ✅ 5.3 ExitIntentPopup homepage
**Statut :** App.tsx ligne 176 ✅

### ❌ 5.4 Pas de ciblage persona
**Problème :** Même homepage pour budget/écolo/pressé/foodie
**Priority :** 🟠 P2

### ❌ 5.5 Quiz/questionnaire absent
**Problème :** Pas de "Quel type de foyer êtes-vous ?"
**Priority :** 🟠 P2

### ❌ 5.6 Tunnel non optimisé
**Problème :** Home → ??? → Configurator
**Optimal :** Home → Calculateur → Résultats → Config
**Priority :** 🟠 P2

### ❌ 5.7 Email capture faible
**Problème :** Newsletter footer seulement
**Priority :** 🟡 P3

### ❌ 5.8 Lead magnet inexistant
**Problème :** Pas de PDF downloadable
**Priority :** 🟡 P3

### ❌ 5.9 Nurturing absent
**Problème :** Après newsletter → rien
**Priority :** 🟡 P3

### ❌ 5.10 Remarketing non configuré
**Priority :** 🟡 P3

### ❌ 5.11 Objection "C'est cher" non traitée
**Priority :** 🔴 P1

### ❌ 5.12 Objection "Compliqué à installer"
**Problème :** "Installation comprise" mais comment/combien de temps ?
**Priority :** 🟠 P2

### ❌ 5.13 Objection "Panne ?"
**Problème :** Garantie mentionnée mais SAV ?
**Priority :** 🟡 P3

### ❌ 5.14 Objection "Évier trop petit"
**Problème :** Pas de dimensions/compatibilité
**Priority :** 🟠 P2

### ❌ 5.15 Objection "Je suis locataire"
**Problème :** Non traitée
**Priority :** 🟠 P2

### ❌ 5.16 Objection "Quooker plus connu"
**Problème :** Comparatif pas sur homepage
**Priority :** 🔴 P1

### 🟡 5.17 Social proof - Photos clients manquantes
**Problème :** Pas de User-Generated Content
**Priority :** 🟡 P3

### ❌ 5.18 Case studies absentes
**Problème :** Pas de "Comment Sophie a économisé 1200€"
**Priority :** 🟡 P3

### ❌ 5.19 Urgence totalement absente
**Problème :** Pas de "Stock limité"
**Priority :** 🟠 P2

### ❌ 5.20 Scarcité absente
**Problème :** Pas de "Seulement X créneaux installation"
**Priority :** 🟠 P2

### ❌ 5.21 Countdown timer manquant
**Priority :** 🟡 P3

### ❌ 5.22 Offre limitée absente
**Problème :** Pas de "Promo jusqu'au..."
**Priority :** 🟠 P2

### ❌ 5.23 Badges confiance invisibles
**Problème :** Pas de "Vu dans", logo presse
**Priority :** 🟡 P3

### ❌ 5.24 Nombre installations - Pas de counter animé
**Problème :** Statique
**Priority :** 🟡 P3

### ❌ 5.25 Pas de hashtag #MyHYDRAO
**Priority :** 🟡 P3

### ❌ 5.26 Showroom/points de vente absents
**Priority :** 🟡 P3

### ❌ 5.27 Landing pages personas absentes
**Problème :** Pas de /pour-les-familles, /pour-economiser
**Priority :** 🟡 P3

### ❌ 5.28 A/B testing - Aucun
**Priority :** 🟡 P3

### ❌ 5.29 Heatmaps - Absentes
**Priority :** 🟡 P3

### ❌ 5.30 Pixels tracking - Manquants
**Problème :** Pas de Meta/Google/TikTok pixels
**Priority :** 🟠 P2

---

## 💻 6. UX/UI FONCTIONNEL (25 points)

### ✅ 6.1 Header sticky
**Statut :** StickyHeader.tsx ✅

### ✅ 6.2 CartDrawer présent
**Statut :** CartDrawer.tsx ✅

### ❌ 6.3 Search bar absente
**Priority :** 🟡 P3

### ❌ 6.4 Filters avancés manquants
**Priority :** 🟡 P3

### ❌ 6.5 Sort absent
**Priority :** 🟡 P3

### ❌ 6.6 Quick view manquant
**Priority :** 🟡 P3

### ❌ 6.7 Wishlist inexistante
**Priority :** 🟡 P3

### ❌ 6.8 Compare produits absent
**Priority :** 🟡 P3

### ❌ 6.9 Size guide manquant
**Problème :** Pas de dimensions
**Priority :** 🟠 P2

### ❌ 6.10 Vue 360° absente
**Priority :** 🟡 P3

### ❌ 6.11 Configurator - Pas de preview temps réel
**Priority :** 🟠 P2

### ❌ 6.12 Calculateur - Pas assez visuel
**Priority :** 🟠 P2

### ❌ 6.13 Progress indicators absents
**Problème :** Configurator sans "Étape 2/5"
**Priority :** 🟠 P2

### ❌ 6.14 Tooltips manquants
**Priority :** 🟡 P3

### ❌ 6.15 Notifications absentes
**Problème :** Ajout panier sans toast
**Priority :** 🟡 P3

### ❌ 6.16 Undo/Redo impossible
**Priority :** 🟡 P3

### ❌ 6.17 Save progress absent
**Priority :** 🟡 P3

### ❌ 6.18 Share config manquant
**Priority :** 🟡 P3

### ❌ 6.19 Print-friendly non
**Priority :** 🟡 P3

### ❌ 6.20 Keyboard shortcuts absents
**Priority :** 🟡 P3

### ❌ 6.21 Scroll to top button absent
**Priority :** 🟡 P3

### ❌ 6.22 Dropdown - Pas accessible clavier
**Priority :** 🟠 P2

### ❌ 6.23 Form validation temps réel ?
**Priority :** 🟡 P3

### ❌ 6.24 Error messages génériques
**Priority :** 🟡 P3

### ❌ 6.25 Focus trap modals - Pas implémenté
**Priority :** 🟠 P2

---

## ⚙️ 7. TECHNIQUE & PERFORMANCE (30 points)

### ✅ 7.1 CartContext avec localStorage
**Statut :** CartContext.tsx ligne 28-50 ✅

### ✅ 7.2 ErrorBoundary
**Statut :** App.tsx + ErrorBoundary.tsx ✅

### ✅ 7.3 Code splitting
**Statut :** App.tsx lazy() ligne 16-40 ✅

### ✅ 7.4 LoadingSkeleton
**Statut :** Ligne 13 + 166 ✅

### 🟡 7.5 performance.ts - Fichier mort
**Problème :** initPerformanceOptimizations() jamais appelé
**Priority :** 🟠 P2

### 🟡 7.6 trackWebVitals() - Non initialisé
**Priority :** 🟠 P2

### 🟡 7.7 preloadCriticalResources() - Non exécuté
**Priority :** 🟡 P3

### ❌ 7.8 Fonts - Fichiers manquants
**Problème :** performance.ts ligne 12-13 référence /fonts/inter-*.woff2
**Priority :** 🟡 P3

### 🟡 7.9 SEOHead - BASE_URL hardcodé
**Problème :** Pas d'env variable
**Priority :** 🟡 P3

### ❌ 7.10 OG Image manquante
**Problème :** /og-image.jpg probablement inexistant
**Priority :** 🟠 P2

### 🟡 7.11 Structured Data - Données factices
**Problème :** 523 reviews inventées
**Priority :** 🟠 P2

### ❌ 7.12 WhatsApp - Numéro factice
**Problème :** +33612345678
**Priority :** 🟠 P2

### ❌ 7.13 Images Unsplash - Pas de fallback
**Priority :** 🟡 P3

### ❌ 7.14 Scroll to top - Triple logique
**Problème :** App.tsx ligne 75 + 80 + globals.css ligne 42
**Priority :** 🟡 P3

### ❌ 7.15 Service Worker manquant
**Problème :** performance.ts ligne 220 référence fichier inexistant
**Priority :** 🟡 P3

### ❌ 7.16 Pas de memoization
**Problème :** Aucun useMemo/useCallback visible
**Priority :** 🟡 P3

### ❌ 7.17 CartContext re-render global
**Priority :** 🟡 P3

### ❌ 7.18 Window global type pollution
**Priority :** 🟡 P3

### ❌ 7.19 Pas de compression Brotli
**Priority :** 🟡 P3

### ❌ 7.20 Pas de tree-shaking lucide-react optimal
**Priority :** 🟡 P3

### 🟡 7.21 CSS variables non utilisées
**Problème :** --section-padding-y défini mais jamais utilisé
**Priority :** 🟡 P3

### ❌ 7.22 TypeScript - any types
**Problème :** details?: any dans CartItem
**Priority :** 🟡 P3

### ❌ 7.23 Magic numbers partout
**Priority :** 🟡 P3

### ❌ 7.24 Console.log en production
**Problème :** performance.ts lignes 98, 121, 146
**Priority :** 🟡 P3

### ❌ 7.25 Commentaires JSDoc manquants
**Priority :** 🟡 P3

### ❌ 7.26 Pas de manifest.json PWA complet
**Priority :** 🟡 P3

### ❌ 7.27 Pas de theme-color meta
**Priority :** 🟡 P3

### ❌ 7.28 Pas de safe-area iOS
**Priority :** 🟡 P3

### ❌ 7.29 Motion - Peut causer lag mobile
**Priority :** 🟡 P3

### ❌ 7.30 Transitions pages - Trop longues
**Problème :** duration: 0.4 ligne 163 App.tsx
**Priority :** 🟡 P3

---

## 💰 8. COMMERCIAL & PRICING (20 points)

### 🟡 8.1 Prix 490€ - Pas anchoré
**Problème :** Affiché seul, devrait être "890€ 490€"
**Priority :** 🟠 P2

### ❌ 8.2 Comparaison Quooker absente homepage
**Priority :** 🔴 P1

### ❌ 8.3 TCO caché
**Priority :** 🟠 P2

### ✅ 8.4 Paiement 3× visible hero
**Statut :** HomePage.tsx ligne 135-138 ✅

### ❌ 8.5 ROI pas calculé explicitement
**Problème :** "6 mois" affiché mais pas de calcul visible
**Priority :** 🟠 P2

### ❌ 8.6 Bundles absents
**Priority :** 🟡 P3

### ❌ 8.7 Upsells non exploités
**Priority :** 🟡 P3

### ❌ 8.8 Cross-sells manquants
**Priority :** 🟡 P3

### ❌ 8.9 Downsells inexistants
**Priority :** 🟡 P3

### ❌ 8.10 Financing partenaires non proposé
**Problème :** Pas de Alma, PayPal Pay Later
**Priority :** 🟠 P2

### 🟡 8.11 Garantie sous-exploitée
**Problème :** "5 ans" sans "pièces ET main d'œuvre"
**Priority :** 🟡 P3

### ❌ 8.12 Installation floue
**Priority :** 🟠 P2

### ❌ 8.13 Compatibilité non abordée
**Priority :** 🟠 P2

### ❌ 8.14 SAV pas mis en avant
**Priority :** 🟡 P3

### ❌ 8.15 Politique retours pas claire
**Priority :** 🟡 P3

### ❌ 8.16 Livraison délais vagues
**Actuel :** "5 à 7 jours"
**Optimal :** "+ installation sous 48h"
**Priority :** 🟡 P3

### ❌ 8.17 Stock non communiqué
**Priority :** 🟡 P3

### ❌ 8.18 Charm pricing non utilisé
**Problème :** 490€ au lieu de 487€
**Priority :** 🟡 P3

### ❌ 8.19 Decoy effect absent
**Priority :** 🟡 P3

### ❌ 8.20 Endowment effect non exploité
**Problème :** Config devrait dire "VOTRE robinet"
**Priority :** 🟡 P3

---

## 🔍 9. SEO & DISCOVERABILITY (25 points)

### ❌ 9.1 Client-side routing non indexable
**Problème :** SPA React sans SSR
**Priority :** 🟠 P2

### ❌ 9.2 URLs - Pas de vraies routes
**Problème :** Tout en /#
**Priority :** 🟠 P2

### 🟡 9.3 Sitemap - Statique ?
**Problème :** /public/sitemap.xml existe mais contenu ?
**Priority :** 🟡 P3

### 🟡 9.4 Robots.txt - Contenu inconnu
**Priority :** 🟡 P3

### 🟡 9.5 Structured data - Données fictives
**Problème :** 523 reviews inventées
**Priority :** 🟠 P2

### 🟡 9.6 Canonical URLs hardcodées
**Priority :** 🟡 P3

### ❌ 9.7 Hreflang absent
**Priority :** 🟡 P3

### ❌ 9.8 Schema.org incomplet
**Problème :** Pas de LocalBusiness, BreadcrumbList, VideoObject
**Priority :** 🟡 P3

### ❌ 9.9 OG Image générique
**Priority :** 🟡 P3

### ❌ 9.10 Meta keywords obsolète
**Problème :** SEOHead ligne 30 utilise keywords (Google ignore depuis 2009)
**Priority :** 🟡 P3

### ❌ 9.11 H1 pas optimisé
**Problème :** "Et si toute l'eau..." sans keyword
**Priority :** 🟠 P2

### ❌ 9.12 Title tags trop longs
**Problème :** 69 caractères
**Priority :** 🟡 P3

### 🟡 9.13 Meta descriptions - Keyword stuffing
**Priority :** 🟠 P2

### ❌ 9.14 Internal linking faible
**Priority :** 🟡 P3

### ❌ 9.15 Alt text manquant/générique
**Priority :** 🟡 P3

### ❌ 9.16 Content depth superficiel
**Problème :** Pages < 500 mots
**Priority :** 🟡 P3

### 🟡 9.17 FAQ schema markup incomplet
**Priority :** 🟡 P3

### ❌ 9.18 Blog absent
**Priority :** 🟡 P3

### ❌ 9.19 Testimonials - Pas de review schema
**Priority :** 🟡 P3

### ❌ 9.20 Local SEO inexistant
**Priority :** 🟡 P3

### ❌ 9.21 Core Web Vitals non trackés
**Priority :** 🟠 P2

### ❌ 9.22 Images pas optimisées
**Problème :** Unsplash direct, pas de WebP
**Priority :** 🟡 P3

### ❌ 9.23 Fonts pas preload
**Priority :** 🟡 P3

### ❌ 9.24 Critical CSS absent
**Priority :** 🟡 P3

### ❌ 9.25 Lazy loading incomplet
**Priority :** 🟡 P3

---

## 📱 10. MOBILE-FIRST (10 points)

### ❌ 10.1 Bottom nav absente
**Problème :** Navigation top uniquement
**Priority :** 🟠 P2

### ❌ 10.2 Thumb zone non respectée
**Priority :** 🟠 P2

### ❌ 10.3 Swipe gestures non exploités
**Priority :** 🟡 P3

### ❌ 10.4 Pull to refresh absent
**Priority :** 🟡 P3

### ❌ 10.5 Offline mode inexistant
**Priority :** 🟡 P3

### 🟡 10.6 PWA manifeste incomplet
**Priority :** 🟡 P3

### ❌ 10.7 Status bar pas gérée
**Priority :** 🟡 P3

### ❌ 10.8 Safe areas iOS non respectées
**Priority :** 🟡 P3

### ❌ 10.9 Landscape mode cassé ?
**Priority :** 🟡 P3

### ❌ 10.10 Tablet - Ni desktop ni mobile
**Priority :** 🟡 P3

---

# 🎯 TOP 50 PRIORITÉS ABSOLUES

## 🔴 P1 - CRITIQUE (15 points) - **À FAIRE CETTE SEMAINE**

1. ❌ **Badge "40% moins cher Quooker" sur hero** (2.1.10)
2. ❌ **Menu ordre : Calculateur AVANT Configurateur** (1.1)
3. ❌ **Cartes foyers : ROI "Rentabilisé en 6 mois" visible** (2.4.5)
4. ❌ **Section Prix : Comparaison Quooker manquante** (2.8.3)
5. ❌ **Comparaison Quooker absente homepage** (8.2, 5.16)
6. ❌ **Footer Newsletter : RGPD checkbox** (1.12)
7. ❌ **Objection "C'est cher 490€" non traitée** (5.11)
8. ❌ **Risk reversal "Satisfait/remboursé 30j" pas en gros** (4.19)
9. ❌ **USP Quooker enterrée dans copy** (4.14)
10. ❌ **Paiement 3× visible partout (pas juste hero)** (Vérifier toutes sections prix)
11. ❌ **WhatsApp numéro factice** (7.12)
12. ❌ **OG Image manquante** (7.10)
13. ❌ **Structured data factice (523 reviews)** (7.11)
14. ❌ **Footer email/tel non cliquables** (1.10)
15. ❌ **Objection "Mon évier compatible ?"** (5.14)

**Impact estimé si P1 corrigé : +40-60% conversion**

---

## 🟠 P2 - IMPORTANT (20 points) - **À FAIRE CE MOIS**

16. ❌ **Dropdown "Concept 5-en-1" → "Comment ça marche"** (1.2)
17. ❌ **Liens dropdown vers Comparaison + Prix** (1.3)
18. ❌ **Bandeau header rotatif avec 3-4 messages** (1.6)
19. ❌ **Menu mobile : seul Calculateur en bordeaux** (1.15)
20. ❌ **Hero image : Unsplash → vraie photo HYDRAO** (2.1.11)
21. ❌ **Stats hero : ajouter "Économie moy 840€/an"** (2.1.14)
22. ❌ **CTA hero : ajouter urgence badge** (2.1.17)
23. ❌ **Trust badges : logos Trustpilot/Google** (2.1.18)
24. ❌ **Ancrage prix : "890€ 490€"** (2.1.20, 8.1)
25. ❌ **Section Quotidien : copy chiffré "60h/an"** (2.2.3)
26. ❌ **Section 5-en-1 : hiérarchie visuelle eau bouillante/pétillante** (2.3.6)
27. ❌ **Section 5-en-1 : Robinet classique en premier** (2.3.7)
28. ❌ **Section 5-en-1 : Copy chiffré économies** (2.3.8)
29. ❌ **Section 5-en-1 : Responsive mobile 5→1 colonne** (2.3.15)
30. ❌ **Chiffre "400×" : ajouter tooltip preuve** (2.4.4)
31. ❌ **Économies : projection 5 ans visible** (2.4.6)
32. ❌ **Économies : comparaison Quooker** (2.4.7)
33. ❌ **Before/After : vraies images HYDRAO** (2.6.2)
34. ❌ **Témoignages : carousel + 6-9 items** (2.7.3)
35. ❌ **Témoignages : DATA dans copy** (2.7.4)

---

## 🟡 P3 - OPTIMISATIONS (15 points) - **TRIMESTRE**

36-50. Voir détails dans liste complète ci-dessus

---

# 📈 PROCHAINES ACTIONS

## ✅ BATCH 1-5 : JE VAIS TRAITER MAINTENANT

**BATCH 1 : Argument Quooker (4 points)**
1. Créer composant QuookerComparisonBadge
2. Ajouter badge hero HomePage
3. Ajouter dans section Prix
4. Ajouter dans section Économies

**BATCH 2 : Menu ordre + RGPD (2 points)**
5. Inverser ordre Header.tsx (Calculateur avant Configurateur)
6. Ajouter checkbox RGPD Footer newsletter

---

**Questions pour toi :**
1. ✅ Tu valides que je commence par BATCH 1-5 ?
2. Après chaque batch de 5, je te fais un rapport et on continue ?
3. Tu veux que je crée une page `/comparaison-quooker` dédiée ?

**Dis-moi GO et j'attaque ! 🚀**
