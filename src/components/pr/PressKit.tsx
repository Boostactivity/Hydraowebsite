import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FileText, Download, Image, Video, Award, Users, TrendingUp, Mail, Phone, Linkedin, Twitter, CheckCircle, Package } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageProvider';

interface PressAsset {
  category: string;
  items: {
    name: string;
    description: string;
    size: string;
    format: string;
    icon: React.ReactNode;
  }[];
}

export function PressKit() {
  const { language } = useLanguage();
  const [downloadedItems, setDownloadedItems] = useState<string[]>([]);

  const handleDownload = (itemName: string) => {
    setDownloadedItems([...downloadedItems, itemName]);
    // In production, trigger actual download
  };

  const pressAssets: PressAsset[] = [
    {
      category: language === 'fr' ? 'Documents' : 'Documents',
      items: [
        {
          name: language === 'fr' ? 'Communiqué de Presse' : 'Press Release',
          description: language === 'fr' ? 'Dernière version - Lancement HYDRAO 5-en-1' : 'Latest version - HYDRAO 5-in-1 Launch',
          size: '2.4 MB',
          format: 'PDF',
          icon: <FileText className="w-5 h-5" />,
        },
        {
          name: language === 'fr' ? 'Fiche Technique' : 'Technical Datasheet',
          description: language === 'fr' ? 'Spécifications complètes du produit' : 'Complete product specifications',
          size: '1.8 MB',
          format: 'PDF',
          icon: <FileText className="w-5 h-5" />,
        },
        {
          name: language === 'fr' ? 'Dossier de Presse' : 'Press Folder',
          description: language === 'fr' ? 'Package complet (histoire, produit, chiffres clés)' : 'Complete package (story, product, key figures)',
          size: '8.5 MB',
          format: 'PDF',
          icon: <Package className="w-5 h-5" />,
        },
      ],
    },
    {
      category: language === 'fr' ? 'Visuels' : 'Visuals',
      items: [
        {
          name: language === 'fr' ? 'Photos Haute Résolution' : 'High-Res Photos',
          description: language === 'fr' ? 'Pack de 24 photos produit (4K, 300 DPI)' : '24-photo product pack (4K, 300 DPI)',
          size: '180 MB',
          format: 'ZIP',
          icon: <Image className="w-5 h-5" />,
        },
        {
          name: language === 'fr' ? 'Logo & Identité' : 'Logo & Identity',
          description: language === 'fr' ? 'Logo versions (PNG, SVG, AI) + charte graphique' : 'Logo versions (PNG, SVG, AI) + brand guidelines',
          size: '12 MB',
          format: 'ZIP',
          icon: <Image className="w-5 h-5" />,
        },
        {
          name: language === 'fr' ? 'Infographies' : 'Infographics',
          description: language === 'fr' ? 'Économies, impact environnemental, bénéfices' : 'Savings, environmental impact, benefits',
          size: '45 MB',
          format: 'ZIP',
          icon: <Image className="w-5 h-5" />,
        },
      ],
    },
    {
      category: language === 'fr' ? 'Vidéos' : 'Videos',
      items: [
        {
          name: language === 'fr' ? 'Vidéo Produit' : 'Product Video',
          description: language === 'fr' ? 'Démo complète 5-en-1 (2min, 4K)' : 'Complete 5-in-1 demo (2min, 4K)',
          size: '420 MB',
          format: 'MP4',
          icon: <Video className="w-5 h-5" />,
        },
        {
          name: language === 'fr' ? 'Interview Fondateur' : 'Founder Interview',
          description: language === 'fr' ? 'Vision, mission, avenir HYDRAO (5min)' : 'Vision, mission, HYDRAO future (5min)',
          size: '680 MB',
          format: 'MP4',
          icon: <Video className="w-5 h-5" />,
        },
        {
          name: language === 'fr' ? 'Témoignages Clients' : 'Customer Testimonials',
          description: language === 'fr' ? 'Compilation 10 clients (3min)' : '10-customer compilation (3min)',
          size: '350 MB',
          format: 'MP4',
          icon: <Video className="w-5 h-5" />,
        },
      ],
    },
  ];

  const companyFacts = [
    {
      label: language === 'fr' ? 'Fondation' : 'Founded',
      value: '2019',
      icon: <Award className="w-5 h-5" />,
    },
    {
      label: language === 'fr' ? 'Clients' : 'Customers',
      value: '12 000+',
      icon: <Users className="w-5 h-5" />,
    },
    {
      label: language === 'fr' ? 'Croissance' : 'Growth',
      value: '+280%',
      icon: <TrendingUp className="w-5 h-5" />,
    },
    {
      label: language === 'fr' ? 'Pays' : 'Countries',
      value: '17',
      icon: <Award className="w-5 h-5" />,
    },
  ];

  const pressContacts = [
    {
      name: 'Sophie Martin',
      role: language === 'fr' ? 'Directrice Communication' : 'Communications Director',
      email: 'press@hydrao.com',
      phone: '+33 1 23 45 67 89',
      linkedin: 'linkedin.com/in/sophiemartin',
      twitter: '@HYDRAO_Press',
      photo: '👩‍💼',
    },
  ];

  const boilerplate = {
    fr: "HYDRAO révolutionne l'eau au robinet avec son système 5-en-1 unique : eau du robinet, filtrée, gazeuse, bouillante 100°C et glacée 6°C. Fondée en 2019, HYDRAO a déjà conquis plus de 12 000 foyers en Europe et aux États-Unis, leur faisant économiser en moyenne 2340€/an sur l'achat de bouteilles. Avec une croissance de 280% en 2024, HYDRAO s'impose comme le leader de la révolution du robinet intelligent premium.",
    en: "HYDRAO is revolutionizing tap water with its unique 5-in-1 system: tap water, filtered, sparkling, boiling 100°C and chilled 6°C. Founded in 2019, HYDRAO has already won over 12,000 homes in Europe and the United States, saving them an average of $2,550/year on bottle purchases. With 280% growth in 2024, HYDRAO is establishing itself as the leader in the premium smart tap revolution.",
    es: "HYDRAO revoluciona el agua del grifo con su sistema único 5 en 1: agua del grifo, filtrada, con gas, hirviendo 100°C y helada 6°C. Fundada en 2019, HYDRAO ya ha conquistado más de 12,000 hogares en Europa y Estados Unidos, ahorrándoles un promedio de 2340€/año en la compra de botellas. Con un crecimiento del 280% en 2024, HYDRAO se establece como líder en la revolución del grifo inteligente premium.",
    it: "HYDRAO sta rivoluzionando l'acqua del rubinetto con il suo sistema unico 5 in 1: acqua del rubinetto, filtrata, frizzante, bollente 100°C e fredda 6°C. Fondata nel 2019, HYDRAO ha già conquistato oltre 12.000 case in Europa e Stati Uniti, facendo risparmiare loro in media 2340€/anno sull'acquisto di bottiglie. Con una crescita del 280% nel 2024, HYDRAO si afferma come leader nella rivoluzione del rubinetto intelligente premium.",
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
          <FileText className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {language === 'fr' && 'Kit Presse HYDRAO'}
            {language === 'en' && 'HYDRAO Press Kit'}
            {language === 'es' && 'Kit de Prensa HYDRAO'}
            {language === 'it' && 'Kit Stampa HYDRAO'}
          </h2>
          <p className="text-gray-600">
            {language === 'fr' && 'Ressources média pour journalistes'}
            {language === 'en' && 'Media resources for journalists'}
            {language === 'es' && 'Recursos mediáticos para periodistas'}
            {language === 'it' && 'Risorse media per giornalisti'}
          </p>
        </div>
      </div>

      {/* Company Facts */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {companyFacts.map((fact, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-200"
          >
            <div className="flex items-center gap-2 mb-2 text-blue-600">
              {fact.icon}
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{fact.value}</div>
            <div className="text-sm text-gray-600">{fact.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Boilerplate */}
      <div className="bg-gradient-to-br from-[#6B1E3E] to-blue-600 rounded-xl p-6 text-white mb-6">
        <h3 className="font-bold text-xl mb-3">
          {language === 'fr' && 'À propos de HYDRAO'}
          {language === 'en' && 'About HYDRAO'}
          {language === 'es' && 'Acerca de HYDRAO'}
          {language === 'it' && 'Chi siamo'}
        </h3>
        <p className="text-lg leading-relaxed opacity-95">
          {boilerplate[language as keyof typeof boilerplate] || boilerplate.fr}
        </p>
      </div>

      {/* Press Assets */}
      <div className="space-y-6 mb-6">
        {pressAssets.map((category, categoryIndex) => (
          <div key={categoryIndex}>
            <h3 className="font-bold text-xl text-gray-900 mb-4">{category.category}</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {category.items.map((item, itemIndex) => {
                const isDownloaded = downloadedItems.includes(item.name);
                return (
                  <motion.div
                    key={itemIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: itemIndex * 0.1 }}
                    className={`bg-gray-50 rounded-xl p-4 border-2 transition-all cursor-pointer ${
                      isDownloaded
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-blue-500 hover:shadow-lg'
                    }`}
                    onClick={() => handleDownload(item.name)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        isDownloaded ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                      }`}>
                        {isDownloaded ? <CheckCircle className="w-5 h-5" /> : item.icon}
                      </div>
                      <span className="text-xs font-semibold text-gray-500 bg-gray-200 px-2 py-1 rounded-full">
                        {item.format}
                      </span>
                    </div>

                    <h4 className="font-bold text-gray-900 mb-2">{item.name}</h4>
                    <p className="text-sm text-gray-600 mb-3">{item.description}</p>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{item.size}</span>
                      <Download className={`w-5 h-5 ${isDownloaded ? 'text-green-600' : 'text-blue-600'}`} />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Press Contacts */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
        <h3 className="font-bold text-xl text-gray-900 mb-4">
          {language === 'fr' && 'Contacts Presse'}
          {language === 'en' && 'Press Contacts'}
          {language === 'es' && 'Contactos Prensa'}
          {language === 'it' && 'Contatti Stampa'}
        </h3>

        {pressContacts.map((contact, index) => (
          <div key={index} className="bg-white rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="text-5xl">{contact.photo}</div>
              <div className="flex-1">
                <h4 className="font-bold text-xl text-gray-900 mb-1">{contact.name}</h4>
                <p className="text-gray-600 mb-4">{contact.role}</p>

                <div className="grid md:grid-cols-2 gap-3">
                  <a
                    href={`mailto:${contact.email}`}
                    className="flex items-center gap-2 text-gray-700 hover:text-[#6B1E3E] transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    <span className="text-sm font-semibold">{contact.email}</span>
                  </a>

                  <a
                    href={`tel:${contact.phone}`}
                    className="flex items-center gap-2 text-gray-700 hover:text-[#6B1E3E] transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    <span className="text-sm font-semibold">{contact.phone}</span>
                  </a>

                  <a
                    href={`https://${contact.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-700 hover:text-[#6B1E3E] transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span className="text-sm font-semibold">LinkedIn</span>
                  </a>

                  <a
                    href={`https://twitter.com/${contact.twitter.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-700 hover:text-[#6B1E3E] transition-colors"
                  >
                    <Twitter className="w-4 h-4" />
                    <span className="text-sm font-semibold">{contact.twitter}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="mt-4 text-center text-sm text-gray-600">
          {language === 'fr' && 'Disponible 7j/7 pour toute demande média'}
          {language === 'en' && 'Available 7/7 for all media inquiries'}
          {language === 'es' && 'Disponible 7/7 para consultas de medios'}
          {language === 'it' && 'Disponibile 7/7 per richieste media'}
        </div>
      </div>
    </div>
  );
}
