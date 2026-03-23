# HYDRAO — Prompt Complet Figma Make (version finale)
## Tunnel de conversion intégré dans la home page

---

## CONTEXTE & IDÉOLOGIE

Hydrao est une marque française qui commercialise des robinets multifonctions remplaçant définitivement l'eau embouteillée. Stratégie volume et accessibilité — prix cassés pour toucher le maximum de foyers.

**Les 3 produits :**
- **Hydrao Pure** — Eau bouillante instantanée + eau filtrée — 490€ TTC
- **Hydrao Spark** — Eau froide réfrigérée + eau gazeuse à la demande + eau filtrée — 890€ TTC
- **Hydrao One** — Eau bouillante + froide + gazeuse + filtrée (tout-en-un) — 990€ TTC

**Les 3 formules d'abonnement :**
- **Essentiel** — 59€/an — 1-2 personnes
- **Standard** — 99€/an — 3-4 personnes
- **Plus** — 119€/an — 5+ personnes

**Philosophie :** Pas de vente agressive. Transparence totale. Le client se convainc par ses propres chiffres.

---

## IDENTITÉ VISUELLE

- Marque : **Hydrao**
- Palette : palette officielle Hydrao — bordeaux, marron foncé, accents clairs
- Typographie : display font distinctif pour les chiffres clés — éviter Inter/Arial/Roboto
- Ton : direct, honnête, chaleureux — phrases courtes, jamais d'exclamations vides
- Mobile-first : 375px d'abord, desktop ensuite

---

## ARCHITECTURE GÉNÉRALE

Le tunnel de conversion **s'intègre dans la home page existante** — il ne la remplace pas. Après le contenu existant de la home, le parcours s'enchaîne naturellement en scroll vertical continu. Le client descend comme dans un ascenseur, guidé d'étape en étape.

**Éléments persistants pendant tout le scroll :**

**1. Barre de progression fixe en haut**
4 étapes : Économies → Robinet → Formule → Mon pack
L'étape active est mise en surbrillance.

**2. Résumé flottant**
- Desktop : carte fixe côté droit
- Mobile : bandeau discret en bas
Contenu : économie calculée + robinet choisi + formule + total — se remplit au fur et à mesure.

**3. Phrases de transition entre sections**
Invitations naturelles à descendre, pas de boutons CTA agressifs :
- Après calcul : *"Maintenant que vous savez combien vous dépensez... choisissez votre robinet ↓"*
- Après robinet : *"Parfait. Choisissons ensemble votre formule ↓"*
- Après formule : *"Plus qu'une étape — personnalisez votre pack ↓"*

**4. Effet reveal au scroll**
Chaque section apparaît à l'arrivée (fade + légère translation, 300ms). Évite la surcharge cognitive.

---

## SECTION 0 — INTRO DU PARCOURS

Intégrée dans la home page, avant le calculateur.

Titre : *"Arrêtez de payer pour de l'eau en bouteille."*
Sous-titre : *"En 3 minutes, calculez vos économies, choisissez votre robinet et recevez votre pack personnalisé."*

Les 4 étapes affichées horizontalement :

| Étape | Icône | Titre | Description courte |
|---|---|---|---|
| 1 | 💧 | Vos économies | Calculez ce que vous dépensez vraiment |
| 2 | 🚿 | Votre robinet | Choisissez Pure, Spark ou One |
| 3 | 📦 | Votre formule | Abonnement transparent, zéro surprise |
| 4 | ✨ | Votre pack | Personnalisez vos accessoires |

Bouton : *"Commencer →"* — déclenche le scroll vers la Section 1.

---

## SECTION 1 — CALCULATEUR D'ÉCONOMIES

### Mode d'entrée

Proposer deux modes dès le départ :
- **Mode complet** (affiché en premier, mis en avant) — le client renseigne ses eaux précisément
- **Mode rapide** — estimation rapide par nombre de personnes

---

### MODE COMPLET (premier et prioritaire)

#### Étape A — Type d'eau

Trois options visuelles cliquables :
- 💧 **Eau plate**
- 🫧 **Eau gazeuse**
- 💧🫧 **Les deux**

Le client peut avoir de l'eau plate ET gazeuse — les deux sont cumulables. Plusieurs marques, plusieurs formats peuvent être ajoutés simultanément.

#### Étape B — Choix des eaux (même écran, pas d'étape suivante)

Selon le type sélectionné, afficher les marques disponibles.

**Important : l'enseigne n'apparaît jamais dans l'interface.** Les prix sont calculés en arrière-plan à partir d'une moyenne multi-enseignes. Mention discrète sous les prix : *"Prix moyen constaté en grande surface"*

**EAUX PLATES — marques et formats :**

| Marque | Formats disponibles | Prix unitaire moy. | Prix pack moy. |
|---|---|---|---|
| **Cristaline** | 50cl / 1L / 1,5L | 0,23€ / 0,26€ / 0,23€ | 6×1,5L : 1,32€ |
| **Evian** | 50cl / 1L / 1,5L | 0,52€ / 0,62€ / 0,49€ | 6×1,5L : 4,39€ |
| **Volvic** | 1L / 1,5L | 0,66€ / 0,45€ | 6×1,5L : 4,02€ |
| **Vittel** | 1L / 1,5L | 0,57€ / 0,44€ | 6×1,5L : 3,94€ |
| **Wattwiller** | 1,5L | 0,50€ | 6×1,5L : 4,45€ |
| **Mont Roucous** | 1L | 0,55€ | 6×1L : 3,29€ |
| **MDD enseigne** | 1,5L | 0,09€ | 6×1,5L : 0,83€ |

*MDD = Marque De Distributeur (Carrefour Classic', Marque Repère Leclerc, Auchan...)*

**EAUX GAZEUSES — marques et formats :**

| Marque | Formats disponibles | Prix unitaire moy. | Prix pack moy. |
|---|---|---|---|
| **Perrier** | 20cl / 1L / 1,5L | 0,56€ / 0,97€ / 0,77€ | 6×1L : 5,54€ |
| **Badoit** | 50cl / 1L | 0,64€ / 0,95€ | 6×1L : 5,69€ |
| **San Pellegrino** | 1L | 0,85€ | 6×1L : 5,09€ |
| **Salvetat** | 1,15L | 0,51€ | 6×1,15L : 3,49€ |
| **Cristaline pétillante** | 1,5L | 0,22€ | 6×1,5L : 1,99€ |

**Présentation des formats par marque :**
Pour chaque marque sélectionnée, afficher tous les formats disponibles avec :
- Format (ex : 50cl)
- Prix à l'unité
- Prix du pack (ex : 6×50cl)
- Bouton "Choisir ce format"

Le client peut ajouter **plusieurs marques et formats** — ils s'accumulent dans un récapitulatif visible.
Bouton *"+ Ajouter une autre eau"* pour cumuler.

#### Étape C — Quantités (même écran, pas d'étape suivante)

Pour chaque eau ajoutée, afficher directement en dessous :
- *"Combien en achetez-vous ?"*
- Saisie : **bouteilles par semaine** OU **packs par mois** (toggle au choix)
- Calcul en temps réel : coût mensuel + coût annuel pour cette eau

Total cumulé de toutes les eaux ajoutées mis à jour en temps réel.

**Le bouton "Voir mes économies →" apparaît seulement après qu'au moins une quantité a été saisie.**
Ce bouton amène au bloc résultats — pas à une nouvelle étape de saisie.

---

### BLOC RÉSULTATS (après clic sur "Voir mes économies →")

Deux cadres visuels distincts, l'un sous l'autre :

**Cadre 1 — Dépenses actuelles (psychologie subtile)**
Titre sobre : *"Ce que vous dépensez aujourd'hui"*
Afficher :
- Dépense mensuelle en eau embouteillée
- **Dépense annuelle en grand** — chiffre mis en valeur visuellement
- Équivalent contextuel en petit et subtil :
  - *"Soit X semaines de courses alimentaires"*
  - *"Soit X pleins d'essence"*
  - *"Soit X nuits d'hôtel"*
- Volume en litres par an (affiché discrètement)
- Sur 5 ans : total cumulé

Ton : factuel, jamais culpabilisant. Le chiffre parle de lui-même.

**Cadre 2 — Vos économies avec Hydrao**
Titre : *"Ce que vous économiseriez avec Hydrao"*
- Graphique 5 ans (2 courbes) :
  - Courbe actuelle : coût cumulé embouteillé (monte linéairement)
  - Courbe Hydrao : pic année 1 (achat + abonnement), plateau bas années 2–5
  - Point d'intersection surligné : *"Rentabilisé en X mois"*
- Économie totale sur 5 ans affichée en grand
- Les 3 robinets proposés avec leur économie calculée sur 5 ans

Phrase de transition : *"Quel robinet vous correspond ? ↓"*

---

### MODE RAPIDE

Pour les visiteurs qui veulent une estimation sans détails :
- Sélection : nombre de personnes dans le foyer (1 / 2 / 3-4 / 5+)
- Calcul automatique basé sur la consommation moyenne nationale (135L/personne/an, prix moyen 0,35€/L)
- Affichage immédiat du cadre résultats

---

## SECTION 2 — CHOIX DU ROBINET

**Hydrao Pure — 490€ TTC**
- ✅ Eau filtrée — purifiée au robinet, chlore éliminé, goût amélioré
- ✅ Eau bouillante instantanée — 100°C à la demande, fini la bouilloire
- ❌ Pas d'eau gazeuse
- ❌ Pas d'eau froide réfrigérée
- 👤 Idéal pour : célibataires, couples, amateurs de thé/café, cuisiniers

**Hydrao Spark — 890€ TTC**
- ✅ Eau filtrée — purifiée au robinet, chlore éliminé, goût amélioré
- ✅ Eau gazeuse à la demande — fini les bouteilles Perrier/Badoit/San Pellegrino
- ✅ Eau froide réfrigérée — rafraîchissante sans glaçons
- ❌ Pas d'eau bouillante
- 👤 Idéal pour : amateurs d'eau gazeuse, familles qui remplacent les bouteilles pétillantes

**Hydrao One — 990€ TTC**
- ✅ Eau filtrée — purifiée au robinet, chlore éliminé, goût amélioré
- ✅ Eau bouillante instantanée — 100°C à la demande
- ✅ Eau gazeuse à la demande — pétillante illimitée
- ✅ Eau froide réfrigérée — rafraîchissante sans glaçons
- ✅ Tout-en-un — un seul robinet remplace tout
- 👤 Idéal pour : familles, grands consommateurs, ceux qui veulent tout

**Mise en page :** 3 cartes côte à côte. Hydrao One légèrement surélevé, badge *"Le plus complet"*. Fonctions affichées avec ✅/❌ clairs. Les ❌ sont discrets — pas pour culpabiliser, pour aider à choisir.

---

## SECTION 3 — FORMULE D'ABONNEMENT

**Titre : *"Zéro surprise. Voici exactement ce que vous payez."***

### Adaptation automatique selon le robinet choisi

**Hydrao Pure (sans gazeux) :** filtres uniquement dans l'abonnement
**Hydrao Spark et Hydrao One (avec gazeux) :** filtres + cartouches CO₂

### Les 3 formules

| | **Essentiel** | **Standard** | **Plus** |
|---|---|---|---|
| **Prix annuel** | **59€/an** | **99€/an** | **119€/an** |
| **Pour** | 1–2 personnes | 3–4 personnes | 5+ personnes |
| **Filtres/an** | 2 | 4 | 6 |
| **CO₂ (Spark/One)** | 4 cartouches | 8 cartouches | 12 cartouches |
| **Livraison** | Incluse | Prioritaire | Express |
| **Rappels auto** | ✅ | ✅ | ✅ |
| **Check-up** | — | 1/an offert | 2/an offerts |
| **Pièces usure** | — | — | Prix réduit |

### Toggle rythme de paiement

3 options : **Mensuel / Trimestriel / Annuel**
Sous chaque prix mensuel ou trimestriel : afficher en petit *"soit X€/an"*
**Pas de badge "Meilleur tarif"** — les prix sont les mêmes, ne pas induire en erreur.

| Rythme | Essentiel | Standard | Plus |
|---|---|---|---|
| Mensuel | 4,92€/mois *(soit 59€/an)* | 8,25€/mois *(soit 99€/an)* | 9,92€/mois *(soit 119€/an)* |
| Trimestriel | 14,75€/trim. *(soit 59€/an)* | 24,75€/trim. *(soit 99€/an)* | 29,75€/trim. *(soit 119€/an)* |
| Annuel | 59€/an | 99€/an | 119€/an |

### Pack de bienvenue — révélation après sélection

Apparition progressive après choix de formule — effet de découverte.
Titre : *"Et avec votre formule, vous recevez aussi..."*

**Essentiel :** 2 verres 1L + 2 Tritan 1L + 2 Tritan 50cl → *~40€ offerts*
**Standard :** 3 verres 1L + 3 Tritan 1L + 3 Tritan 50cl + 1 carafe ouverte → *~75€ offerts*
**Plus :** 4 verres 1L + 4 Tritan 1L + 4 Tritan 50cl + 1 carafe ouverte + 1 carafe fermée pétillante + 1 thermos → *~120€ offerts*

Micro-texte : *"Tous vos accessoires sont personnalisables à l'étape suivante — couleurs et prénoms."*

Réassurance :
- ✅ Résiliable à tout moment, sans frais
- ✅ Livraison incluse
- ✅ Rappel automatique avant chaque envoi
- ✅ Prix fixe garanti

---

## SECTION 4 — PERSONNALISATION

**Titre : *"Votre pack, à votre image"***
**Sous-titre : *"Choisissez vos couleurs. Ajoutez un prénom si vous le souhaitez."***

### Ce qui est personnalisable

- **Couleur des liserés** : choisissable **individuellement par objet** — chaque bouteille/verre/carafe/thermos peut avoir sa propre couleur
- **Prénom** : optionnel, uniquement sur Tritan et thermos
- **Pas de logo** — retiré du processus de personnalisation

### Palette de couleurs (par objet)

Pour chaque objet du pack, proposer 8 pastilles cliquables (min 44px touch) :
Bordeaux Hydrao (défaut) / Blanc / Noir mat / Or / Vert sauge / Bleu nuit / Rose poudré / Gris anthracite

Aperçu visuel de l'objet mis à jour instantanément à chaque clic (150ms).

### Prénoms optionnels

Uniquement sur : Tritan 1L, Tritan 50cl, Thermos
- Champ discret sous chaque objet : *"Ajouter un prénom (optionnel)"*
- Max 12 caractères
- Aperçu en temps réel sur le visuel
- Si plusieurs exemplaires : champ par objet ("Bouteille 1", "Bouteille 2"...)
- Jamais obligatoire

### Bouteilles supplémentaires

Section discrète :
*"Besoin de bouteilles supplémentaires ?"*
- Tritan 1L — 7€ / Tritan 50cl — 5€ / Verre 1L — 8€ / Thermos — 10€

### Récapitulatif final

Synthèse visuelle complète :
- Robinet + prix
- Formule + rythme + prix
- Pack personnalisé avec couleurs et prénoms
- Extras éventuels
- **Total commande**

### CTA final

*"Confirmer ma commande →"*

Sous le bouton :
- 🚚 Livraison sous 5–7 jours ouvrés
- 🔄 Satisfait ou remboursé 30 jours
- 🔒 Paiement 100% sécurisé

---

## INSTRUCTIONS TECHNIQUES GLOBALES

- Le tunnel s'intègre dans la home page — pas une page séparée
- One-page scroll, zéro rechargement
- Barre de progression fixe (4 étapes) pendant tout le parcours
- Résumé flottant se construisant au fur et à mesure
- Effet reveal au scroll (fade + translation 300ms)
- Mémorisation de tous les choix entre sections
- Mises à jour temps réel partout
- Mobile-first 375px
- Palette Hydrao stricte
- Animations légères max 300ms