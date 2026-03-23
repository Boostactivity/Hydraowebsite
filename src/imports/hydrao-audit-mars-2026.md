# HYDRAO — AUDIT COMPLET DU SITE
## Analyse exhaustive page par page — Mars 2026

---

## PAGE HOME

### ✅ Points forts
- Hero fort : "Le robinet que vous n'achèterez qu'une fois" + "Votre cuisine, enfin logique."
- Sous-titre concis et percutant : "Eau bouillante pour le thé. Filtrée pour boire. Pétillante pour l'apéro."
- Bande bordeaux efficace : "Rentabilisé en 6 mois • Livraison sous 5 à 7 jours • Noté 4,9/5 par nos clients"
- Trust signals sous le CTA : "30 jours satisfait | Certifié ACS + CE | Installation pro incluse"
- Citation fondateurs bien écrite, ton honnête
- Les 4 étapes du tunnel bien présentées avec icônes

### ❌ Problèmes identifiés

**1. Section prix de la home — prix erroné et message trompeur**
Le bloc "490€ aujourd'hui. Des milliers économisés demain." affiche "HYDRAO coûte 490€ — Une seule fois. Pour toujours." Cette affirmation est fausse puisque Pure = 490€, Spark = 890€, One = 990€. Un visiteur qui lit la home repart avec l'idée que le produit coûte 490€ — c'est trompeur pour 2 des 3 modèles.
**Correction :** Remplacer par "À partir de 490€" ou supprimer le prix fixe de cette section.

**2. "Amorti en 5 mois" — chiffre non justifié**
Le badge "Amorti en 5 mois" apparaît juste sous le bloc prix mais aucune base de calcul n'est fournie. Pour qui ? Avec quelle marque ? Quelle quantité ? Ce chiffre est invérifiable et pourrait être contesté.
**Correction :** Soit le relier au calculateur ("selon votre profil — calculez le vôtre"), soit l'afficher comme fourchette "entre 5 et 18 mois selon votre consommation".

**3. "-92% de dépenses sur 5 ans" — même problème**
Même chiffre non sourcé, non personnalisé.

**4. "Un foyer français dépense en moyenne 1 248€ par an" — faux**
Ce chiffre est statique et non personnalisé. La réalité dépend du foyer, de la marque et de la quantité. La fourchette réelle va de ~180€/an (MDD, 1 personne, modéré) à plus de 2 500€/an (Évian, 4 personnes, intensif).
**Correction :** Remplacer par "Entre 180€ et 2 500€ selon votre foyer" ou supprimer et renvoyer vers le calculateur.

**5. Tunnel — bouton "Commencer" non fonctionnel au scroll**
Le tunnel démarre automatiquement en scrollant sans que l'utilisateur clique "Commencer". Le bouton "Commencer" existe mais le tunnel s'ouvre aussi en scrollant — comportement incohérent.

**6. Tunnel — étape "Vos économies" : pas de résultat affiché**
Après avoir sélectionné une marque et saisi une quantité, aucun résultat de calcul n'apparaît dans la version tunnel de la home. Le client passe directement aux cartes robinets sans avoir vu ses économies.

**7. Tunnel — récapitulatif final "Total robinet : 0€"**
Les sélections faites dans le tunnel ne sont pas mémorisées. Le récapitulatif affiche 0€.

**8. Tunnel — "Satisfait oufait remboursé 30 jours"**
Faute de frappe dans le footer du tunnel. Doit être "Satisfait ou remboursé 30 jours".

**9. Tunnel home vs page calculateur dédiée : deux outils différents**
Le tunnel de la home propose 3 types d'eau (plate / gazeuse / les deux) et un affichage par liste déroulante. La page calculateur dédiée n'a que 2 choix (plate / gazeuse) et un affichage en grille. Les deux outils ont des UX complètement différentes — c'est incohérent et l'un est moins complet que l'autre.
**Correction :** Uniformiser les deux ou n'en garder qu'un.

---

## PAGE CALCULATEUR DÉDIÉ ("Calculez vos économies")

### ✅ Points forts
- Titre accrocheur : "Découvrez en 30 secondes ce que HYDRAO change pour vous"
- Flow bien structuré en étapes numérotées (1. Type d'eau / 2. Marque / 3. Format / 4. Quantité)
- Fourchettes de prix affichées (ex : 0,89€ - 0,99€)
- "Mode complet / Mode simple" — bonne idée

### ❌ Problèmes identifiés

**10. "Prix moyen" affiché ne correspond pas à la fourchette — BUG SYSTÉMATIQUE**
Pour chaque marque, le "Prix moyen" affiché est erroné. Il ne correspond pas à la moyenne de la fourchette affichée juste en dessous. Exemples constatés :
- Cristaline 1×1,5L : affiche "Prix moyen : 0,16€" mais fourchette réelle 0,23€-0,25€ → devrait être ~0,24€
- Évian 1×1,5L : affiche "Prix moyen : 0,16€" mais fourchette réelle 0,89€-0,99€ → devrait être ~0,94€
- Eaux de source Marque Repère 1×1,5L : affiche "Prix moyen : 0,16€" mais fourchette 0,15€-0,15€ → OK, mais le prix moyen de 0,16€ ne correspond pas à 0,15€
Le prix moyen affiché semble être celui de la première marque MDD (Auchan Source Montcalm) qui "colle" sur toutes les autres. C'est un bug de state React où la valeur n'est pas réinitialisée au changement de marque.
**Correction :** Recalculer le prix moyen dynamiquement = (min + max) / 2 à chaque changement de marque.

**11. "Salut" au lieu de "La Salvetat"**
La marque gazeuse s'appelle "La Salvetat", pas "Salut". Faute de saisie.
**Correction :** Renommer en "La Salvetat".

**12. Formatage des formats non uniforme**
Certains formats s'écrivent "6×1,5L" (sans espace), d'autres "6 × 50 cl" (avec espaces et unité séparée). Incohérence visuelle.
**Correction :** Uniformiser en "6×1,5L", "6×50cl", etc.

**13. Page calculateur sans option "Les deux" (plate + gazeuse)**
Contrairement au tunnel de la home qui propose "Eau plate / Eau gazeuse / Les deux", la page dédiée n'a que 2 choix. Un foyer qui achète les deux types d'eau ne peut pas tout calculer en une fois.
**Correction :** Ajouter l'option "Les deux" avec possibilité de sélectionner une marque pour chaque type.

**14. Résultats du calculateur absents**
Même après avoir sélectionné type d'eau + marque + format + quantité, aucun résultat (dépenses actuelles, économies avec Hydrao, graphique, rentabilisation) n'est affiché. Le calculateur ne calcule pas.
**Correction :** Implémenter l'affichage du résultat : dépenses actuelles (mensuel + annuel), économies sur 1 an et 5 ans, mois de rentabilisation.

**15. "Mode simple" — non testé / probablement non fonctionnel**
Le bouton "Mode simple" existe mais le contenu derrière n'a pas pu être vérifié. À vérifier.

**16. Aucune marque MDD gazeuse**
Les marques de MDD ne sont listées que pour l'eau plate. Aucune MDD gazeuse (ex : Carrefour pétillante, Auchan pétillante). À ajouter si les enseignes en vendent.

**17. Marques potentiellement manquantes selon la cible**
Hépar (plate très minéralisée, profil médical), Saint-Yorre (gazeuse très minéralisée) — à confirmer avec le client si pertinent pour leur cible.

---

## PAGE "CHOISISSEZ VOTRE HYDRAO" (configurateur)

### ✅ Points forts
- Cartes robinets claires avec liste fonctions ✅/❌
- Description "Idéal pour" bien ciblée

### ❌ Problèmes identifiés

**18. "Trois robinets, un seul prix : 490€" — FAUX**
La page affiche encore ce message alors que les prix sont 490€ / 890€ / 990€.
**Correction :** Afficher le prix propre à chaque carte.

**19. Badge "Le plus populaire" sur Spark**
Dans cette page, c'est Spark qui a le badge. Dans le tunnel de la home, c'est One qui a "Le plus choisi". Incohérence.
**Correction :** One → "Le plus choisi" partout. Spark → "Le préféré des familles" partout.

**20. "Eau chaude" listée avec ❌ sur Spark**
La fonction "Eau chaude" n'a pas lieu d'être sur Spark. Spark n'a pas d'eau chaude ni d'eau bouillante — cette ligne crée de la confusion.
**Correction :** Supprimer la ligne "Eau chaude" de la carte Spark.

**21. Fonctions correctes par robinet — à vérifier**
À confirmer que les ✅/❌ correspondent bien à :
- Pure : filtrée ✅ bouillante ✅ gazeuse ❌ froide réfrigérée ❌
- Spark : filtrée ✅ bouillante ❌ gazeuse ✅ froide réfrigérée ✅
- One : filtrée ✅ bouillante ✅ gazeuse ✅ froide réfrigérée ✅

---

## PAGE "PRIX ET ABONNEMENTS"

### ✅ Points forts
- 3 formules bien différenciées (Essentiel / Standard / Plus)
- Tableau comparatif clair
- Toggle mensuel / trimestriel / annuel bien fait

### ❌ Problèmes identifiés

**22. Formules non adaptées au robinet choisi**
Les 3 formules sont identiques quelle que soit la route d'accès. Si le client arrive après avoir choisi Spark ou One, la page devrait mentionner les cartouches CO₂ incluses. En l'état : aucune mention de CO₂.
**Correction :**
- Pure → filtres uniquement (actuel OK)
- Spark → filtres + cartouches CO₂ (4/8/12 selon formule)
- One → filtres + cartouches CO₂ (4/8/12 selon formule)

**23. Fautes dans les libellés de formule**
- Standard : "Check-up : 1/une offert" → doit être "1/an offert"
- Plus : "Check-up : 2/an offerts" → le pluriel devrait être "2/an offerts" — OK mais "Livraison : Livraison Exprimer" → doit être "Livraison Express"

**24. Aucun équivalent annuel sous les prix mensuels/trimestriels**
Quand on clique "Mensuel" on voit 4,92€/mois sans mention que ça fait 59€/an. Le client ne peut pas comparer facilement.
**Correction :** Ajouter en petits caractères "soit X€/an" sous chaque prix.

**25. Les prix sont identiques quelle que soit la fréquence**
Essentiel = 59€/an que ce soit en mensuel, trimestriel ou annuel. Il n'y a aucun avantage à payer annuellement. C'est un choix délibéré, mais si c'est le cas il faudrait le dire clairement ("même prix quelle que soit la fréquence — choisissez celle qui vous convient").

---

## PAGE CONCEPT / "DÉCOUVRIR HYDRAO"

### ✅ Points forts
- Ton remarquable : factuel, sans sur-vente, honnête
- "HYDRAO ne cherche pas à impressionner. Il cherche à corriger une incohérence du quotidien." — excellente phrase
- Structure en 5 fonctions bien présentée

### ❌ Problèmes identifiés

**26. "On fait chauffeur l'eau" → "On fait chauffer l'eau"**
Faute de frappe.

**27. Pas de lien direct vers le calculateur depuis cette page**
Après avoir lu la page concept, le client convaincu n'a pas de CTA clair vers "Calculer mes économies". Il y a un bouton générique en bas mais pas positionné au bon moment dans la lecture.

---

## PAGE BOUTIQUE

### ✅ Points forts
- Filtres par catégorie (Tout / Filtres / CO₂ / Bouteilles / Accessoires)
- "Besoin d'un abonnement ? Voir les formules" — bon cross-sell

### ❌ Problèmes identifiés

**28. Prix incohérents avec la nomenclature définie**

| Produit | Prix affiché | Prix correct |
|---|---|---|
| Pack 2 Filtres Premium | 39€ | À valider |
| Pack 3 Cartouches CO₂ | 29€ | À valider |
| Bouteille Verre 50cl | 12€ | Non prévu dans la nomenclature |
| Bouteille Tritan 50cl | 15€ | 5€ défini |
| Bouteille Verre 1L | 18€ | 8€ défini |
| Thermos | 25€ | 10€ défini |
| Tritan 1L | non visible | 7€ défini |

**29. Images produits absentes — placeholder partout**
Tous les produits affichent une icône de boîte générique à la place de la photo produit. Aucune image réelle n'est présente.
**Correction :** Intégrer les visuels produits pour chaque article.

**30. Bouton "Ajouter au panier" — panier non fonctionnel**
Le panier (icône en haut à droite du menu) est présent mais aucun article ne s'y ajoute réellement. À vérifier si le flow complet d'achat est implémenté.

**31. Catégorie "Bouteilles" — contenu à revoir**
La nomenclature définie prévoit : Tritan 50cl, Tritan 1L, Verre 1L, Thermos. La boutique affiche des produits dont les prix ne correspondent pas et "Bouteille Verre 50cl" qui n'était pas dans la nomenclature initiale.

---

## NAVIGATION GLOBALE

### ❌ Problèmes identifiés

**32. Menu "Découvrir HYDRAO" — libellé du sous-menu non vérifié**
Le dropdown "Découvrir HYDRAO ∨" du menu principal masque les sous-pages. Contenu à vérifier.

**33. "Prix et abonnements" vs "Prix & Abonnements"**
Le libellé varie entre pages (esperluette vs "et"). À uniformiser.

**34. Incohérence de navigation : deux calculateurs accessibles**
"Calculez vos économies" dans le menu renvoie vers la page dédiée. Mais la home a aussi son propre calculateur intégré dans le tunnel. Deux chemins différents pour un même objectif, deux expériences différentes — c'est déroutant.

---

## DONNÉES MARQUES ET PRIX DU CALCULATEUR

### Eaux plates — liste complète constatée
| Marque | Formats | Prix constatés | Problème |
|---|---|---|---|
| Auchan Source Montcalm | 1×1,5L / 6×1,5L | 0,16€ / 0,82€ | Prix moyen affiché = correct |
| Carrefour Classic' | 1×1,5L / 6×1,5L | 0,17€ / 0,85€ | Prix moyen affiché incorrect (affiche 0,16€) |
| Cristaline | 1×1,5L / 6×1,5L | 0,23-0,25€ / 1,25-1,39€ | Prix moyen affiché = 0,16€ → BUG |
| Eaux de source Marque Repère | 1×1,5L / 6×1,5L | 0,15€ / 0,79€ | Prix moyen affiché incorrect |
| Évian | 1×50cl / 6×50cl / 1×1L / 6×1L / 1×1,5L / 6×1,5L | Fourchettes variées | Prix moyen affiché = 0,16€ → BUG GRAVE |
| Intermarché Pâturages | À vérifier | À vérifier | — |
| Monoprix Source Claire | À vérifier | À vérifier | — |
| Mont Roucous | À vérifier | À vérifier | — |
| Vittel | À vérifier | À vérifier | — |
| Volvic | À vérifier | À vérifier | — |
| Wattwiller | À vérifier | À vérifier | — |

### Eaux gazeuses — liste complète constatée
| Marque | Formats | Prix constatés | Problème |
|---|---|---|---|
| Badoit | 1×50cl / 6×50cl / 1×1L / 6×1L | Corrects | Formatage incohérent "6 × 50 cl" vs "6×1L" |
| Cristaline pétillante | 1×1,5L / 6×1,5L | 0,39€ / 2,00€ | — |
| Perrier | 1×20cl / 8×20cl / 1×1L / 6×1L | 0,69€ / 4,45€ / 1,14€ / 5,54€ | — |
| **"Salut"** | 1×1,15L / 6×1,15L | 0,69€ / 3,50€ | **NOM ERRONÉ → doit être "La Salvetat"** |
| San Pellegrino | 1×1L / 6×1L | 1,06€ / 5,09€ | — |

---

## BUGS TECHNIQUES

**35. Variable "0" rendue visible dans le DOM**
Entre la section saisie de quantité et la section robinets dans le tunnel home, un chiffre "0" apparaît en texte brut sur la page. C'est une variable JavaScript non masquée qui se rend dans le rendu HTML.
**Correction :** Wrapper la variable dans une condition `if > 0` avant affichage, ou la masquer avec `display: none` quand vide.

**36. Barre de progression à 0% visible en permanence**
La barre de progression affichée en bas de chaque section du calculateur reste à "0%" même quand le client avance dans les étapes. Elle n'est pas connectée à la progression réelle.
**Correction :** Connecter la barre à l'état réel du formulaire (étape 1 → 25%, étape 2 → 50%, etc.)

**37. Barre de progression positionnée de façon intrusive**
La barre flotte au milieu de l'écran et chevauche le contenu plutôt que d'être discrète en haut de page.

**38. État de sélection non réinitialisé au changement de catégorie**
Quand on passe de "Eau gazeuse" à "Eau plate", la sélection de marque gazeuse précédente reste parfois visible ou influence le "Prix moyen" affiché pour les marques plates. Bug de state management.

**39. Extension AIBUY (1688) affichée sur le site**
Un bouton orange "1688 AIBUY" apparaît en bas à droite de toutes les pages — c'est une extension Chrome installée sur la machine de développement qui s'affiche dans les screenshots. Ce n'est pas un bug du site mais il faut s'assurer que rien d'externe ne s'injecte dans les pages en production.

---

## RÉCAPITULATIF PAR PRIORITÉ

### 🔴 CRITIQUE — Bloquant conversion (9 problèmes)
1. Prix "490€" affiché comme unique prix du produit sur la home → trompeur
2. "Trois robinets, un seul prix : 490€" sur le configurateur → faux
3. Bug prix moyen calculateur → ne correspond pas à la fourchette affichée (systématique)
4. Calculateur ne calcule pas → aucun résultat affiché
5. Récapitulatif tunnel → "Total robinet : 0€" (sélections non mémorisées)
6. "Salut" au lieu de "La Salvetat" → erreur sur nom de marque
7. Images boutique absentes → produits sans photo
8. Faute "Satisfait oufait remboursé" dans le tunnel
9. Variable "0" visible dans le DOM

### 🟠 IMPORTANT — Nuit à la crédibilité (13 problèmes)
10. "Amorti en 5 mois" et "-92%" non sourcés, non personnalisés
11. "1 248€/an" figé non personnalisé
12. Deux calculateurs différents (home vs page dédiée) — expériences incohérentes
13. Calculateur dédié sans option "Les deux" (plate + gazeuse)
14. Abonnements non adaptés au robinet choisi (CO₂ absent pour Spark/One)
15. Badge "Le plus populaire" sur Spark (configurateur) vs "Le plus choisi" sur One (tunnel)
16. "Eau chaude ❌" sur la carte Spark → ne devrait pas figurer
17. Prix boutique incohérents avec nomenclature définie (Tritan 50cl à 15€ au lieu de 5€, etc.)
18. Formatage des formats non uniforme (6×1,5L vs 6 × 50 cl)
19. Barre de progression à 0% non connectée
20. State non réinitialisé au changement de marque
21. "Livraison Exprimer" au lieu de "Livraison Express"
22. "1/une offert" au lieu de "1/an offert"

### 🟡 MINEUR — Polish (6 problèmes)
23. "On fait chauffeur" → "On fait chauffer" (page concept)
24. "Prix et abonnements" vs "Prix & Abonnements" (navigation)
25. Pas de CTA vers calculateur depuis la page concept
26. Pas d'équivalent annuel sous les prix mensuels/trimestriels
27. Tunnel démarre au scroll sans clic "Commencer"
28. Barre progression intrusive (position)

**Total : 28 problèmes identifiés**