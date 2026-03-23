# HYDRAO — Liste complète des corrections pour Figma Make
## Audit du site effectué le 28/02/2026

---

## 🔴 CRITIQUE — À corriger en priorité absolue (bloquant)

### 1. Prix erronés sur la page "Choisissez votre HYDRAO"
**Problème :** La page configurateur affiche "Trois robinets, un seul prix : 490€" — c'est faux et trompeur.
**Correction :** Les vrais prix sont :
- Hydrao Pure → 490€ TTC
- Hydrao Spark → 890€ TTC
- Hydrao One → 990€ TTC

Supprimer la ligne "Trois robinets, un seul prix : 490€" et afficher le prix propre à chaque carte.

---

### 2. Calculateur sans saisie ni calcul réel
**Problème :** En scrollant depuis la home, le tunnel passe directement de la sélection du type d'eau (plate/gazeuse/les deux) aux cartes robinets — sans étape de saisie de quantité, sans résultat chiffré personnalisé. Le calcul réel est absent.
**Correction :** Implémenter le flow complet :
1. Choix type d'eau → affichage des marques avec prix moyens
2. Choix marque + format → saisie quantité (bouteilles/semaine ou packs/mois) sur le même écran
3. Calcul en temps réel : coût mensuel + coût annuel
4. Bouton "Voir mes économies →" apparaît dès que quantité > 0
5. Affichage des deux cadres résultats (dépenses actuelles + économies Hydrao sur 1 an et 5 ans)
6. SEULEMENT ENSUITE → section choix du robinet

---

### 3. Chiffre "1 248€ par an" figé et non personnalisé
**Problème :** Le bloc sur la home affiche une valeur fixe "Un foyer français dépense en moyenne 1 248€ par an" pour tout le monde, sans calcul. C'est contradictoire avec la promesse du calculateur personnalisé.
**Correction :** Ce chiffre doit soit :
- Être supprimé du bloc statique de la home (il n'a pas sa place là)
- Ou être remplacé par une fourchette honnête : "Entre 50€ et 2 500€/an selon votre foyer et votre marque"
Le vrai chiffre personnalisé doit uniquement apparaître APRÈS que le client a complété le calculateur.

---

### 4. Récapitulatif final affiche "Robinet total : 0€"
**Problème :** Les sélections faites dans le tunnel (robinet, formule) ne sont pas mémorisées. Le récapitulatif final affiche 0€ au lieu du total réel.
**Correction :** Implémenter la mémorisation de tous les choix à travers le tunnel :
- Robinet choisi + prix
- Formule + rythme de paiement + prix
- Bouteilles supplémentaires éventuelles
- Total dynamique mis à jour à chaque sélection

---

## 🟠 IMPORTANT — À corriger rapidement

### 5. Retirer le résumé flottant "Votre configuration"
**Problème :** Le rectangle "Votre configuration" flottant en haut à droite doit être supprimé.
**Correction :** Supprimer complètement ce composant — desktop et mobile.

---

### 6. CO₂ absent des formules d'abonnement Spark et One
**Problème :** La page abonnements est générique et ne mentionne pas les cartouches CO₂ pour les robinets avec fonction gazeuse.
**Correction :** Le contenu des formules doit s'adapter au robinet choisi dans le tunnel :
- Hydrao Pure → filtres uniquement
- Hydrao Spark → filtres + cartouches CO₂ (4 / 8 / 12 selon la formule)
- Hydrao One → filtres + cartouches CO₂ (4 / 8 / 12 selon la formule)

---

### 7. Incohérence du badge "Le plus populaire / Le plus choisi"
**Problème :** Dans le tunnel, le badge est bien sur Hydrao One. Mais sur la page configurateur séparée ("Choisissez votre HYDRAO"), c'est Hydrao Spark qui a le badge "Le plus populaire".
**Correction :** Sur toutes les pages et dans le tunnel, le badge doit être :
- Hydrao One → "Le plus choisi"
- Hydrao Spark → "Le préféré des familles"

---

### 8. Prix boutique incohérents avec la nomenclature validée
**Problème :** Les prix affichés en boutique ne correspondent pas aux prix définis.
**Correction :**
| Produit | Prix affiché (actuel) | Prix correct |
|---|---|---|
| Tritan 50cl | 15€ | 5€ |
| Tritan 1L | non affiché séparément | 7€ |
| Bouteille verre 1L | 18€ | 8€ |
| Thermos | 25€ | 10€ |
| Pack 2 filtres | 39€ | À valider avec le client |
| Pack 3 cartouches CO₂ | 29€ | À valider avec le client |

---

### 9. "Eau chaude" apparaît comme fonction de Hydrao Spark avec ❌
**Problème :** Dans les cartes robinets du tunnel, Hydrao Spark affiche "Eau chaude" avec un ❌. Cette fonction ne devrait pas apparaître sur Spark — elle n'est pas pertinente pour ce produit. Seul Pure et One ont l'eau bouillante, et c'est "Eau bouillante" pas "Eau chaude".
**Correction :** Supprimer la ligne "Eau chaude" de la carte Hydrao Spark. Les fonctions correctes par produit sont :

**Hydrao Pure (490€) :**
- ✅ Eau filtrée (chlore éliminé, goût amélioré)
- ✅ Eau bouillante instantanée (100°C à la demande)
- ❌ Eau gazeuse
- ❌ Eau froide réfrigérée

**Hydrao Spark (890€) :**
- ✅ Eau filtrée (chlore éliminé, goût amélioré)
- ✅ Eau gazeuse à la demande (fini les bouteilles Perrier/Badoit)
- ✅ Eau froide réfrigérée (rafraîchissante sans glaçons)
- ❌ Eau bouillante

**Hydrao One (990€) :**
- ✅ Eau filtrée (chlore éliminé, goût amélioré)
- ✅ Eau bouillante instantanée (100°C à la demande)
- ✅ Eau gazeuse à la demande (pétillante illimitée)
- ✅ Eau froide réfrigérée (rafraîchissante sans glaçons)

---

### 10. Barre de progression trop intrusive
**Problème :** La barre de progression flotte au milieu de l'écran et cache du contenu pendant le scroll.
**Correction :** Repositionner la barre de progression :
- Petit rectangle arrondi, fin, subtil
- Position : flottant en haut de l'écran, EN DESSOUS du menu principal
- Ne doit pas cacher le contenu
- Apparaît uniquement à partir du début du parcours (après le bouton "Commencer")
- Style discret — pas de rectangle plein collé à la barre de navigation

---

## 🟡 MINEUR — À corriger pour le polish final

### 11. Fautes de frappe à corriger

| Emplacement | Texte actuel | Correction |
|---|---|---|
| Footer du tunnel | "Satisfait oufait remboursé 30 jours" | "Satisfait ou remboursé 30 jours" |
| Page concept 5-en-1 | "On fait chauffeur" | "On fait chauffer" |
| Page abonnements | "Livraison Exprimer" (formule Plus) | "Livraison Express" |
| Page abonnements | "1/une offre" (check-up Standard) | "1/an offert" |
| Page abonnements | "2/an offres" (check-up Plus) | "2/an offerts" |

---

### 12. Section personnalisation non visible dans le tunnel
**Problème :** La section de personnalisation (couleurs + prénoms) n'est pas visible ou fonctionnelle dans le parcours tunnel. L'étape "Pack de Mon" dans la barre de progression n'est jamais atteinte.
**Correction :** Implémenter la section 4 du tunnel avec :
- Sélecteur de couleur par objet (8 pastilles, min 44px)
- Champ prénom optionnel sur Tritan et thermos
- Aperçu visuel en temps réel
- Bouteilles supplémentaires avec personnalisation individuelle au moment de l'ajout
- Récapitulatif visuel final complet

---

### 13. Formules d'abonnement — montant annuel sous les prix mensuels/trimestriels
**Problème :** Quand on sélectionne "Mensuel" ou "Trimestriel", le prix affiché ne montre pas l'équivalent annuel.
**Correction :** Sous chaque prix mensuel ou trimestriel, afficher en petit :
- Mensuel 4,92€/mois → *soit 59€/an*
- Trimestriel 14,75€/trim. → *soit 59€/an*
Pas de badge "Meilleur tarif" — les prix sont identiques quelle que soit la fréquence.

---

### 14. Feedback visuel absent sur le choix des eaux
**Problème :** Quand le client clique sur une eau dans le calculateur, le clic n'est pas confirmé visuellement — il n'y a pas de highlight, pas d'animation, pas de coche.
**Correction :**
- Highlight immédiat de la carte sélectionnée (bordure bordeaux, légère ombre)
- Animation douce de confirmation (150ms)
- Croix ✕ visible sur chaque eau sélectionnée pour la supprimer
- Bouton "Recommencer" pour tout effacer
- Affichage clair des eaux sélectionnées avant la saisie de quantité

---

### 15. Bouton "Voir mes économies" n'apparaît pas dès quantité = 1
**Problème :** Le bouton n'apparaît qu'à partir d'une quantité de 2, pas dès que le client saisit une valeur > 0.
**Correction :** Le bouton "Voir mes économies →" doit apparaître dès que la quantité saisie est supérieure à 0 (même 1 bouteille/semaine).

---

### 16. Résultats économies — ajouter l'économie sur 1 an
**Problème :** Le graphique et les résultats ne montrent que les économies sur 5 ans.
**Correction :** Afficher les deux :
- Économie sur 1 an : +X€
- Économie sur 5 ans : +Y€
Le point de rentabilisation "Rentabilisé en X mois" doit être mis en évidence sur le graphique.

---

## RÉSUMÉ DES PRIORITÉS

| Priorité | Nb de corrections | Impact |
|---|---|---|
| 🔴 Critique | 4 | Bloquant pour la conversion |
| 🟠 Important | 6 | Nuit à la crédibilité et à la cohérence |
| 🟡 Mineur | 6 | Polish et finitions |
| **Total** | **16** | |