import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Eye, 
  Calculator, 
  Settings, 
  CreditCard, 
  Truck, 
  CheckCircle2,
  ChevronRight,
  Clock,
  MapPin
} from 'lucide-react';
import { Page } from '../App';

interface JourneyStep {
  id: number;
  title: string;
  description: string;
  icon: any;
  duration: string;
  status: 'completed' | 'current' | 'upcoming';
  page?: Page;
}

interface CustomerJourneyMapProps {
  navigate: (page: Page) => void;
}

export function CustomerJourneyMap({ navigate }: CustomerJourneyMapProps) {
  const [currentStep, setCurrentStep] = useState(1);

  const steps: JourneyStep[] = [
    {
      id: 1,
      title: 'Découverte',
      description: 'Explorez le concept HYDRAL et ses bénéfices',
      icon: Eye,
      duration: '5 min',
      status: 'current',
      page: 'concept'
    },
    {
      id: 2,
      title: 'Calcul économies',
      description: 'Estimez vos économies personnalisées',
      icon: Calculator,
      duration: '2 min',
      status: 'upcoming',
      page: 'savings'
    },
    {
      id: 3,
      title: 'Configuration',
      description: 'Choisissez votre modèle et finition',
      icon: Settings,
      duration: '3 min',
      status: 'upcoming',
      page: 'configurator'
    },
    {
      id: 4,
      title: 'Commande',
      description: 'Finalisez votre achat en toute sécurité',
      icon: CreditCard,
      duration: '5 min',
      status: 'upcoming',
      page: 'configurator'
    },
    {
      id: 5,
      title: 'Installation',
      description: 'Rendez-vous avec notre technicien',
      icon: Truck,
      duration: '2h',
      status: 'upcoming'
    },
    {
      id: 6,
      title: 'Profitez !',
      description: 'Votre nouveau quotidien commence',
      icon: CheckCircle2,
      duration: '∞',
      status: 'upcoming'
    }
  ];

  useEffect(() => {
    // Simuler la progression (pour demo)
    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev < steps.length ? prev + 1 : 1));
    }, 10000);

    return () => clearInterval(timer);
  }, []);

  const getStepStatus = (stepId: number): 'completed' | 'current' | 'upcoming' => {
    if (stepId < currentStep) return 'completed';
    if (stepId === currentStep) return 'current';
    return 'upcoming';
  };

  return (
    <section className="section-padding bg-gradient-to-br from-white to-[#FAF8F5]">
      <div className="section-container max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#6B1E3E]/10 text-[#6B1E3E] rounded-full mb-6 border-2 border-[#6B1E3E]/20"
          >
            <MapPin className="w-5 h-5" />
            <span className="text-sm uppercase tracking-wider font-medium">Votre parcours</span>
          </motion.div>

          <h2 className="mb-4 text-gray-900">
            De la découverte à l'installation
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Un parcours simple et transparent en 6 étapes
          </p>
        </motion.div>

        {/* Timeline Desktop */}
        <div className="hidden lg:block mb-16">
          <div className="relative">
            {/* Ligne de progression */}
            <div className="absolute top-12 left-0 right-0 h-1 bg-gray-200 rounded-full">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                transition={{ duration: 0.5 }}
                className="h-full bg-gradient-to-r from-[#6B1E3E] to-[#8B2E4E] rounded-full"
              />
            </div>

            {/* Steps */}
            <div className="relative grid grid-cols-6 gap-4">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const status = getStepStatus(step.id);
                
                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex flex-col items-center"
                  >
                    {/* Icône */}
                    <motion.div
                      whileHover={{ scale: 1.1, y: -4 }}
                      onClick={() => step.page && navigate(step.page)}
                      className={`relative w-24 h-24 rounded-full flex items-center justify-center mb-4 transition-all cursor-pointer ${
                        status === 'completed'
                          ? 'bg-green-500 shadow-lg shadow-green-500/30'
                          : status === 'current'
                          ? 'gradient-bordeaux shadow-2xl shadow-[#6B1E3E]/50 scale-110'
                          : 'bg-gray-200'
                      }`}
                    >
                      <Icon className={`w-10 h-10 ${
                        status === 'upcoming' ? 'text-gray-500' : 'text-white'
                      }`} />
                      
                      {status === 'completed' && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-2 -right-2 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center border-4 border-white"
                        >
                          <CheckCircle2 className="w-5 h-5 text-white" />
                        </motion.div>
                      )}

                      {status === 'current' && (
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="absolute -inset-2 rounded-full border-4 border-[#6B1E3E] opacity-30"
                        />
                      )}
                    </motion.div>

                    {/* Info */}
                    <div className="text-center">
                      <h4 className={`font-medium mb-1 ${
                        status === 'upcoming' ? 'text-gray-500' : 'text-gray-900'
                      }`}>
                        {step.title}
                      </h4>
                      <p className="text-sm text-gray-600 mb-2 min-h-[40px]">
                        {step.description}
                      </p>
                      <div className="flex items-center justify-center gap-1 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>{step.duration}</span>
                      </div>
                    </div>

                    {/* CTA si applicable */}
                    {status === 'current' && step.page && (
                      <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        onClick={() => navigate(step.page!)}
                        className="mt-4 px-4 py-2 gradient-bordeaux text-white rounded-full text-sm font-medium shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-1"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Commencer
                        <ChevronRight className="w-4 h-4" />
                      </motion.button>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Timeline Mobile */}
        <div className="lg:hidden space-y-6 mb-16">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const status = getStepStatus(step.id);
            
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {/* Ligne de connexion */}
                {index < steps.length - 1 && (
                  <div className={`absolute left-10 top-20 bottom-0 w-1 ${
                    status === 'completed' ? 'bg-green-500' : 'bg-gray-200'
                  }`} />
                )}

                <div className="flex gap-4">
                  {/* Icône */}
                  <div
                    className={`relative w-20 h-20 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                      status === 'completed'
                        ? 'bg-green-500'
                        : status === 'current'
                        ? 'gradient-bordeaux scale-110'
                        : 'bg-gray-200'
                    }`}
                  >
                    <Icon className={`w-8 h-8 ${
                      status === 'upcoming' ? 'text-gray-500' : 'text-white'
                    }`} />
                    
                    {status === 'completed' && (
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-600 rounded-full flex items-center justify-center border-2 border-white">
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Contenu */}
                  <div className="flex-1 bg-white rounded-2xl p-6 border-2 border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className={`text-lg font-medium ${
                        status === 'upcoming' ? 'text-gray-500' : 'text-gray-900'
                      }`}>
                        {step.title}
                      </h4>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>{step.duration}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-4">{step.description}</p>

                    {status === 'current' && step.page && (
                      <motion.button
                        onClick={() => navigate(step.page!)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-2 gradient-bordeaux text-white rounded-full text-sm font-medium shadow-lg inline-flex items-center gap-2"
                      >
                        Commencer
                        <ChevronRight className="w-4 h-4" />
                      </motion.button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Stats parcours */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          {[
            { label: 'Durée totale', value: '~20 min', sublabel: 'De la découverte à la commande' },
            { label: 'Installation', value: '2 heures', sublabel: 'Par technicien certifié' },
            { label: 'Satisfaction', value: '98%', sublabel: 'De clients satisfaits' }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="text-center p-6 bg-white rounded-2xl border-2 border-gray-200 shadow-lg"
            >
              <div className="text-4xl font-light text-[#6B1E3E] mb-2">{stat.value}</div>
              <div className="font-medium text-gray-900 mb-1">{stat.label}</div>
              <div className="text-sm text-gray-600">{stat.sublabel}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}