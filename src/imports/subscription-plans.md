# HYDRAO — Prompt 2 / 3 : Les Abonnements
## "Zéro surprise. Tout est inclus. Voici exactement ce que vous recevrez."

---

## CONTEXTE GÉNÉRAL

Ce step s'inscrit dans un tunnel de conversion en 3 étapes. Le visiteur vient du Step 1 (calculateur ROI) où il a déjà :
- Calculé combien il dépense en eau embouteillée
- Choisi son SKU Hydrao (SKU2 / SKU1 / SKU3)
- Sélectionné son nombre de personnes (→ formule Essentiel / Standard / Plus)

**Ces informations doivent être pré-remplies automatiquement** à l'arrivée sur ce Step 2. Le visiteur ne recommence pas de zéro.

---

## PSYCHOLOGIE DE CE STEP

Le modèle abonnement est perçu comme un piège par le consommateur français — prix caché, recharge imposée, résiliation impossible. Hydrao doit être l'exact opposé : **la transparence totale comme argument de vente**.

Ordre narratif de la page :
1. **Rassurer** → "Voici exactement ce que vous payez, sans surprise"
2. **Révéler** → "Et en plus, voici ce que vous recevez à l'ouverture de votre pack"
3. **Flexibiliser** → "Choisissez votre rythme de paiement"

---

## LES 3 FORMULES D'ABONNEMENT

### Règle fondamentale — Adaptation selon le SKU

**SKU2 (Bouillant + Filtré, sans fonction gazeuse) :**
→ Abonnement **filtres uniquement** — pas de cartouches CO₂ car le produit n'a pas cette fonction

**SKU1 (Froid + Gazeux + Filtré) :**
→ Abonnement **filtres + cartouches CO₂**

**SKU3 (Complet : bouillant + froid + gazeux + filtré) :**
→ Abonnement **filtres + cartouches CO₂**

Le contenu affiché dans les 3 cartes doit s'adapter automatiquement selon le SKU mémorisé depuis le Step 1.

---

### Tableau des formules

| | **Essentiel** | **Standard** | **Plus** |
|---|---|---|---|
| **Prix** | **59€/an** | **99€/an** | **119€/an** |
| **Pour** | 1–2 personnes | 3–4 personnes | 5+ personnes |
| **Usage** | Modéré | Régulier | Intensif |
| **Filtres/an** | 2 | 4 | 6 |
| **CO₂ (SKU1/SKU3 uniquement)** | 4 cartouches | 8 cartouches | 12 cartouches |
| **Livraison** | Incluse | Prioritaire | Express |
| **Rappels automatiques** | ✅ | ✅ | ✅ |
| **Check-up technique** | — | 1/an offert | 2/an offerts |
| **Pièces d'usure** | — | — | Prix réduit |

La formule correspondant au nombre de personnes choisi au Step 1 doit être **pré-sélectionnée et mise en avant visuellement** (card active, bordure bordeaux, badge "Votre formule").

---

### Rythme de paiement

Toggle visible et simple — 3 options :

| Rythme | Essentiel | Standard | Plus |
|---|---|---|---|
| **Mensuel** | 4,92€/mois | 8,25€/mois | 9,92€/mois |
| **Trimestriel** | 14,25€/trim. | 23,75€/trim. | 28,50€/trim. |
| **Annuel** | 59€/an | 99€/an | 119€/an |

Badge **"Meilleur tarif"** sur l'option annuelle.
Les prix se mettent à jour en temps réel au clic sur le toggle.

---

## LE PACK DE BIENVENUE — "On a pensé à tout"

Cette section apparaît **après** la sélection de la formule — effet de révélation, pas affiché d'emblée.

Titre de section : *"Votre pack de bienvenue — inclus dès le premier envoi"*

Le contenu du pack s'adapte à la formule sélectionnée :

### Formule Essentiel
- 2 verres en verre 1L (pour la table)
- 2 bouteilles Tritan 1L (nomades)
- 2 bouteilles Tritan 50cl (nomades)
- **Valeur perçue estimée : ~40€ offerts**

### Formule Standard
- 3 verres en verre 1L (pour la table)
- 3 bouteilles Tritan 1L (nomades)
- 3 bouteilles Tritan 50cl (nomades)
- 1 carafe ouverte (eau plate/filtrée à table)
- **Valeur perçue estimée : ~75€ offerts**

### Formule Plus
- 4 verres en verre 1L (pour la table)
- 4 bouteilles Tritan 1L (nomades)
- 4 bouteilles Tritan 50cl (nomades)
- 1 carafe ouverte (eau plate/filtrée)
- 1 carafe fermée hermétique (pour conserver l'eau pétillante — conserve le gaz)
- 1 thermos
- **Valeur perçue estimée : ~120€ offerts**

### Personnalisation (mentionner sans détailler — le Step 3 s'en charge)
Micro-texte discret sous le pack : *"Tous vos accessoires sont personnalisables — couleur, logo, prénom. Vous choisirez au Step suivant."*

---

## ÉLÉMENTS DE RÉASSURANCE

À afficher de manière discrète mais visible tout au long de la page :

- ✅ "Résiliable à tout moment, sans frais"
- ✅ "Livraison incluse dans votre abonnement"
- ✅ "Rappel automatique avant chaque envoi"
- ✅ "Aucune mauvaise surprise — prix fixe garanti"
- ✅ "Paiement sécurisé"

---

## CE QUE FIGMA MAKE DOIT CONSTRUIRE

**Structure de la page :**

1. **Header de contexte** — rappel discret du SKU et du calcul d'économie depuis le Step 1 : *"Vous économisez X€/an avec votre robinet SKU[X]"*

2. **Titre principal fort** — *"Zéro surprise. Voici exactement ce que vous payez."*

3. **Toggle rythme de paiement** — mensuel / trimestriel / annuel, bien visible en haut

4. **3 cartes formules** — côte à côte sur desktop, empilées sur mobile. La formule pré-sélectionnée est mise en avant (card surélevée, bordure active, badge). Contenu de la card adapté au SKU (avec ou sans CO₂).

5. **Section pack de bienvenue** — révélée après sélection de formule. Présentation visuelle type "unboxing" : les objets apparaissent progressivement, pas une liste à puces. Badge valeur perçue bien visible.

6. **Micro-texte personnalisation** — lien vers Step 3

7. **Bande de réassurance** — icônes + textes courts

8. **CTA** — *"Choisir cette formule →"* — mène vers le Step 3 (personnalisation)

**Contraintes techniques :**
- Transitions fluides, zéro rechargement
- Prix du toggle mis à jour en temps réel
- Pack de bienvenue révélé progressivement (animation d'apparition des objets)
- Mobile-first 375px
- Palette Hydrao (bordeaux, marron foncé, accents clairs)
- Mémoriser la formule sélectionnée pour pré-remplir le Step 3