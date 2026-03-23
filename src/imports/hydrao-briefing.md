HYDRAO — Briefing Figma Make IA
Tunnel de conversion en 3 Steps : Économie → Transparence → Implication

CONTEXTE & IDÉOLOGIE
Hydrao commercialise un système de robinet multifonction (eau filtrée, bouillante, pétillante) qui remplace définitivement l'eau embouteillée. Le produit existe en 3 SKUs :

SKU2 — Bouillant+Filtré : 490€ TTC
SKU1 — Froid+Gazeux+filtré : 890€ TTC
SKU3 — Complet 5-en-1 : 990€ TTC

L'abonnement annuel (consommables) existe en 3 formules selon le nombre de personnes dans le foyer :

Essentiel : 59€/an (1-2 personnes)
Standard : 99€/an (3-4 personnes)
Plus : 119€/an (5+ personnes)

Paiement disponible en mensuel, trimestriel ou annuel.
La philosophie de marque : Hydrao ne vend pas un gadget premium inaccessible. Hydrao rend accessible à tous les foyers ce que seules les familles aisées pouvaient se permettre (Quooker à 1 100€, Zip HydroTap à 2 500€). La stratégie est le volume : marges serrées, prix cassés, marché de masse — France d'abord, Europe ensuite.
L'ennemi commun : L'eau embouteillée. Coûteuse, polluante, encombrante. Le client doit se convaincre lui-même que l'achat Hydrao est une évidence économique — pas un luxe, une économie.

PSYCHOLOGIE DU TUNNEL — TÊTE → CŒUR → MAINS
Le tunnel suit une progression psychologique précise et délibérée :

La Raison — convaincre l'intellect par les chiffres
La Confiance — rassurer sur la transparence et l'absence de mauvaises surprises
L'Attachement — créer une implication émotionnelle par la personnalisation

À chaque étape, le client franchit un palier d'engagement. Quand il arrive à la personnalisation, il est déjà mentalement propriétaire du produit. Le taux d'abandon s'effondre.

IDENTITÉ VISUELLE
Marque : Hydrao
Palette : Utiliser la palette officielle Hydrao (Figma la connaît). Dominantes bordeaux/marron foncé, accents clairs. Sobre, premium, accessible — pas clinique, pas gadget.
Ton : Direct, honnête, chaleureux. Pas de jargon technique. Pas de superlatifs vides. Des chiffres, des faits, des promesses tenues.
Typographie : Moderne, lisible, légèrement premium. Éviter les polices génériques (Inter, Arial, Roboto). Préférer un display font distinctif pour les chiffres clés (économies, prix).


STEP 1 — LE CALCULATEUR ROI
"Combien vous coûte vraiment l'eau embouteillée ?"
Objectif
Transformer une dépense invisible (l'eau embouteillée achetée pack par pack) en chiffre annuel concret et choquant. Le client se convainc lui-même. Aucun argumentaire de vente nécessaire.
Cible
Tous les foyers français qui achètent de l'eau embouteillée régulièrement — soit ~70% des foyers. Primaire : familles 2-5 personnes, budget conscient, sensibilité écologique modérée à forte.
Méthodologie UX
Le calculateur se déroule en 3 sous-étapes fluides, sans rechargement de page, tout en temps réel :
Sous-étape A — Quelle eau achetez-vous ?

Sélection de l'enseigne (Carrefour, Monoprix, Intermarché, E.Leclerc, Auchan)
Sélection de la marque (Cristaline, Evian, Vittel, Volvic, Perrier, Badoit, San Pellegrino, MDD...)
Sélection du format (50cl, 1L, 1,5L)
Affichage automatique : prix du pack TTC + prix au litre
Note discrète : "Prix moyens constatés selon enseignes, peuvent varier"

Sous-étape B — Quelle est votre consommation ?

Entrée en packs ou bouteilles par semaine (pas en litres — les gens pensent en achats, pas en volumes)
Possibilité de saisir aussi par mois
Calcul en temps réel : coût mensuel / coût annuel affiché immédiatement
Sous-titre dynamique selon le montant : "Soit l'équivalent d'un week-end en famille chaque année"

Sous-étape C — Choisissez votre robinet Hydrao

3 cartes SKU présentées : SKU2 490€ / SKU1 890€ / SKU3 990€
Pour chaque SKU : ce qu'il fait, pour qui, le prix
Sélection du nombre de personnes → proposition automatique de la formule d'abonnement (59/99/119€)
Affichage du comparatif sur 5 ans :

Courbe eau embouteillée (cumul linéaire)
Courbe Hydrao (pic à l'achat puis plateau bas)
Point d'intersection = année de rentabilité mis en évidence visuellement
Économie totale sur 5 ans affichée en grand



Ce que Figma Make doit construire

Interface épurée, pas de receipt/ticket de caisse
Chiffres clés en très grande typographie (l'économie annuelle doit "claquer")
Graphique 5 ans interactif (survol des années)
Transitions fluides entre les 3 sous-étapes (pas de rechargement)
Bouton CTA final : "Je veux économiser X€/an" (valeur personnalisée)
100% responsive mobile-first (majorité des conversions sur mobile)
Couleurs Hydrao, aucune couleur générique



STEP 2 — LES ABONNEMENTS
"Zéro surprise. Tout est inclus. Voici exactement ce que vous recevrez."
Objectif
Éliminer la méfiance. Le modèle abonnement est associé dans l'esprit du consommateur à des arnaques (prix caché, recharge obligatoire à prix exorbitant, impossible à résilier). Hydrao doit être l'exact opposé : la transparence totale comme argument de vente.
Cible
Le client vient de se convaincre avec le calculateur. Il est intéressé mais méfiant. La question dans sa tête : "Oui mais après, combien ça coûte vraiment ?" Cette page répond avant qu'il pose la question.
Méthodologie UX
Bloc 1 — Adaptation automatique selon le SKU choisi
Si le client a sélectionné SKU2 (bouillant+filtré) : afficher uniquement les formules filtres.
Si SKU1 ou SKU3 (avec gazeux) : afficher formules filtres + CO₂.
Le contenu de l'abonnement change mais les 3 formules (Essentiel/Standard/Plus) restent.
Contenu des formules :
Essentiel 59€/anStandard 99€/anPlus 119€/anPersonnes1-23-45+Filtres/an246CO₂ (SKU1/3)4 cartouches8 cartouches12 cartouchesLivraisonInclusePrioritaireExpressRappelsAutoAutoAutoCheck-up—1/an2/anPièces usure——Prix réduit
Bloc 2 — Choix du rythme de paiement
3 options visuelles et claires :

Mensuel : X€/mois (accessibilité maximale, aucun engagement perçu)
Trimestriel : X€/trimestre (économie légère, mise en avant)
Annuel : X€/an (meilleur tarif, badge "Recommandé")

Calcul automatique selon la formule sélectionnée.
Bloc 3 — La révélation des cadeaux
Juste en dessous des abonnements, section "Votre pack de bienvenue inclus" :
Afficher les accessoires selon la formule choisie avec leur valeur perçue estimée.
EssentielStandardPlusVerres table 1L234Tritan 1L234Tritan 50cl234Carafe ouverte—11Carafe fermée pétillante——1Thermos——1Valeur perçue~40€~75€~120€ offerts
Présentation visuelle type "unboxing" — les objets apparaissent progressivement, pas une liste à puces.
Ce que Figma Make doit construire

Titre de section fort : "Tout est inclus. Rien n'est caché."
3 cartes formules côte à côte (Standard mise en avant visuellement)
Toggle mensuel/trimestriel/annuel avec mise à jour prix en temps réel
Section cadeaux révélée après sélection de la formule (pas avant — créer l'effet de découverte)
Valeur perçue des cadeaux affichée clairement (badge "Valeur X€ offerts")
Micro-texte de réassurance : "Résiliable à tout moment" / "Livraison incluse" / "Rappel automatique avant envoi"
Transition vers Step 3 naturelle et fluide



STEP 3 — LA PERSONNALISATION
"Faites-en le vôtre."
Objectif
Créer l'implication émotionnelle finale. Le client co-crée son produit — il n'achète plus un robinet, il commande son robinet avec ses bouteilles à son prénom. À ce stade l'abandon est psychologiquement coûteux.
Cible
Le client est convaincu (Step 1) et rassuré (Step 2). Il lui manque juste une dernière raison de se sentir spécial. La personnalisation est cette raison.
Méthodologie UX
Ce qui est personnalisable (selon l'objet) :
ObjetCouleur liserésLogo marquePrénomVerres en verre 1L✅✅—Bouteilles Tritan✅✅✅ (optionnel)Carafe ouverte✅✅—Carafe fermée pétillante✅✅—Thermos✅✅✅ (optionnel)
Flow de personnalisation :

Afficher les objets inclus dans le pack choisi (visuels 3D ou illustration propre)
Pour chaque objet : sélecteur de couleur de liserés (palette Hydrao + neutres)
Logo Hydrao affiché par défaut sur tous les objets — pas de choix à faire, c'est automatique
Pour Tritan et Thermos : champ optionnel "Ajouter un prénom" par objet
Aperçu en temps réel de l'objet personnalisé
Récapitulatif visuel du pack complet personnalisé avant validation

Ton de la section :
Pas "Personnalisez votre commande" (formulaire administratif).
Plutôt "On a pensé à tout — maintenant pensez à vous" (invitation chaleureuse).
Bouteilles supplémentaires :
Option discrète en bas : "Ajouter des bouteilles supplémentaires à 5-10€ pièce" — pas mis en avant comme un upsell agressif, présenté comme un service rendu.
Ce que Figma Make doit construire

Visualisation des objets en temps réel (changement couleur au clic)
Interface épurée — max 2-3 choix visibles à la fois, pas un formulaire de 15 champs
Sélecteur couleur sous forme de pastilles visuelles (pas de dropdown)
Champ prénom optionnel discret, pas obligatoire
Récapitulatif final "Votre pack" avec tous les objets personnalisés affichés
CTA final : "Confirmer ma commande" — ton chaleureux, pas commercial
Réassurance finale : "Livraison sous X jours" / "Satisfait ou remboursé" / "Votre pack unique, prêt à vivre"



INSTRUCTIONS GÉNÉRALES POUR FIGMA MAKE
Cohérence visuelle : Les 3 steps forment un tunnel continu. Même palette, même typographie, même esprit. Le client ne doit pas sentir qu'il change de page — il avance dans un parcours fluide.
Mobile-first obligatoire : Concevoir d'abord pour mobile (375px), adapter ensuite pour desktop. La majorité des conversions viendront du mobile.
Performance : Pas d'animations lourdes qui ralentissent. Les transitions doivent être légères et rapides — la fluidité est plus importante que le spectaculaire.
Accessibilité : Contraste suffisant, textes lisibles, boutons suffisamment grands pour le touch mobile.
Données réelles : Intégrer les vrais prix dans le calculateur. Ne pas utiliser de données fictives ou de placeholders.
Prompts : Les 3 prompts seront donnés un par un dans l'ordre. Chaque prompt est autonome mais doit s'inscrire dans la cohérence globale décrite ici.