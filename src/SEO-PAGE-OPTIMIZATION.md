# Optimisations SEO par Page - HYDRAO

Ce document détaille les optimisations SEO spécifiques à appliquer sur chaque page pour maximiser le référencement naturel.

---

## 🏠 Page d'Accueil (/)

### Objectifs SEO
- Position #1 sur "robinet 5 en 1"
- Top 3 sur "robinet eau bouillante"
- Top 5 sur "robinet premium"

### Éléments clés
- **H1 :** "HYDRAO - Le Robinet 5-en-1 qui Transforme Votre Cuisine"
- **Mots-clés densité :** robinet 5-en-1 (3x), eau bouillante (4x), robinet premium (2x)
- **CTA principal :** "Configurer mon robinet" → Lien vers configurateur
- **Rich Snippets :** Organization + Product

### Contenus à ajouter
```html
<h1>HYDRAO - Le Robinet 5-en-1 qui Transforme Votre Cuisine</h1>
<p>Découvrez le seul robinet qui vous offre 5 types d'eau : 
<strong>eau bouillante instantanée 100°C</strong>, 
<strong>eau froide filtrée</strong>, 
<strong>eau pétillante</strong>, 
eau chaude et froide classique. 
À partir de <strong>490€ TTC</strong>.</p>
```

### Liens internes prioritaires
1. → /configurateur (Anchor: "Configurez votre robinet")
2. → /gamme (Anchor: "Découvrir les 5 modèles")
3. → /prix (Anchor: "Voir les prix transparents")
4. → /avantages (Anchor: "Les économies réalisées")

---

## 💰 Page Prix (/prix)

### Objectifs SEO
- Top 3 sur "prix robinet eau bouillante"
- Top 5 sur "robinet 490 euros"
- Conversions longue traîne

### Éléments clés
- **H1 :** "Prix Transparent HYDRAO - 490€ TTC + Abonnement dès 59€/an"
- **Mots-clés :** prix transparent (5x), 490€ (3x), TCO (2x), économies (4x)
- **Tableaux de prix :** Avec balises sémantiques `<table>`, `<thead>`, `<tbody>`
- **Rich Snippets :** Offer + PriceSpecification

### Contenu structuré
```html
<section itemscope itemtype="https://schema.org/Offer">
  <h2>Prix du Robinet HYDRAO</h2>
  <p>
    <span itemprop="price">490</span>
    <span itemprop="priceCurrency">EUR</span> TTC
  </p>
  <meta itemprop="availability" content="https://schema.org/InStock" />
</section>
```

### Calculateur TCO
- Widget interactif pour calculer le retour sur investissement
- Comparaison avec achat de bouteilles
- Graphiques économies sur 1, 3, 5 ans

---

## 🎨 Page Gamme (/gamme)

### Objectifs SEO
- Top 3 sur "modèles robinet premium"
- Top 5 sur chaque modèle (FLEX, SQUARE, etc.)
- Rich cards dans Google Images

### Éléments clés
- **H1 :** "Gamme HYDRAO - 5 Modèles de Robinets Premium"
- **H2 par produit :** "HYDRAO FLEX - Robinet avec Bec Extractible"
- **Attributs alt images :** Très descriptifs
- **Rich Snippets :** ProductCollection

### Structure optimisée
```html
<article itemscope itemtype="https://schema.org/Product">
  <h2 itemprop="name">HYDRAO FLEX</h2>
  <img 
    src="/images/flex.jpg" 
    alt="Robinet HYDRAO FLEX avec bec extractible 360° en acier brossé" 
    itemprop="image"
  />
  <p itemprop="description">
    Le robinet FLEX dispose d'un bec extractible 360° pour une utilisation optimale...
  </p>
  <div itemprop="offers" itemscope itemtype="https://schema.org/Offer">
    <span itemprop="price">490</span>€ TTC
  </div>
</article>
```

### Liens internes
- Chaque modèle → Page produit dédiée
- "Comparer les modèles" → /comparatif
- "Configurer" → /configurateur

---

## 🔧 Page Produit (/produit/[model])

### Objectifs SEO
- Position sur "robinet [MODEL]"
- Featured snippet "Caractéristiques robinet [MODEL]"
- Google Shopping integration

### Éléments clés
- **H1 :** "Robinet HYDRAO FLEX 5-en-1 - Design Premium Extractible"
- **Galerie photos :** 8-10 images haute qualité
- **Spécifications techniques :** Tableau complet
- **Rich Snippets :** Product complet avec reviews

### Contenu à structurer
```html
<div itemscope itemtype="https://schema.org/Product">
  <h1 itemprop="name">Robinet HYDRAO FLEX 5-en-1</h1>
  
  <!-- Caractéristiques -->
  <dl>
    <dt>Type de bec</dt>
    <dd>Extractible 360°</dd>
    
    <dt>Types d'eau</dt>
    <dd>5 types : bouillante, filtrée, pétillante, chaude, froide</dd>
    
    <dt>Finitions disponibles</dt>
    <dd>Chrome, Acier brossé, Noir mat, Or brossé</dd>
  </dl>

  <!-- Avis -->
  <div itemprop="aggregateRating" itemscope itemtype="https://schema.org/AggregateRating">
    <span itemprop="ratingValue">4.8</span>/5
    (<span itemprop="reviewCount">523</span> avis)
  </div>
</div>
```

### FAQ spécifique produit
- "Le FLEX est-il compatible avec tous les éviers ?"
- "Quelle hauteur nécessite le FLEX ?"
- "Comment fonctionne le bec extractible ?"

---

## ⚙️ Page Configurateur (/configurateur)

### Objectifs SEO
- Position sur "configurateur robinet"
- Taux de conversion élevé
- Tracking comportemental

### Éléments clés
- **H1 :** "Configurez Votre Robinet HYDRAO Sur Mesure"
- **Étapes claires :** Numérotées avec progression
- **Visualisation 3D :** Images dynamiques selon choix
- **Sauvegarde configuration :** URL partageable

### Progressive Disclosure
```html
<section aria-labelledby="step-1">
  <h2 id="step-1">Étape 1 : Choisissez Votre Modèle</h2>
  <!-- Options -->
</section>

<section aria-labelledby="step-2">
  <h2 id="step-2">Étape 2 : Sélectionnez la Finition</h2>
  <!-- Options -->
</section>
```

### Récapitulatif SEO
- Prix dynamique affiché
- Résumé textuel complet
- Bouton "Obtenir un devis détaillé"

---

## ❓ Page FAQ (/faq)

### Objectifs SEO
- Featured snippets massifs
- "People Also Ask" dominance
- Position #1 longue traîne

### Éléments clés
- **H1 :** "FAQ HYDRAO - Questions Fréquentes sur nos Robinets 5-en-1"
- **Structure Q&A :** Balises sémantiques
- **Rich Snippets :** FAQPage Schema
- **Catégories :** Installation, Utilisation, Prix, Technique, SAV

### Structure optimisée
```html
<div itemscope itemtype="https://schema.org/FAQPage">
  
  <div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
    <h3 itemprop="name">Quel est le prix du robinet HYDRAO ?</h3>
    <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
      <p itemprop="text">
        Le robinet HYDRAO coûte <strong>490€ TTC</strong>, avec des abonnements 
        consommables de 59€ à 139€ par an selon vos besoins en filtres et CO₂.
      </p>
    </div>
  </div>

  <div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
    <h3 itemprop="name">Combien de temps prend l'installation ?</h3>
    <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
      <p itemprop="text">
        L'installation prend environ <strong>2 heures</strong> par un plombier 
        professionnel. Nous proposons un réseau d'installateurs agréés partout en France.
      </p>
    </div>
  </div>

</div>
```

### Questions prioritaires (Top 20)
1. Quel est le prix du robinet HYDRAO ?
2. Quels types d'eau propose HYDRAO ?
3. L'installation est-elle difficile ?
4. Le robinet est-il compatible avec mon évier ?
5. Quelle est la consommation électrique ?
6. Les filtres durent combien de temps ?
7. Comment changer les cartouches CO₂ ?
8. La garantie couvre quoi ?
9. Le robinet est-il sécurisé pour les enfants ?
10. Puis-je installer moi-même ?

---

## 🌿 Page Écoresponsable (/ecoresponsable)

### Objectifs SEO
- Position sur "robinet écologique"
- Audience sensible à l'environnement
- Partages sociaux

### Éléments clés
- **H1 :** "HYDRAO Écoresponsable - Éliminez 2000 Bouteilles Plastique/An"
- **Chiffres clés :** Mis en avant visuellement
- **Infographie :** Impact environnemental
- **Rich Snippets :** Article + HowTo (réduire déchets plastique)

### Arguments écologiques structurés
```html
<section>
  <h2>Impact Environnemental Positif</h2>
  
  <article>
    <h3>Fin des Bouteilles Plastique</h3>
    <p>
      Avec HYDRAO, vous éliminez l'achat de 
      <strong>2000 bouteilles plastique par an</strong> pour une famille de 4 personnes.
      Cela représente <strong>120 kg de plastique</strong> économisés annuellement.
    </p>
  </article>

  <article>
    <h3>Réduction Empreinte Carbone</h3>
    <p>
      Fini le transport de packs d'eau. Réduisez votre empreinte carbone de 
      <strong>80%</strong> par rapport à la consommation d'eau en bouteille.
    </p>
  </article>
</section>
```

---

## 📊 Page Comparatif (/comparatif)

### Objectifs SEO
- Top 3 sur "HYDRAO vs Quooker"
- Top 5 sur "meilleur robinet eau bouillante"
- Comparaisons marques

### Éléments clés
- **H1 :** "Comparatif HYDRAO vs Quooker, Grohe Red, InSinkErator - Guide 2024"
- **Tableau comparatif :** Détaillé, responsive
- **Critères objectifs :** Prix, fonctionnalités, TCO, design
- **Rich Snippets :** Comparison Table

### Structure tableau
```html
<table>
  <caption>Comparaison des Robinets à Eau Bouillante Premium</caption>
  <thead>
    <tr>
      <th scope="col">Critère</th>
      <th scope="col">HYDRAO</th>
      <th scope="col">Quooker</th>
      <th scope="col">Grohe Red</th>
      <th scope="col">InSinkErator</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Prix robinet</th>
      <td><strong>490€</strong></td>
      <td>1390€</td>
      <td>1250€</td>
      <td>890€</td>
    </tr>
    <tr>
      <th scope="row">Eau pétillante</th>
      <td>✓ Oui</td>
      <td>✗ Non</td>
      <td>✗ Non</td>
      <td>✗ Non</td>
    </tr>
    <!-- ... -->
  </tbody>
</table>
```

### Liens vers pages produits concurrents
- Utiliser `rel="nofollow"` pour liens externes
- Liens internes vers pages HYDRAO en `dofollow`

---

## 🔍 Page Support (/support)

### Objectifs SEO
- Réduire taux de rebond
- Augmenter temps sur site
- Position "aide [marque]"

### Éléments clés
- **H1 :** "Support HYDRAO - Assistance & Documentation Complète"
- **Recherche intelligente :** Auto-complétion
- **Vidéos tutoriels :** Avec transcriptions
- **Chatbot :** Pour questions fréquentes

### Centre d'aide structuré
```html
<section>
  <h2>Documentation</h2>
  <ul>
    <li><a href="/docs/installation">Guide d'Installation PDF</a></li>
    <li><a href="/docs/utilisation">Manuel d'Utilisation</a></li>
    <li><a href="/docs/entretien">Guide d'Entretien</a></li>
    <li><a href="/docs/depannage">Dépannage Rapide</a></li>
  </ul>
</section>
```

---

## 🛒 Page Boutique (/boutique)

### Objectifs SEO
- Position sur "acheter filtres HYDRAO"
- Position sur "cartouches CO2 robinet"
- Conversions e-commerce

### Éléments clés
- **H1 :** "Boutique HYDRAO - Filtres, CO₂, Accessoires & Consommables"
- **Filtres produits :** Catégories, prix, stock
- **Rich Snippets :** Product (chaque article)
- **Avis clients :** Sur chaque produit

### Fiche produit boutique
```html
<article itemscope itemtype="https://schema.org/Product">
  <h2 itemprop="name">Pack 2 Filtres Premium HYDRAO</h2>
  
  <img 
    itemprop="image" 
    src="/images/filtres.jpg" 
    alt="Pack de 2 filtres premium HYDRAO pour robinet 5-en-1"
  />
  
  <p itemprop="description">
    Filtres de remplacement haute performance 5 étapes. 
    Durée 6 mois chacun, capacité 10 000 litres.
  </p>
  
  <div itemprop="offers" itemscope itemtype="https://schema.org/Offer">
    <span itemprop="price">39</span>
    <span itemprop="priceCurrency">EUR</span> TTC
    <link itemprop="availability" href="https://schema.org/InStock" />
    <span itemprop="availabilityStarts">En stock - Livraison 48h</span>
  </div>
</article>
```

---

## 💳 Page Abonnements (/abonnements)

### Objectifs SEO
- Position "abonnement robinet"
- Conversion modèle récurrent
- Valeur vie client (LTV)

### Éléments clés
- **H1 :** "Abonnements HYDRAO - Filtres & CO₂ dès 59€/an"
- **Comparateur :** 4 formules côte à côte
- **Sans engagement :** Mis en avant
- **Rich Snippets :** Service + Subscription

### Tableau abonnements
```html
<section>
  <h2>Nos Formules d'Abonnement</h2>
  
  <div class="pricing-grid">
    <article itemscope itemtype="https://schema.org/Offer">
      <h3 itemprop="name">Filtre Only</h3>
      <p class="price">
        <span itemprop="price">59</span>
        <span itemprop="priceCurrency">EUR</span> / an
      </p>
      <ul>
        <li>2 filtres premium par an</li>
        <li>Livraison automatique</li>
        <li>Sans engagement</li>
      </ul>
      <button>Choisir</button>
    </article>
    
    <!-- Répéter pour Standard, Plus, Plus+ -->
  </div>
</section>
```

---

## 🏆 Priorités SEO Globales

### Top 5 Pages à Optimiser en Priorité
1. **Page d'Accueil** - Traffic principal
2. **Page Prix** - Intent commercial fort
3. **Page Gamme** - Découverte produits
4. **Page FAQ** - Featured snippets
5. **Page Comparatif** - Décision d'achat

### KPIs par Page
| Page | Objectif Trafic/Mois | Taux Conversion | Position Moyenne |
|------|---------------------|-----------------|------------------|
| Accueil | 5000 | 5% | Top 3 |
| Prix | 2000 | 12% | Top 3 |
| Gamme | 3000 | 8% | Top 5 |
| Configurateur | 1500 | 25% | Top 5 |
| FAQ | 2500 | 3% | Top 1 (featured) |

---

## ✅ Checklist d'Optimisation par Page

Pour chaque page, vérifier :
- [ ] Balise Title unique et optimisée (50-60 caractères)
- [ ] Meta Description attractive (150-160 caractères)
- [ ] H1 unique contenant mot-clé principal
- [ ] Structure H2-H6 logique et hiérarchisée
- [ ] Attributs alt sur toutes les images
- [ ] Maillage interne (min 3 liens)
- [ ] CTA clair et visible
- [ ] Temps de chargement < 3s
- [ ] Responsive mobile optimisé
- [ ] Données structurées JSON-LD
- [ ] URL propre et lisible
- [ ] Canonical tag défini
- [ ] Open Graph complet
- [ ] Twitter Cards configurées

---

**Document vivant - Mise à jour continue**  
Version 1.0 - 15 décembre 2024
