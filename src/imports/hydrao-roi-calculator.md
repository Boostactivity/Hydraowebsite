# HYDRAO — Prompt 1 / 3 : Le Calculateur ROI (version enrichie)

---

## CONTEXTE GÉNÉRAL

Tu travailles sur le site Hydrao, une marque française qui commercialise des robinets multifonctions remplaçant définitivement l'eau embouteillée. Il existe 3 produits :
- **SKU2 — Bouillant + Filtré** : 490€ TTC
- **SKU1 — Froid + Gazeux + Filtré** : 890€ TTC
- **SKU3 — Complet 5-en-1 (bouillant + froid + gazeux + filtré)** : 990€ TTC

Ce calculateur est la **première étape d'un tunnel de conversion en 3 steps**. Il vient **enrichir et compléter le calculateur déjà existant sur le site** — il ne le remplace pas, il s'y ajoute comme version "avancée et précise".

Son objectif : permettre au visiteur de saisir exactement ce qu'il achète (enseigne, marque, format, quantité) et voir en temps réel combien il dépense, puis combien il économiserait avec Hydrao. Le client se convainc par ses propres chiffres.

---

## IDENTITÉ VISUELLE

- Marque : **Hydrao**
- Palette : utiliser la palette officielle Hydrao (bordeaux, marron foncé, accents clairs)
- Typographie : moderne et premium, éviter Inter/Arial/Roboto — choisir un display font distinctif pour les chiffres clés
- Ton visuel : sobre, honnête, chaleureux — pas clinique, pas gadget
- Mobile-first : concevoir d'abord pour 375px, adapter ensuite desktop

---

## CE QUE TU DOIS CONSTRUIRE

Un calculateur interactif en **3 sous-étapes fluides**, sans rechargement de page, tout en temps réel. Transitions douces. Interface épurée, pas de receipt/ticket de caisse.

---

### SOUS-ÉTAPE A — Quelle eau achetez-vous ?

**Sélection de l'enseigne** (5 options) :
Carrefour / Monoprix / Intermarché / E.Leclerc / Auchan

**Puis sélection de la marque + format**, avec le prix pack ET le prix au litre calculé automatiquement.

Utiliser la base de données complète suivante :

---

#### BASE DE DONNÉES PRIX — EAUX PLATES

**Carrefour :**
| Marque | Format | Prix pack | Prix/L |
|---|---|---|---|
| Carrefour Classic' (MDD) | 6×1,5L | 0,85€ | 0,09€ |
| Cristaline | 6×1,5L | 1,39€ | 0,15€ |
| Mont Roucous | 6×1L | 3,29€ | 0,55€ |
| Vittel | 6×1L | 3,40€ | 0,57€ |
| Vittel | 6×1,5L | 4,10€ | 0,46€ |
| Volvic | 6×1L | 3,95€ | 0,66€ |
| Volvic | 6×1,5L | 4,09€ | 0,45€ |
| Evian | 6×50cl | 3,09€ | 1,03€ |
| Evian | 6×1L | 3,69€ | 0,62€ |
| Evian | 6×1,5L | 4,49€ | 0,50€ |

**Monoprix :**
| Marque | Format | Prix pack | Prix/L |
|---|---|---|---|
| Monoprix (MDD) | 6×50cl | 1,85€ | 0,62€ |
| Cristaline | 6×1,5L | 1,39€ | 0,15€ |
| Vittel | 6×1L | 3,29€ | 0,55€ |
| Volvic | 6×1L | 3,95€ | 0,66€ |
| Volvic | 6×1,5L | 4,09€ | 0,45€ |
| Evian | 6×50cl | 3,09€ | 1,03€ |
| Evian | 6×1L | 3,69€ | 0,62€ |
| Wattwiller | 6×1,5L | 4,45€ | 0,49€ |

**E.Leclerc :**
| Marque | Format | Prix pack | Prix/L |
|---|---|---|---|
| Eaux MR (MDD) | 6×1,5L | 0,79€ | 0,09€ |
| Cristaline | 6×1,5L | 1,25€ | 0,14€ |
| Vittel | 6×1,5L | 3,65€ | 0,41€ |
| Volvic | 6×1,5L | 3,89€ | 0,43€ |
| Evian | 6×1,5L | 4,29€ | 0,48€ |
| Evian | 6×1L | 3,49€ | 0,58€ |

**Auchan :**
| Marque | Format | Prix pack | Prix/L |
|---|---|---|---|
| Auchan (MDD) | 6×1,5L | 0,82€ | 0,09€ |
| Cristaline | 6×1,5L | 1,35€ | 0,15€ |
| Evian | 6×1,5L | 4,49€ | 0,50€ |
| Vittel | 6×1,5L | 4,05€ | 0,45€ |
| Volvic | 6×1,5L | 4,05€ | 0,45€ |

**Intermarché :**
| Marque | Format | Prix pack | Prix/L |
|---|---|---|---|
| Cristaline | 6×1,5L | 1,29€ | 0,14€ |
| Evian | 6×1,5L | 4,39€ | 0,49€ |
| Vittel | 6×1,5L | 3,95€ | 0,44€ |
| Volvic | 6×1,5L | 3,99€ | 0,44€ |

---

#### BASE DE DONNÉES PRIX — EAUX GAZEUSES

**Carrefour :**
| Marque | Format | Prix pack | Prix/L |
|---|---|---|---|
| Perrier | 6×1L | 5,79€ | 0,97€ |
| Perrier | 8×20cl | 4,45€ | 2,78€ |
| Badoit | 6×50cl | 3,85€ | 1,28€ |
| Badoit | 6×1L | 5,89€ | 0,98€ |
| San Pellegrino | 6×1L | 5,19€ | 0,87€ |

**Monoprix :**
| Marque | Format | Prix pack | Prix/L |
|---|---|---|---|
| Perrier | 8×20cl | 4,45€ | 2,78€ |
| Badoit | 6×50cl | 3,85€ | 1,28€ |
| San Pellegrino | 6×1L | 5,19€ | 0,87€ |
| Cristaline pétillante | 6×1,5L | ~2,00€ | 0,22€ |

**E.Leclerc :**
| Marque | Format | Prix pack | Prix/L |
|---|---|---|---|
| Perrier | 6×1L | 5,29€ | 0,88€ |
| Badoit | 6×1L | 5,49€ | 0,92€ |
| San Pellegrino | 6×1L | 4,89€ | 0,82€ |
| Salvetat | 6×1,15L | ~3,50€ | 0,51€ |

---

#### CONTEXTE CONSOMMATION (pour calibrer le calcul)

Données réelles France 2025 (source : Office International de l'Eau, INSEE) :
- Consommation moyenne réelle en bouteille : **135 L/personne/an**
- Non pas 730 L (besoin théorique) — les Français combinent bouteille + robinet
- 36% de Français sont consommateurs réguliers "mixtes" (~135 L/an)
- 16% sont forts consommateurs (500-730 L/an) — **cible prioritaire Hydrao**
- Un foyer de 4 personnes buvant Evian dépense ~265€/an ; en Perrier ~415-830€/an

Ces données servent à contextualiser les résultats : si le montant calculé est faible, expliquer qu'il représente une partie de la consommation réelle.

---

### SOUS-ÉTAPE B — Quelle est votre consommation ?

- Saisie en **packs ou bouteilles par semaine** (option : par mois)
- Ne pas demander en litres — les gens pensent en achats
- Calcul en temps réel :
  - Volume total en litres (calculé automatiquement)
  - Coût mensuel
  - **Coût annuel affiché en grand** — c'est le chiffre choc
- Sous-titre dynamique selon le montant annuel :
  - < 100€ : *"Soit le prix d'un bon restaurant chaque année"*
  - 100–250€ : *"Soit l'équivalent d'un week-end en famille chaque année"*
  - 250–500€ : *"Soit presque le prix d'un billet d'avion aller-retour"*
  - > 500€ : *"Soit le prix d'un robinet Hydrao — chaque année"*

---

### SOUS-ÉTAPE C — Choisissez votre robinet Hydrao

**3 cartes SKU :**

| SKU | Fonctions incluses | Prix |
|---|---|---|
| SKU2 | Eau bouillante + eau filtrée | 490€ TTC |
| SKU1 | Eau froide + eau gazeuse + eau filtrée | 890€ TTC |
| SKU3 | Eau bouillante + froide + gazeuse + filtrée (tout-en-un) | 990€ TTC |

**Sélection du nombre de personnes dans le foyer :**
- 1–2 personnes → formule **Essentiel 59€/an**
- 3–4 personnes → formule **Standard 99€/an**
- 5+ personnes → formule **Plus 119€/an**

**Abonnement adapté automatiquement selon le SKU :**
- SKU2 (bouillant + filtré, **sans gazeux**) → **filtres uniquement** dans l'abonnement
- SKU1 (froid + gazeux + filtré) → **filtres + cartouches CO₂** dans l'abonnement
- SKU3 (complet, **avec gazeux**) → **filtres + cartouches CO₂** dans l'abonnement

---

### RÉSULTATS — Comparatif 5 ans

**Graphique 2 courbes sur 5 ans :**
- Courbe rouge : coût cumulé eau embouteillée (linéaire)
- Courbe bordeaux Hydrao : pic année 1 (achat SKU + abonnement), plateau années 2–5 (abonnement seul)
- **Point d'intersection** = année de rentabilité, mis en évidence avec label *"Rentabilisé en X mois"*
- Survol interactif par année (tooltip montants)

**Chiffres clés sous le graphique :**
- Total embouteillé sur 5 ans : X€
- Total Hydrao sur 5 ans : X€
- **Économie totale sur 5 ans : X€** — très grand, couleur accentuée

**CTA dynamique personnalisé :**
*"Je veux économiser [X€] par an →"*

---

## INSTRUCTIONS TECHNIQUES

- Mises à jour en temps réel, zéro rechargement
- Transitions slide/fade doux 200–300ms entre sous-étapes
- Graphique lisible sur mobile (pas de données trop denses)
- Aucune donnée fictive — utiliser exclusivement les prix de la base ci-dessus
- **Mémoriser** le SKU et la formule choisis → pré-remplir automatiquement le Step 2 (abonnements)
- Note discrète sous les prix : *"Prix moyens constatés, peuvent varier selon promotions et régions"*
- Animations légères — fluidité avant spectaculaire