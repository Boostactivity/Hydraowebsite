# HYDRAO — Prompt 3 / 3 : La Personnalisation
## "Faites-en le vôtre."

---

## CONTEXTE GÉNÉRAL

Dernière étape du tunnel de conversion. Le visiteur arrive ici avec :
- Son SKU choisi (SKU2 / SKU1 / SKU3) — mémorisé depuis Step 1
- Sa formule d'abonnement (Essentiel / Standard / Plus) — mémorisée depuis Step 2
- Son pack de bienvenue déjà connu — il sait ce qu'il va recevoir

L'objectif de ce step est **l'implication émotionnelle finale**. Le visiteur co-crée son produit. Il ne commande plus un robinet — il commande *son* robinet, *ses* bouteilles, avec *ses* couleurs et *son* prénom. À ce stade, abandonner le panier est psychologiquement coûteux.

---

## PSYCHOLOGIE DE CE STEP

**Principe clé :** moins de choix = plus de conversion. Ne jamais afficher plus de 2–3 décisions à la fois. L'interface doit donner l'impression que tout est simple et rapide.

**Ton :** pas "Personnalisez votre commande" (administratif). Plutôt *"On a pensé à tout — maintenant pensez à vous"* (invitation chaleureuse).

**Ordre des décisions :**
1. Couleur des liserés (s'applique à tous les accessoires en une seule sélection)
2. Aperçu en temps réel de chaque objet avec la couleur choisie
3. Prénom optionnel (uniquement sur Tritan et thermos — pas obligatoire, jamais forcé)
4. Récapitulatif visuel complet avant validation

---

## CE QUI EST PERSONNALISABLE

### Règle par objet

| Objet | Couleur liserés | Logo Hydrao | Prénom |
|---|---|---|---|
| Verres en verre 1L | ✅ | ✅ (automatique) | ❌ |
| Bouteilles Tritan 1L | ✅ | ✅ (automatique) | ✅ optionnel |
| Bouteilles Tritan 50cl | ✅ | ✅ (automatique) | ✅ optionnel |
| Carafe ouverte | ✅ | ✅ (automatique) | ❌ |
| Carafe fermée pétillante | ✅ | ✅ (automatique) | ❌ |
| Thermos | ✅ | ✅ (automatique) | ✅ optionnel |

**Le logo Hydrao est appliqué automatiquement sur tous les objets** — pas de choix à faire, pas de question posée. C'est la marque, elle est présente par défaut.

---

## PALETTE DE COULEURS DES LISERÉS

Proposer les couleurs suivantes sous forme de **pastilles visuelles cliquables** (jamais de dropdown) :

- Bordeaux Hydrao (couleur signature — sélectionné par défaut)
- Blanc
- Noir mat
- Or/Doré
- Vert sauge
- Bleu nuit
- Rose poudré
- Gris anthracite

**Une seule couleur sélectionnée s'applique à l'ensemble des accessoires du pack** — pas de couleur différente par objet (trop complexe, nuit à la conversion). L'unité visuelle est un argument de vente en soi.

---

## FLOW UX — ÉTAPE PAR ÉTAPE

### Bloc 1 — Titre et intro
Titre : *"Votre pack, à votre image"*
Sous-titre : *"Choisissez vos couleurs. Ajoutez votre prénom si vous le souhaitez. On s'occupe du reste."*

### Bloc 2 — Sélection couleur liserés
- 8 pastilles de couleur côte à côte
- Bordeaux Hydrao sélectionné par défaut
- Au clic sur une pastille : tous les visuels d'objets se mettent à jour instantanément
- Label sous les pastilles : *"S'applique à tous vos accessoires"*

### Bloc 3 — Aperçu visuel du pack
Afficher tous les objets inclus dans le pack (selon la formule choisie au Step 2) :
- Visuels propres, fond neutre, liserés de la couleur choisie
- Objets disposés de manière attractive (pas une liste verticale — grille ou disposition libre)
- Logo Hydrao visible sur chaque objet
- Animation douce quand la couleur change (transition 150ms)

### Bloc 4 — Prénoms optionnels
Afficher uniquement les objets qui acceptent un prénom : **Tritan 1L, Tritan 50cl, Thermos**

Pour chaque objet acceptant un prénom :
- Champ texte discret en dessous du visuel : *"Ajouter un prénom (optionnel)"*
- Maximum 12 caractères
- Aperçu du prénom sur le visuel en temps réel
- Si le champ est laissé vide : objet livré sans prénom, aucun problème
- Ne jamais forcer, ne jamais mettre "obligatoire"

Si la formule contient plusieurs Tritan 1L (ex : Standard = 3×Tritan 1L) :
- Proposer un champ par bouteille : *"Bouteille 1", "Bouteille 2", "Bouteille 3"*
- Laisser libre — certains mettront des prénoms différents par membre de la famille

### Bloc 5 — Bouteilles supplémentaires
Section discrète, pas mise en avant comme upsell agressif :
*"Besoin de bouteilles supplémentaires ?"*
- Tritan 1L — 7€ pièce
- Tritan 50cl — 5€ pièce
- Verre 1L — 8€ pièce
- Thermos — 10€ pièce
Bouton simple "Ajouter" sur chaque ligne. Quantité modifiable.

### Bloc 6 — Récapitulatif final
Avant le CTA de validation, afficher un récapitulatif visuel complet :

**Votre commande :**
- SKU sélectionné + prix
- Formule abonnement + rythme de paiement + prix
- Pack de bienvenue avec couleur choisie et prénoms saisis
- Éventuelles bouteilles supplémentaires
- **Total commande**

Mise en page sobre et claire — pas un tableau administratif, une belle synthèse visuelle.

### Bloc 7 — CTA final
Bouton principal : *"Confirmer ma commande →"*
Ton chaleureux, pas commercial.

Sous le bouton — 3 éléments de réassurance finaux :
- 🚚 *"Livraison sous 5–7 jours ouvrés"*
- 🔄 *"Satisfait ou remboursé 30 jours"*
- 🔒 *"Paiement 100% sécurisé"*

---

## CONTRAINTES TECHNIQUES

- Aperçu couleur mis à jour instantanément au clic (pas de loader)
- Prénoms affichés en temps réel sur les visuels
- Récapitulatif mis à jour dynamiquement à chaque modification
- Aucun champ obligatoire sauf la couleur (déjà pré-sélectionnée)
- Mobile-first 375px — pastilles de couleur adaptées au touch (min 44px)
- Palette Hydrao (bordeaux, marron foncé, accents clairs)
- Transitions légères 150–300ms — fluidité avant spectaculaire
- Zéro rechargement de page

---

## TON GLOBAL DE LA PAGE

Pas d'exclamations vides. Pas de "Incroyable !" ou "Profitez-en !".
Des phrases courtes, directes, chaleureuses.
L'utilisateur doit sentir que la marque **l'a pensé pour lui** — pas qu'elle essaie de lui vendre quelque chose.

*"On a pensé à tout pour que vous n'ayez à penser à rien."*