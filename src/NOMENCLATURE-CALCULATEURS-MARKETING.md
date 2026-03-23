# 🎯 NOMENCLATURE STRATÉGIQUE DES CALCULATEURS HYDRAO

## 🧠 DOUBLE SYSTÈME DE NOMMAGE

**Classification interne** (pour nous, l'équipe) → Organisation logique  
**Nom marketing** (pour le client) → Orienté bénéfice, sexy, clair

---

## 📊 LES 7 CATÉGORIES + NOMS STRATÉGIQUES

### 💰 CATÉGORIE 1 : FINANCIERS (usage interne)
**Objectif client :** "Combien je vais économiser ?"

| Nom marketing (utilisateur) | Classification interne | Page | Bénéfice clé |
|-----------------------------|------------------------|------|--------------|
| **Simulateur d'économies** | Simple Savings Calculator | Homepage | "Découvrez combien vous économisez chaque année" |
| **Analyseur de rentabilité** | Break-Even Calculator | Page Économies | "En combien de temps votre investissement est-il rentabilisé ?" |
| **Comparateur de coûts 5 ans** | TCO Calculator | Page Économies | "HYDRAO vs alternatives : qui coûte le moins cher ?" |
| **Calculateur quotidien** | Cost Per Day | Objection prix | "Combien ça coûte par jour ?" |
| **Calculateur de retour sur investissement** | ROI Percentage | Profils analytiques | "Quel est votre retour sur investissement ?" |

**Exemple d'usage :**
```tsx
// Code interne
<Calculator type="financial" variant="simple-savings" />

// Titre affiché au client
<h2>Simulateur d'économies</h2>
<p>Découvrez combien vous économisez chaque année avec HYDRAO</p>
```

---

### ⏱️ CATÉGORIE 2 : COMPORTEMENTAUX (usage interne)
**Objectif client :** "Qu'est-ce que je gagne au quotidien ?"

| Nom marketing | Classification interne | Page | Bénéfice clé |
|---------------|------------------------|------|--------------|
| **Compteur de temps gagné** | Time Saved Calculator | Persona pressé | "Combien d'heures allez-vous récupérer ?" |
| **Indicateur de confort** | Convenience Score | Post-achat | "Mesurez votre gain de confort au quotidien" |
| **Calculateur de trajets évités** | Bottle Trips Calculator | Persona flemme | "Combien de courses en moins ?" |

**Exemple d'usage :**
```tsx
// Homepage - Section secondaire
<h3>Compteur de temps gagné</h3>
<p>Plus besoin d'attendre que l'eau bouille. Calculez les heures récupérées.</p>

// Résultat
"Vous gagnez 52 heures par an"
"= 2 jours complets à faire ce que vous aimez"
```

---

### 🏥 CATÉGORIE 3 : SANITAIRES (usage interne)
**Objectif client :** "Est-ce que c'est vraiment plus sain ?"

| Nom marketing | Classification interne | Page | Bénéfice clé |
|---------------|------------------------|------|--------------|
| **Analyseur de pureté** | Microplastics Calculator | Homepage Hero | "Combien de microplastiques évitez-vous ?" |
| **Protection santé familiale** | Health Impact Calculator | Parents | "Quel impact santé pour votre famille ?" |
| **Détecteur de polluants filtrés** | Contaminants Filtered | Page Sécurité | "Que filtre HYDRAO dans votre eau ?" |

**Exemple d'usage :**
```tsx
// Homepage Hero - Badge choc
<Badge variant="warning">
  <h4>Analyseur de pureté</h4>
  <p>240 000 particules microplastiques par bouteille plastique</p>
  <span>Avec HYDRAO : 0 microplastique</span>
</Badge>

// Page Sécurité - Section détaillée
<h2>Détecteur de polluants filtrés</h2>
<p>Découvrez ce que le filtre 5 étapes élimine de votre eau</p>
[Calculateur avec sélection ville → qualité eau locale → polluants filtrés]
```

---

### 🌍 CATÉGORIE 4 : ENVIRONNEMENTAUX (usage interne)
**Objectif client :** "Quel est mon impact positif ?"

| Nom marketing | Classification interne | Page | Bénéfice clé |
|---------------|------------------------|------|--------------|
| **Compteur d'impact plastique** | Plastic Bottles Calculator | Homepage + Éco | "Combien de bouteilles évitez-vous ?" |
| **Calculateur empreinte carbone** | CO2 Footprint Calculator | Page Éco | "Quelle quantité de CO2 économisez-vous ?" |
| **Projection impact long terme** | Environmental Timeline | Page Éco | "Votre impact dans 5, 10, 20 ans" |
| **Protecteur des océans** | Ocean Plastic Prevented | Storytelling | "Combien de plastique n'ira pas dans les océans ?" |

**Exemple d'usage :**
```tsx
// Homepage - Card environnement
<h3>Compteur d'impact plastique</h3>
<p>Visualisez le nombre de bouteilles que vous évitez chaque année</p>

Résultat :
"2 400 bouteilles/an"
[Visuel : Pile de bouteilles vs robinet HYDRAO]

// Page Écoresponsable - Timeline
<h2>Projection impact long terme</h2>
<p>Glissez le curseur pour voir votre impact cumulé dans le temps</p>

[Slider] 1 an → 5 ans → 10 ans → 20 ans
Résultat :
"En 10 ans : 24 000 bouteilles évitées"
"= 816 kg de plastique non produit"
"= 1 560 kg CO2 économisés"
```

---

### ⚖️ CATÉGORIE 5 : COMPARATIFS (usage interne)
**Objectif client :** "Pourquoi HYDRAO plutôt qu'un autre ?"

| Nom marketing | Classification interne | Page | Bénéfice clé |
|---------------|------------------------|------|--------------|
| **HYDRAO vs Bouteilles** | Bottles Comparison | Partout | "Économies réelles vs eau en bouteille" |
| **HYDRAO vs Quooker** | Quooker Comparison | Objection concurrent | "Pourquoi HYDRAO est plus avantageux" |
| **HYDRAO vs Brita** | Brita Comparison | Objection alternative | "Filtration : HYDRAO vs carafes filtrantes" |
| **HYDRAO vs Sodastream** | Sodastream Comparison | Pétillante | "5 fonctions vs 1 seule" |
| **Tableau comparatif complet** | Multi-Brand TCO | Page Produits | "Toutes les alternatives en un coup d'œil" |

**Exemple d'usage :**
```tsx
// Page Économies - Onglet Comparaison
<h2>Tableau comparatif complet</h2>
<p>Comparez HYDRAO avec toutes les alternatives sur 5 ans</p>

[Sélecteur]
Comparer HYDRAO avec :
☑ Bouteilles plastique
☐ Quooker
☐ Grohe Blue
☐ Brita + Bouilloire
☐ Sodastream

// Résultat : Tableau TCO détaillé

// Objection spécifique Quooker
<h3>HYDRAO vs Quooker</h3>
<p>Les deux font de l'eau bouillante. Mais lequel est vraiment rentable ?</p>

[Tableau côte à côte]
|                | HYDRAO | Quooker |
|----------------|--------|---------|
| Prix achat     | 490€   | 1 490€  |
| Conso énergie  | 280€/an| 480€/an |
| Total 5 ans    | 1 890€ | 3 890€  |

Conclusion : "HYDRAO = -2 000€ sur 5 ans vs Quooker"
```

---

### 🔮 CATÉGORIE 6 : PRÉDICTIFS (usage interne)
**Objectif client :** "Et dans le futur, qu'est-ce que ça donne ?"

| Nom marketing | Classification interne | Page | Bénéfice clé |
|---------------|------------------------|------|--------------|
| **Projection économies long terme** | Savings Timeline | Page Économies | "Vos économies projetées sur 1, 5, 10 ans" |
| **Assistant formule personnalisée** | Subscription Optimizer | Configurateur | "Quelle formule d'abonnement pour vous ?" |
| **Prévision évolution besoins** | Family Growth Predictor | Familles projet bébé | "Anticiper vos besoins futurs" |
| **Parcours d'amélioration** | Upgrade Path Recommender | Post-achat | "Comment optimiser votre installation ?" |

**Exemple d'usage :**
```tsx
// Page Économies - Section projection
<h2>Projection économies long terme</h2>
<p>Glissez pour voir vos économies cumulées dans le temps</p>

[Timeline interactive]
→ 1 an : 1 200€
→ 5 ans : 6 000€
→ 10 ans : 12 000€

[Badges débloqués]
🏆 "1 000€ économisés" (8 mois)
🌟 "5 000€ économisés" (4 ans)
💎 "10 000€ économisés" (8 ans)

// Configurateur - Après sélection config
<h3>Assistant formule personnalisée</h3>
<p>Selon votre profil, voici la formule recommandée :</p>

Résultat :
"Formule Standard (99€/an)"
"Recommandée pour 87% des foyers comme le vôtre"
"Inclut : Filtres + 1L eau pétillante/jour"

[Lien] Comparer toutes les formules →
```

---

### 👥 CATÉGORIE 7 : SOCIAUX (usage interne)
**Objectif client :** "Est-ce que d'autres l'ont fait ?"

| Nom marketing | Classification interne | Page | Bénéfice clé |
|---------------|------------------------|------|--------------|
| **Ce que choisissent vos voisins** | Peer Comparison | Configurateur | "95% des foyers comme vous ont choisi..." |
| **Impact de la communauté** | Community Impact | Homepage | "15 000 familles = 36M bouteilles évitées" |
| **Carte des utilisateurs** | Local Adoption Map | Social proof | "127 foyers HYDRAO dans votre ville" |
| **Calculateur de parrainage** | Referral Value Calculator | Post-achat | "Gagnez en parrainant vos proches" |

**Exemple d'usage :**
```tsx
// Configurateur - Section validation
<h3>Ce que choisissent vos voisins</h3>
<p>Les foyers similaires au vôtre ont opté pour :</p>

Résultat :
"✅ Modèle FLEX (87%)"
"✅ Finition Chrome (74%)"
"✅ Formule Standard (91%)"

Message : "Vous êtes sur la bonne voie ! Cette configuration est la plus populaire pour votre profil."

// Homepage - Section social proof
<h2>Impact de la communauté</h2>
<p>Ensemble, nous créons un impact massif</p>

[Compteurs animés]
15 234 familles équipées
36 561 840 bouteilles évitées
5 423 tonnes CO2 économisées

// Page Témoignages - Carte interactive
<h2>Carte des utilisateurs</h2>
<p>Découvrez les foyers HYDRAO près de chez vous</p>

[Carte France avec pins]
Hover sur votre région :
"127 foyers HYDRAO à [Votre Ville]"
"Rejoignez la communauté locale"
```

---

## 🎨 DESIGN SYSTEM : Titres + Sous-titres

### Template Homepage (Découverte)
```tsx
<section>
  {/* Badge optionnel */}
  <Badge>Nouveau</Badge>
  
  {/* Nom marketing (H2 ou H3) */}
  <h2>Simulateur d'économies</h2>
  
  {/* Sous-titre bénéfice (question client) */}
  <p className="subtitle">
    Découvrez combien vous économisez chaque année avec HYDRAO
  </p>
  
  {/* Calculateur */}
  <Calculator type="financial" variant="simple-savings" />
  
  {/* CTA */}
  <Button>Voir le calcul détaillé →</Button>
</section>
```

### Template Page Économies (Analyse)
```tsx
<section>
  {/* Nom marketing (H2) */}
  <h2>Comparateur de coûts 5 ans</h2>
  
  {/* Sous-titre explicatif */}
  <p className="subtitle">
    HYDRAO vs alternatives : découvrez qui coûte vraiment le moins cher sur la durée
  </p>
  
  {/* Sélecteur */}
  <ComparisonSelector />
  
  {/* Résultats en tableau/graphique */}
  <ComparisonResults />
  
  {/* Conclusion automatique */}
  <Insight>
    💡 HYDRAO vous fait économiser 2 400€ sur 5 ans vs l'alternative la moins chère
  </Insight>
</section>
```

### Template Configurateur (Validation)
```tsx
<section className="discrete">
  {/* Nom marketing discret (H4) */}
  <h4>Projection économies personnalisée</h4>
  
  {/* Résultat direct (pas de form) */}
  <ResultCard>
    <StatLine>
      <Icon>💰</Icon>
      <span>Économies annuelles : 1 180€</span>
    </StatLine>
    <StatLine>
      <Icon>📈</Icon>
      <span>Rentabilisé en : 4,9 mois</span>
    </StatLine>
    <StatLine>
      <Icon>🌍</Icon>
      <span>Impact : 2 400 bouteilles évitées/an</span>
    </StatLine>
  </ResultCard>
  
  {/* Lien détails (optionnel) */}
  <Link>Voir le calcul détaillé →</Link>
</section>
```

---

## 📱 NOMS POUR NAVIGATION / MENU

### Menu principal
```
Économies → Page Économies (tous les calculateurs financiers/comparatifs)
Impact → Page Écoresponsable (calculateurs environnementaux)
Sécurité → Page Sécurité (calculateurs sanitaires)
Témoignages → Page Témoignages (calculateurs sociaux/validation)
```

### Page Économies - Onglets
```
Onglet 1 : "Vos économies"
  → Simulateur d'économies
  → Analyseur de rentabilité
  → Compteur de temps gagné

Onglet 2 : "Comparaisons"
  → Tableau comparatif complet
  → HYDRAO vs [sélecteur concurrent]
  → Comparateur de coûts 5 ans

Onglet 3 : "Long terme"
  → Projection économies long terme
  → Badges d'étapes
```

---

## 🧩 COMPOSANTS RÉUTILISABLES

### 1. `<CalculatorSection>` (wrapper standard)
```tsx
interface CalculatorSectionProps {
  marketingName: string; // "Simulateur d'économies"
  internalType: string;  // "financial-simple-savings"
  subtitle: string;
  badge?: string;
  level: 'discovery' | 'analysis' | 'validation';
}

// Usage
<CalculatorSection
  marketingName="Simulateur d'économies"
  internalType="financial-simple-savings"
  subtitle="Découvrez combien vous économisez chaque année avec HYDRAO"
  level="discovery"
>
  {/* Contenu du calculateur */}
</CalculatorSection>
```

### 2. `<CalculatorResult>` (affichage résultat)
```tsx
interface CalculatorResultProps {
  title: string;
  results: Array<{
    label: string;
    value: string | number;
    icon?: ReactNode;
    emphasis?: 'primary' | 'secondary';
  }>;
  insight?: string; // Message de conclusion
  cta?: { text: string; action: () => void };
}

// Usage
<CalculatorResult
  title="Vos économies avec HYDRAO"
  results={[
    { label: "Par an", value: "1 200€", icon: <Euro />, emphasis: "primary" },
    { label: "Sur 5 ans", value: "6 000€", icon: <TrendingUp /> },
    { label: "Rentabilisé en", value: "4,9 mois", icon: <Clock /> }
  ]}
  insight="Votre robinet est rentabilisé en moins de 5 mois"
  cta={{ text: "Configurer mon HYDRAO", action: () => navigate('configurator') }}
/>
```

---

## 📊 MATRICE COMPLÈTE : Objection → Calculateur (avec noms marketing)

| Objection client | Nom marketing du calculateur | Page | Résultat clé |
|-----------------|----------------------------|------|--------------|
| "C'est trop cher 490€" | **Calculateur quotidien** | Objection | "0,27€/jour = un café" |
| "Combien j'économise vraiment ?" | **Simulateur d'économies** | Homepage | "1 200€/an" |
| "En combien de temps c'est rentabilisé ?" | **Analyseur de rentabilité** | Page Économies | "4,9 mois" |
| "Pourquoi pas Quooker ?" | **HYDRAO vs Quooker** | Comparaison | "-2 000€ sur 5 ans" |
| "J'ai déjà une carafe Brita" | **HYDRAO vs Brita** | Comparaison | "Brita 240€/an vs 99€" |
| "Les microplastiques c'est grave ?" | **Analyseur de pureté** | Homepage Hero | "240k particules évitées/bouteille" |
| "C'est bon pour la planète ?" | **Compteur d'impact plastique** | Page Éco | "2 400 bouteilles/an" |
| "Ça va me faire gagner du temps ?" | **Compteur de temps gagné** | Persona pressé | "52h/an = 2 jours" |
| "Quelle formule d'abonnement ?" | **Assistant formule personnalisée** | Configurateur | "Standard optimal pour vous" |
| "Est-ce que c'est populaire ?" | **Ce que choisissent vos voisins** | Configurateur | "87% ont choisi Flex" |
| "Dans 5 ans, ça donne quoi ?" | **Projection économies long terme** | Page Économies | "6 000€ en 5 ans" |

---

## ✅ CHECKLIST VALIDATION NOMMAGE

Avant de valider un nom de calculateur, vérifier :

- [ ] **Orienté bénéfice client** (pas technique) ✅
- [ ] **Question qu'on se pose** ("Combien j'économise ?" > "Calculateur TCO") ✅
- [ ] **Action claire** (Simulateur, Analyseur, Compteur, Projection...) ✅
- [ ] **Pas de jargon** (éviter "ROI", "TCO", "Break-even" sauf profil B2B) ✅
- [ ] **Court et mémorable** (4-6 mots max) ✅
- [ ] **Cohérent avec la promesse HYDRAO** (économies, santé, environnement) ✅

---

## 🎯 EXEMPLES AVANT/APRÈS

### ❌ AVANT (noms techniques internes)
```
- TCO Calculator
- Break-Even Visualizer
- Cost Per Day Display
- Environmental Impact Calculator
- Peer Comparison Tool
```

### ✅ APRÈS (noms marketing stratégiques)
```
- Comparateur de coûts 5 ans
- Analyseur de rentabilité
- Calculateur quotidien
- Compteur d'impact plastique
- Ce que choisissent vos voisins
```

---

## 🚀 IMPLÉMENTATION

### Structure de fichiers
```
/components/calculators/
  ├── CalculatorSection.tsx (wrapper)
  ├── CalculatorResult.tsx (affichage résultats)
  ├── financial/
  │   ├── SimpleSavingsCalculator.tsx
  │   │   → Nom interne : "Simple Savings"
  │   │   → Nom affiché : "Simulateur d'économies"
  │   ├── BreakEvenCalculator.tsx
  │   │   → Nom interne : "Break-Even"
  │   │   → Nom affiché : "Analyseur de rentabilité"
  │   └── TCOCalculator.tsx
  │       → Nom interne : "TCO Complete"
  │       → Nom affiché : "Comparateur de coûts 5 ans"
  ├── environmental/
  │   ├── PlasticBottlesCalculator.tsx
  │   │   → Nom affiché : "Compteur d'impact plastique"
  │   └── CO2FootprintCalculator.tsx
  │       → Nom affiché : "Calculateur empreinte carbone"
  └── social/
      ├── PeerComparisonCalculator.tsx
      │   → Nom affiché : "Ce que choisissent vos voisins"
      └── CommunityImpactCalculator.tsx
          → Nom affiché : "Impact de la communauté"
```

### Configuration centralisée
```typescript
// /data/calculators-config.ts

export const CALCULATOR_NAMES = {
  // Financiers
  'simple-savings': {
    internal: 'Simple Savings Calculator',
    marketing: 'Simulateur d\'économies',
    subtitle: 'Découvrez combien vous économisez chaque année avec HYDRAO',
    category: 'financial',
    pages: ['homepage', 'economies']
  },
  'break-even': {
    internal: 'Break-Even Visualizer',
    marketing: 'Analyseur de rentabilité',
    subtitle: 'En combien de temps votre investissement est-il rentabilisé ?',
    category: 'financial',
    pages: ['economies']
  },
  'tco': {
    internal: 'TCO Calculator',
    marketing: 'Comparateur de coûts 5 ans',
    subtitle: 'HYDRAO vs alternatives : qui coûte vraiment le moins cher ?',
    category: 'financial',
    pages: ['economies']
  },
  
  // Environnementaux
  'plastic-bottles': {
    internal: 'Plastic Bottles Calculator',
    marketing: 'Compteur d\'impact plastique',
    subtitle: 'Visualisez le nombre de bouteilles que vous évitez chaque année',
    category: 'environmental',
    pages: ['homepage', 'ecoresponsable']
  },
  
  // Sociaux
  'peer-comparison': {
    internal: 'Peer Comparison Tool',
    marketing: 'Ce que choisissent vos voisins',
    subtitle: 'Les foyers similaires au vôtre ont opté pour...',
    category: 'social',
    pages: ['configurator']
  },
  
  // ... etc
} as const;
```

---

**Cette nomenclature double transforme nos outils techniques en expériences utilisateur stratégiques, où chaque calculateur a un nom qui VEND son bénéfice, pas sa fonction.**
