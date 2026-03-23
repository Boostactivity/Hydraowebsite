import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, Download, Video, Phone, Mail, Wrench, Star, Gift, TrendingUp, Award } from 'lucide-react';

// Point 168 - Installation Preparation Email Template
export function InstallationPreparationEmail({
  customerName,
  deliveryDate,
  productName
}: {
  customerName: string;
  deliveryDate: string;
  productName: string;
}) {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', backgroundColor: '#ffffff' }}>
      {/* Header */}
      <div style={{ backgroundColor: '#6B1E3E', padding: '40px 20px', textAlign: 'center' }}>
        <div style={{ fontSize: '48px', marginBottom: '10px' }}>🔧</div>
        <h1 style={{ color: '#ffffff', fontSize: '28px', margin: 0 }}>
          Préparez votre installation !
        </h1>
        <p style={{ color: '#ffffff', fontSize: '16px', margin: '10px 0 0 0', opacity: 0.9 }}>
          Votre {productName} arrive bientôt
        </p>
      </div>

      {/* Content */}
      <div style={{ padding: '40px 20px' }}>
        <p style={{ fontSize: '16px', color: '#1f2937', marginBottom: '30px' }}>
          Bonjour {customerName},
        </p>

        <p style={{ fontSize: '16px', color: '#1f2937', lineHeight: '1.6', marginBottom: '30px' }}>
          Votre HYDRAO sera livré le <strong>{deliveryDate}</strong>. Pour que l'installation se passe dans les meilleures conditions, voici ce qu'il faut préparer :
        </p>

        {/* Checklist */}
        <div style={{ backgroundColor: '#f3f4f6', borderRadius: '12px', padding: '20px', marginBottom: '30px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f2937', marginBottom: '20px' }}>
            ✅ Checklist pré-installation
          </h2>
          <div style={{ marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid #e5e7eb' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <div style={{ color: '#10b981', fontSize: '20px' }}>✓</div>
              <div>
                <strong style={{ color: '#1f2937' }}>Outils nécessaires :</strong>
                <div style={{ color: '#6b7280', fontSize: '14px', marginTop: '5px' }}>
                  Clé à molette, tournevis, seau, chiffon, téflon
                </div>
              </div>
            </div>
          </div>
          <div style={{ marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid #e5e7eb' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <div style={{ color: '#10b981', fontSize: '20px' }}>✓</div>
              <div>
                <strong style={{ color: '#1f2937' }}>Fermer l'arrivée d'eau :</strong>
                <div style={{ color: '#6b7280', fontSize: '14px', marginTop: '5px' }}>
                  Localiser et fermer le robinet d'arrêt principal
                </div>
              </div>
            </div>
          </div>
          <div style={{ marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid #e5e7eb' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <div style={{ color: '#10b981', fontSize: '20px' }}>✓</div>
              <div>
                <strong style={{ color: '#1f2937' }}>Dégager l'espace :</strong>
                <div style={{ color: '#6b7280', fontSize: '14px', marginTop: '5px' }}>
                  Libérer l'accès sous l'évier (min. 30cm de largeur)
                </div>
              </div>
            </div>
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <div style={{ color: '#10b981', fontSize: '20px' }}>✓</div>
              <div>
                <strong style={{ color: '#1f2937' }}>Vérifier la pression d'eau :</strong>
                <div style={{ color: '#6b7280', fontSize: '14px', marginTop: '5px' }}>
                  2-5 bars recommandés (installer réducteur si besoin)
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Video CTA */}
        <div style={{ backgroundColor: '#dbeafe', borderRadius: '12px', padding: '20px', marginBottom: '30px', textAlign: 'center' }}>
          <div style={{ fontSize: '32px', marginBottom: '15px' }}>🎥</div>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e3a8a', marginBottom: '10px' }}>
            Tutoriel vidéo complet (15 min)
          </h3>
          <p style={{ fontSize: '14px', color: '#1e40af', marginBottom: '20px' }}>
            Suivez notre expert pas à pas pour installer votre HYDRAO comme un pro
          </p>
          <a 
            href="#"
            style={{
              display: 'inline-block',
              backgroundColor: '#2563eb',
              color: '#ffffff',
              padding: '12px 24px',
              borderRadius: '9999px',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '14px'
            }}
          >
            Regarder le tutoriel →
          </a>
        </div>

        {/* Plumber contact */}
        <div style={{ backgroundColor: '#fef3c7', borderRadius: '12px', padding: '20px', marginBottom: '30px', border: '1px solid #fcd34d' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#92400e', marginBottom: '10px' }}>
            💡 Besoin d'un professionnel ?
          </h3>
          <p style={{ fontSize: '14px', color: '#92400e', marginBottom: '15px' }}>
            Nous avons sélectionné des plombiers partenaires certifiés HYDRAO dans votre région.
          </p>
          <a 
            href="#"
            style={{
              display: 'inline-block',
              backgroundColor: '#f59e0b',
              color: '#ffffff',
              padding: '10px 20px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '14px'
            }}
          >
            Trouver un installateur
          </a>
        </div>

        {/* Support */}
        <div style={{ backgroundColor: '#f3f4f6', borderRadius: '12px', padding: '20px', textAlign: 'center' }}>
          <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '15px' }}>
            Une question ? Notre équipe est là pour vous aider
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
            <a 
              href="tel:+33123456789"
              style={{
                display: 'inline-block',
                backgroundColor: '#6B1E3E',
                color: '#ffffff',
                padding: '10px 20px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '14px'
              }}
            >
              📞 01 23 45 67 89
            </a>
            <a 
              href="mailto:support@hydrao.com"
              style={{
                display: 'inline-block',
                backgroundColor: '#6B1E3E',
                color: '#ffffff',
                padding: '10px 20px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '14px'
              }}
            >
              ✉️ support@hydrao.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// Point 169 - Post-Installation Survey
export function PostInstallationSurvey({
  customerName,
  orderNumber,
  productName
}: {
  customerName: string;
  orderNumber: string;
  productName: string;
}) {
  const [npsScore, setNpsScore] = useState<number | null>(null);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // En production: envoyer à l'API
    console.log('Survey submitted:', { npsScore, feedback });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto p-8 bg-white rounded-3xl shadow-lg text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Merci pour votre avis ! 🎉
        </h2>
        <p className="text-gray-600 mb-8">
          Votre retour nous aide à améliorer constamment nos produits et services.
        </p>
        <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
          <Gift className="w-8 h-8 text-green-600 mx-auto mb-3" />
          <p className="text-green-900 font-semibold mb-2">
            Bon d'achat de 20€ offert ! 🎁
          </p>
          <p className="text-sm text-green-800">
            Utilisable sur votre prochaine commande de filtres ou accessoires.
            <br />
            Code : <strong>MERCI20</strong>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-3xl shadow-lg">
      <div className="text-center mb-8">
        <Star className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Comment s'est passée l'installation ?
        </h2>
        <p className="text-gray-600">
          Bonjour {customerName}, votre avis compte énormément pour nous !
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* NPS Score */}
        <div>
          <label className="block text-lg font-semibold text-gray-900 mb-4">
            Recommanderiez-vous HYDRAO à vos proches ?
          </label>
          <div className="grid grid-cols-11 gap-2">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
              <button
                key={score}
                type="button"
                onClick={() => setNpsScore(score)}
                className={`aspect-square rounded-lg font-bold transition-all ${
                  npsScore === score
                    ? 'bg-[#6B1E3E] text-white scale-110'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {score}
              </button>
            ))}
          </div>
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span>Pas du tout probable</span>
            <span>Extrêmement probable</span>
          </div>
        </div>

        {/* Feedback */}
        <div>
          <label className="block text-lg font-semibold text-gray-900 mb-4">
            Parlez-nous de votre expérience
          </label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows={6}
            placeholder="Installation facile ? Qualité du produit ? Premier impression ? ..."
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#6B1E3E] focus:outline-none transition-colors"
          />
        </div>

        {/* Incentive */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-200">
          <div className="flex items-start gap-3">
            <Gift className="w-6 h-6 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-yellow-900">
              <strong>Cadeau de remerciement :</strong> Recevez un bon d'achat de <strong>20€</strong> pour votre prochain achat de filtres ou accessoires !
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={npsScore === null}
          className="w-full px-8 py-4 bg-[#6B1E3E] text-white rounded-full font-semibold hover:bg-[#8B2E4E] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Envoyer mon avis et recevoir mon cadeau
        </button>
      </form>
    </div>
  );
}

// Point 170 - Loyalty Program Dashboard
export function LoyaltyProgram({ customerName }: { customerName: string }) {
  const [points, setPoints] = useState(450);
  const pointsToNextReward = 550;
  const progress = (points / pointsToNextReward) * 100;

  const rewards = [
    { points: 200, discount: '10€', description: 'Bon d\'achat 10€', available: true },
    { points: 500, discount: '30€', description: 'Bon d\'achat 30€', available: false },
    { points: 1000, discount: '70€', description: 'Bon d\'achat 70€', available: false },
    { points: 2000, discount: '150€', description: 'Bon d\'achat 150€', available: false }
  ];

  const history = [
    { date: '20 déc. 2024', action: 'Achat HYDRAO Premium', points: 490, type: 'earn' },
    { date: '15 déc. 2024', action: 'Parrainage Sophie M.', points: 50, type: 'earn' },
    { date: '10 déc. 2024', action: 'Avis 5 étoiles', points: 20, type: 'earn' },
    { date: '5 déc. 2024', action: 'Bon 10€ utilisé', points: -200, type: 'redeem' }
  ];

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center">
        <Award className="w-16 h-16 text-[#6B1E3E] mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Programme Fidélité HYDRAO
        </h1>
        <p className="text-xl text-gray-600">
          Bienvenue {customerName} ! Gagnez des points à chaque achat et bénéficiez de réductions exclusives.
        </p>
      </div>

      {/* Points Card */}
      <div className="bg-gradient-to-br from-[#6B1E3E] to-[#8B2E4E] rounded-3xl p-8 text-white shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-white/80 mb-2">Vos points</div>
            <div className="text-5xl font-bold">{points}</div>
          </div>
          <div className="text-right">
            <div className="text-white/80 mb-2">Niveau</div>
            <div className="px-4 py-2 bg-white/20 rounded-full font-semibold">
              ⭐ Gold
            </div>
          </div>
        </div>

        <div className="mb-3">
          <div className="flex justify-between text-sm text-white/80 mb-2">
            <span>Prochain palier : 30€ de réduction</span>
            <span>{pointsToNextReward - points} points</span>
          </div>
          <div className="h-3 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-yellow-400 to-orange-500"
            />
          </div>
        </div>
      </div>

      {/* Rewards */}
      <div className="bg-white rounded-3xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Récompenses disponibles
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {rewards.map((reward, index) => (
            <div
              key={index}
              className={`p-6 rounded-2xl border-2 transition-all ${
                reward.available
                  ? 'border-green-300 bg-green-50 hover:shadow-lg cursor-pointer'
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="text-center">
                <Gift className={`w-10 h-10 mx-auto mb-3 ${
                  reward.available ? 'text-green-600' : 'text-gray-400'
                }`} />
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {reward.discount}
                </div>
                <div className="text-sm text-gray-600 mb-4">
                  {reward.description}
                </div>
                <div className="text-xs text-gray-500 mb-3">
                  {reward.points} points
                </div>
                {reward.available ? (
                  <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors">
                    Débloquer
                  </button>
                ) : (
                  <div className="text-xs text-gray-500">
                    {reward.points - points} points manquants
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Earn Points */}
      <div className="bg-white rounded-3xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Comment gagner des points ?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-blue-50 rounded-2xl border border-blue-200">
            <TrendingUp className="w-8 h-8 text-blue-600 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Achats</h3>
            <p className="text-sm text-gray-600 mb-2">
              1€ = 1 point
            </p>
            <p className="text-xs text-gray-500">
              Sur tous les produits et accessoires
            </p>
          </div>

          <div className="p-6 bg-purple-50 rounded-2xl border border-purple-200">
            <Gift className="w-8 h-8 text-purple-600 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Parrainage</h3>
            <p className="text-sm text-gray-600 mb-2">
              50 points par filleul
            </p>
            <p className="text-xs text-gray-500">
              Quand un ami commande avec votre code
            </p>
          </div>

          <div className="p-6 bg-yellow-50 rounded-2xl border border-yellow-200">
            <Star className="w-8 h-8 text-yellow-600 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Avis clients</h3>
            <p className="text-sm text-gray-600 mb-2">
              20 points par avis
            </p>
            <p className="text-xs text-gray-500">
              Partagez votre expérience
            </p>
          </div>
        </div>
      </div>

      {/* History */}
      <div className="bg-white rounded-3xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Historique
        </h2>

        <div className="space-y-3">
          {history.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
            >
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${
                  item.type === 'earn' ? 'bg-green-500' : 'bg-red-500'
                }`} />
                <div>
                  <div className="font-medium text-gray-900">{item.action}</div>
                  <div className="text-sm text-gray-600">{item.date}</div>
                </div>
              </div>
              <div className={`font-bold ${
                item.type === 'earn' ? 'text-green-600' : 'text-red-600'
              }`}>
                {item.points > 0 ? '+' : ''}{item.points}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
