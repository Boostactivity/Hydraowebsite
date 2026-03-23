import React from 'react';
import { CountUpNumber } from './animations/CountUpNumber';
import { RevealOnScroll } from './animations/RevealOnScroll';
import { BlobBackground } from './animations/BlobBackground';

export function StatsSection() {
  const stats = [
    { number: 2000, suffix: '+', label: 'Clients satisfaits', description: 'Depuis 2020' },
    { number: 5, suffix: '', label: 'Types d\'eau', description: 'En un robinet' },
    { number: 8, suffix: '', label: 'Finitions premium', description: 'Au choix' },
    { number: 50, suffix: '%', label: 'D\'économie', description: 'Vs bouilloire classique' },
  ];

  return (
    <section className="relative py-24 bg-gradient-to-br from-[#6B1E3E] to-[#8B2E54] text-white overflow-hidden">
      <BlobBackground />
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <RevealOnScroll className="text-center mb-16">
          <h2 className="mb-4">
            HYDRAO en chiffres
          </h2>
          <p className="text-xl text-white/90">
            L'innovation qui fait la différence
          </p>
        </RevealOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <RevealOnScroll
              key={index}
              delay={index * 0.1}
              className="text-center p-8 rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-colors"
            >
              <div className="mb-3">
                <CountUpNumber
                  end={stat.number}
                  suffix={stat.suffix}
                  className="text-6xl block"
                  duration={2.5}
                />
              </div>
              <p className="text-xl mb-2">{stat.label}</p>
              <p className="text-sm text-white/70">{stat.description}</p>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
