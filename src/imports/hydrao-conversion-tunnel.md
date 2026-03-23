# HYDRAO — Prompt Complet Figma Make
## Tunnel de conversion one-page : Intro + Calcul + Robinet + Formule + Personnalisation

---

## CONTEXTE & IDÉOLOGIE

Hydrao est une marque française qui commercialise des robinets multifonctions remplaçant définitivement l'eau embouteillée. La stratégie est le volume et l'accessibilité — des prix cassés pour toucher le maximum de foyers français puis européens, là où les concurrents (Quooker 1 100€, Zip HydroTap 2 500€) restent inaccessibles.

**Les 3 produits :**
- **Hydrao Pure** — Eau bouillante + eau filtrée — 490€ TTC
- **Hydrao Spark** — Eau froide + eau gazeuse + eau filtrée — 890€ TTC
- **Hydrao One** — Eau bouillante + froide + gazeuse + filtrée (tout-en-un) — 990€ TTC

**Les 3 formules d'abonnement annuel (consommables) :**
- **Essentiel** — 59€/an — 1-2 personnes
- **Standard** — 99€/an — 3-4 personnes
- **Plus** — 119€/an — 5+ personnes

**Philosophie de la page :** Pas de vente agressive. Le client se convainc lui-même par les chiffres, comprend ce qu'il paie, et co-crée son produit. La transparence est l'argument de vente principal.

---

## IDENTITÉ VISUELLE

- Marque : **Hydrao**
- Palette : palette officielle Hydrao — bordeaux, marron foncé, accents clairs (Figma connaît la palette)
- Typographie : moderne et premium, display font distinctif pour les chiffres clés — éviter Inter/Arial/Roboto
- Ton : direct, honnête, chaleureux — phrases courtes, jamais d'exclamations vides
- Mobile-first : concevoir pour 375px d'abord, adapter desktop ensuite

---

## ARCHITECTURE GÉNÉRALE — ONE-PAGE SCROLL NARRATIF

La page entière est un **parcours vertical continu** — pas de pages séparées, pas de rechargements. Le client descend comme dans un ascenseur, guidé naturellement d'une étape à l'autre.

**Éléments persistants pendant tout le scroll :**

**1. Barre de progression fixe en haut**
4 étapes affichées en permanence : Économies → Robinet → Formule → Mon pack
L'étape active est mise en surbrillance. Le client sait toujours où il en est.

**2. Résumé flottant**
- Desktop : carte fixe sur le côté droit, se remplit au fur et à mesure
- Mobile : bandeau discret en bas d'écran
Contenu dynamique : économie calculée + robinet choisi + formule + total
Le client voit son projet se construire en direct.

**3. Transitions entre sections**
À la fin de chaque section, une phrase de transition naturelle qui donne envie de descendre — pas un bouton CTA agressif, une invitation :
- Après calcul : *"Maintenant que vous savez combien vous économisez... choisissez votre robinet ↓"*
- Après robinet : *"Parfait. Choisissons ensemble votre formule d'abonnement ↓"*
- Après formule : *"Plus qu'une étape — personnalisez votre pack ↓"*

**4. Effet reveal au scroll**
Chaque section n'apparaît que quand le client y arrive — pas tout affiché d'un coup. Apparition douce (fade + légère translation vers le haut, 300ms). Guide l'attention, évite la surcharge cognitive.

---

## SECTION 0 — INTRO : "Voici ce qui vous attend"

**Objectif :** Montrer le chemin avant de le parcourir. Réduire l'anxiété ("combien de temps ?"), créer la curiosité ("je veux voir la suite"). Le client doit vouloir aller jusqu'au bout avant même de commencer.

**Structure visuelle :**

Titre principal : *"Arrêtez de payer pour de l'eau en bouteille."*
Sous-titre : *"En 3 minutes, calculez vos économies, choisissez votre robinet et recevez votre pack personnalisé."*

Les 4 étapes affichées horizontalement (desktop) ou en scroll horizontal (mobile) :

| Étape | Icône | Titre | Description courte |
|---|---|---|---|
| 1 | 💧 | Vos économies | Calculez ce que vous dépensez vraiment |
| 2 | 🚿 | Votre robinet | Choisissez Pure, Spark ou One |
| 3 | 📦 | Votre formule | Abonnement transparent, zéro surprise |
| 4 | ✨ | Votre pack | Personnalisez vos accessoires |

Sous les 4 étapes : bouton principal *"Commencer →"* qui déclenche le scroll vers la Section 1.

Ton visuel : sobre, premium, confiant. Pas de feux d'artifice. Une promesse claire.

---

## SECTION 1 — CALCUL DES ÉCONOMIES

**Objectif :** Le client calcule lui-même combien il dépense en eau embouteillée. Le chiffre annuel doit "claquer". Il se convainc seul.

### Sous-étape A — Quelle eau achetez-vous ?

Sélection enseigne :
**Carrefour / Monoprix / Intermarché / E.Leclerc / Auchan**

Puis sélection marque + format avec prix pack affiché en grand et prix/L en petit.

**BASE DE DONNÉES COMPLÈTE — EAUX PLATES :**

**Carrefour :**
| Marque | Format | Prix pack | Prix/L |
|---|---|---|---|
| Carrefour Classic' (MDD) | 6×1,5L | 0,85€ | 0,09€/L |
| Cristaline | 6×1,5L | 1,39€ | 0,15€/L |
| Mont Roucous | 6×1L | 3,29€ | 0,55€/L |
| Vittel | 6×1L | 3,40€ | 0,57€/L |
| Vittel | 6×1,5L | 4,10€ | 0,46€/L |
| Volvic | 6×1L | 3,95€ | 0,66€/L |
| Volvic | 6×1,5L | 4,09€ | 0,45€/L |
| Evian | 6×50cl | 3,09€ | 1,03€/L |
| Evian | 6×1L | 3,69€ | 0,62€/L |
| Evian | 6×1,5L | 4,49€ | 0,50€/L |

**Monoprix :**
| Marque | Format | Prix pack | Prix/L |
|---|---|---|---|
| Monoprix (MDD) | 6×50cl | 1,85€ | 0,62€/L |
| Cristaline | 6×1,5L | 1,39€ | 0,15€/L |
| Vittel | 6×1L | 3,29€ | 0,55€/L |
| Volvic | 6×1L | 3,95€ | 0,66€/L |
| Volvic | 6×1,5L | 4,09€ | 0,45€/L |
| Evian | 6×50cl | 3,09€ | 1,03€/L |
| Evian | 6×1L | 3,69€ | 0,62€/L |
| Wattwiller | 6×1,5L | 4,45€ | 0,49€/L |

**E.Leclerc :**
| Marque | Format | Prix pack | Prix/L |
|---|---|---|---|
| Eaux MR (MDD) | 6×1,5L | 0,79€ | 0,09€/L |
| Cristaline | 6×1,5L | 1,25€ | 0,14€/L |
| Vittel | 6×1,5L | 3,65€ | 0,41€/L |
| Volvic | 6×1,5L | 3,89€ | 0,43€/L |
| Evian | 6×1L | 3,49€ | 0,58€/L |
| Evian | 6×1,5L | 4,29€ | 0,48€/L |

**Auchan :**
| Marque | Format | Prix pack | Prix/L |
|---|---|---|---|
| Auchan (MDD) | 6×1,5L | 0,82€ | 0,09€/L |
| Cristaline | 6×1,5L | 1,35€ | 0,15€/L |
| Vittel | 6×1,5L | 4,05€ | 0,45€/L |
| Volvic | 6×1,5L | 4,05€ | 0,45€/L |
| Evian | 6×1,5L | 4,49€ | 0,50€/L |

**Intermarché :**
| Marque | Format | Prix pack | Prix/L |
|---|---|---|---|
| Cristaline | 6×1,5L | 1,29€ | 0,14€/L |
| Vittel | 6×1,5L | 3,95€ | 0,44€/L |
| Volvic | 6×1,5L | 3,99€ | 0,44€/L |
| Evian | 6×1,5L | 4,39€ | 0,49€/L |

**BASE DE DONNÉES COMPLÈTE — EAUX GAZEUSES :**

**Carrefour :**
| Marque | Format | Prix pack | Prix/L |
|---|---|---|---|
| Perrier | 6×1L | 5,79€ | 0,97€/L |
| Perrier | 8×20cl | 4,45€ | 2,78€/L |
| Badoit | 6×50cl | 3,85€ | 1,28€/L |
| Badoit | 6×1L | 5,89€ | 0,98€/L |
| San Pellegrino | 6×1L | 5,19€ | 0,87€/L |

**Monoprix :**
| Marque | Format | Prix pack | Prix/L |
|---|---|---|---|
| Perrier | 8×20cl | 4,45€ | 2,78€/L |
| Badoit | 6×50cl | 3,85€ | 1,28€/L |
| San Pellegrino | 6×1L | 5,19€ | 0,87€/L |
| Cristaline pétillante | 6×1,5L | 2,00€ | 0,22€/L |

**E.Leclerc :**
| Marque | Format | Prix pack | Prix/L |
|---|---|---|---|
| Perrier | 6×1L | 5,29€ | 0,88€/L |
| Perrier | 6×1,5L | 6,89€ | 0,77€/L |
| Badoit | 6×50cl | 3,59€ | 1,20€/L |
| Badoit | 6×1L | 5,49€ | 0,92€/L |
| San Pellegrino | 6×1L | 4,89€ | 0,82€/L |
| Salvetat | 6×1,15L | 3,49€ | 0,51€/L |
| Cristaline pétillante | 6×1,5L | 1,99€ | 0,22€/L |

Note discrète sous le sélecteur : *"Prix moyens constatés, peuvent varier selon promotions et régions"*

---

### Sous-étape B — Quelle est votre consommation ?

- Saisie en **packs ou bouteilles par semaine** (option : par mois)
- Ne jamais demander en litres — les gens pensent en achats
- Calcul en temps réel :
  - Volume en litres (calculé automatiquement, affiché en petit)
  - Coût mensuel
  - **Coût annuel affiché en très grand** — c'est le chiffre choc

Sous-titre dynamique selon le montant annuel :
- < 100€ : *"Soit le prix d'un bon restaurant chaque année"*
- 100–250€ : *"Soit l'équivalent d'un week-end en famille chaque année"*
- 250–500€ : *"Soit presque le prix d'un billet d'avion aller-retour"*
- > 500€ : *"Soit le prix d'un robinet Hydrao — chaque année"*

**Phrase de transition :** *"Maintenant que vous savez combien vous dépensez... voyons combien vous pouvez économiser ↓"*

---

## SECTION 2 — CHOIX DU ROBINET

**Objectif :** Présenter les 3 produits clairement, avec leurs fonctions précises, sans jargon technique. Le bon robinet pour le bon foyer.

### Les 3 produits — fonctions détaillées

**Hydrao Pure — 490€ TTC**
- ✅ Eau filtrée — filtrée et purifiée directement au robinet, goût amélioré, chlore éliminé
- ✅ Eau bouillante instantanée — 100°C à la demande, fini la bouilloire
- ❌ Pas d'eau gazeuse
- ❌ Pas d'eau froide réfrigérée
- 👤 Idéal pour : célibataires, couples, amateurs de thé/café, cuisiniers

**Hydrao Spark — 890€ TTC**
- ✅ Eau filtrée — filtrée et purifiée directement au robinet
- ✅ Eau gazeuse — pétillante à la demande, fin des bouteilles Perrier/Badoit
- ✅ Eau froide réfrigérée — rafraîchissante sans glaçons
- ❌ Pas d'eau bouillante
- 👤 Idéal pour : amateurs d'eau gazeuse, familles qui remplacent les bouteilles pétillantes

**Hydrao One — 990€ TTC**
- ✅ Eau filtrée — filtrée et purifiée directement au robinet
- ✅ Eau bouillante instantanée — 100°C à la demande
- ✅ Eau gazeuse — pétillante à la demande
- ✅ Eau froide réfrigérée — rafraîchissante sans glaçons
- ✅ Le tout-en-un — un seul robinet remplace tout
- 👤 Idéal pour : familles, grands consommateurs, ceux qui veulent tout sans compromis

### Mise en page des 3 cartes

- 3 cartes côte à côte sur desktop, empilées sur mobile
- Hydrao One mis légèrement en avant (card plus grande ou surélevée) — badge *"Le plus complet"*
- Sur chaque carte : nom + liste des fonctions avec ✅/❌ + prix + bouton *"Choisir"*
- Les ❌ sont affichés discrètement — pas pour culpabiliser, juste pour aider à choisir

**Phrase de transition :** *"Parfait. Choisissons maintenant votre formule d'abonnement ↓"*

---

## SECTION 3 — CHOIX DE LA FORMULE

**Objectif :** Transparence totale sur les coûts récurrents. Zéro surprise. Et révéler le pack de bienvenue comme une bonne nouvelle.

### Règle fondamentale — adaptation selon le robinet choisi

**Hydrao Pure (sans gazeux) :**
→ Abonnement **filtres uniquement** — pas de CO₂ car pas de fonction gazeuse

**Hydrao Spark et Hydrao One (avec gazeux) :**
→ Abonnement **filtres + cartouches CO₂**

Le contenu des cartes s'adapte automatiquement selon le robinet sélectionné en Section 2.

### Tableau des formules

| | **Essentiel** | **Standard** | **Plus** |
|---|---|---|---|
| **Prix** | **59€/an** | **99€/an** | **119€/an** |
| **Pour** | 1–2 personnes | 3–4 personnes | 5+ personnes |
| **Filtres/an** | 2 | 4 | 6 |
| **CO₂ (Spark/One)** | 4 cartouches | 8 cartouches | 12 cartouches |
| **Livraison** | Incluse | Prioritaire | Express |
| **Rappels auto** | ✅ | ✅ | ✅ |
| **Check-up** | — | 1/an offert | 2/an offerts |
| **Pièces usure** | — | — | Prix réduit |

### Toggle rythme de paiement

3 options visuelles : **Mensuel / Trimestriel / Annuel**
Badge *"Meilleur tarif"* sur Annuel.

| Rythme | Essentiel | Standard | Plus |
|---|---|---|---|
| Mensuel | 4,92€/mois | 8,25€/mois | 9,92€/mois |
| Trimestriel | 14,25€/trim. | 23,75€/trim. | 28,50€/trim. |
| Annuel | 59€/an | 99€/an | 119€/an |

### Pack de bienvenue — révélation après sélection

Titre : *"Et avec votre formule, vous recevez aussi..."*
Apparition progressive des objets (animation douce) — effet de découverte.

**Essentiel :** 2 verres 1L + 2 Tritan 1L + 2 Tritan 50cl — *Valeur ~40€ offerts*
**Standard :** 3 verres 1L + 3 Tritan 1L + 3 Tritan 50cl + 1 carafe ouverte — *Valeur ~75€ offerts*
**Plus :** 4 verres 1L + 4 Tritan 1L + 4 Tritan 50cl + 1 carafe ouverte + 1 carafe fermée pétillante + 1 thermos — *Valeur ~120€ offerts*

Micro-texte discret : *"Tous vos accessoires sont personnalisables à l'étape suivante — couleurs, logo, prénom."*

Bande de réassurance :
- ✅ Résiliable à tout moment, sans frais
- ✅ Livraison incluse
- ✅ Rappel automatique avant chaque envoi
- ✅ Prix fixe garanti, aucune mauvaise surprise

**Phrase de transition :** *"Plus qu'une étape — personnalisez votre pack ↓"*

---

## SECTION 4 — PERSONNALISATION DU PACK

**Objectif :** Créer l'implication émotionnelle finale. Le client co-crée son produit. À ce stade l'abandon est psychologiquement coûteux.

Titre : *"Votre pack, à votre image"*
Sous-titre : *"Choisissez vos couleurs. Ajoutez un prénom si vous le souhaitez. On s'occupe du reste."*

### Bloc 1 — Couleur des liserés

8 pastilles visuelles cliquables (min 44px pour le touch mobile) :
- Bordeaux Hydrao (sélectionné par défaut — couleur signature)
- Blanc
- Noir mat
- Or/Doré
- Vert sauge
- Bleu nuit
- Rose poudré
- Gris anthracite

**Une couleur s'applique à tous les accessoires du pack** — pas de couleur différente par objet.
Label : *"S'applique à l'ensemble de votre pack"*

Au clic : tous les visuels se mettent à jour instantanément (transition 150ms).

### Bloc 2 — Aperçu visuel du pack

Tous les objets du pack affichés avec la couleur choisie. Logo Hydrao visible sur chaque objet. Grille ou disposition libre, fond neutre, visuels soignés.

### Bloc 3 — Prénoms optionnels

Uniquement sur les objets éligibles : **Tritan 1L, Tritan 50cl, Thermos**

Pour chaque objet éligible :
- Champ texte discret : *"Ajouter un prénom (optionnel)"*
- Maximum 12 caractères
- Aperçu du prénom sur le visuel en temps réel
- Si plusieurs exemplaires (ex : 3 Tritan 1L) : champ par bouteille, libellés "Bouteille 1", "Bouteille 2", "Bouteille 3"
- Jamais obligatoire, jamais mis en avant comme requis

### Bloc 4 — Bouteilles supplémentaires

Section discrète, pas agressive :
*"Besoin de bouteilles supplémentaires ?"*
- Tritan 1L — 7€ pièce
- Tritan 50cl — 5€ pièce
- Verre 1L — 8€ pièce
- Thermos — 10€ pièce

### Bloc 5 — Récapitulatif final

Synthèse visuelle complète avant validation :
- Robinet choisi + prix
- Formule + rythme de paiement + prix
- Pack de bienvenue avec couleur et prénoms
- Éventuelles bouteilles supplémentaires
- **Total commande**

### CTA final

Bouton : *"Confirmer ma commande →"*

Sous le bouton :
- 🚚 *Livraison sous 5–7 jours ouvrés*
- 🔄 *Satisfait ou remboursé 30 jours*
- 🔒 *Paiement 100% sécurisé*

---

## INSTRUCTIONS TECHNIQUES GLOBALES

- **One-page scroll** — zéro rechargement, zéro navigation entre pages
- **Barre de progression fixe** en haut pendant tout le parcours (4 étapes)
- **Résumé flottant** qui se construit au fur et à mesure (desktop : côté droit / mobile : bas d'écran)
- **Effet reveal** — chaque section apparaît au scroll (fade + translation douce 300ms)
- **Phrases de transition** entre chaque section — pas de boutons CTA agressifs
- **Mémorisation des choix** — chaque sélection alimente les sections suivantes et le résumé flottant
- **Mises à jour temps réel** partout — prix, visuels, récapitulatif
- **Mobile-first 375px** — pastilles 44px minimum, graphiques simplifiés, résumé en bandeau bas
- **Palette Hydrao** stricte — bordeaux, marron foncé, accents clairs
- **Animations légères** — fluidité avant spectaculaire, jamais plus de 300ms
- **Accessibilité** — contraste suffisant, textes lisibles, boutons touch-friendly