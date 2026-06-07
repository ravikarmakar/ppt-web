'use client';

import { useState } from 'react';

export default function WhatIsUbuntuVisual() {
  const [activeFeature, setActiveFeature] = useState<string | null>(null);

  const features = [
    {
      id: 'os',
      name: 'Open-Source Freedom',
      desc: 'Ubuntu is 100% free and open-source. Anyone can inspect, modify, and distribute its codebase, backed by Canonical Ltd. and a massive global community.',
      icon: '🌐',
      color: 'border-orange-500 bg-orange-950/20 text-orange-300',
    },
    {
      id: 'debian',
      name: 'Debian Foundation',
      desc: 'Built on Debian Linux, Ubuntu inherits robust package management (.deb/apt), stellar package dependency resolution, and extreme architectural stability.',
      icon: '🌀',
      color: 'border-purple-500 bg-purple-950/20 text-purple-300',
    },
    {
      id: 'lts',
      name: 'LTS Release Cycle',
      desc: 'Long-Term Support (LTS) releases are published every 2 years, receiving 5 years of standard security maintenance, patching, and hardware support.',
      icon: '📅',
      color: 'border-blue-500 bg-blue-950/20 text-blue-300',
    },
    {
      id: 'hybrid',
      name: 'Cloud, Server & Desktop',
      desc: 'Ubuntu is the industry-leading OS for cloud deployments. It powers over 70% of public cloud instances on AWS, Azure, and Google Cloud, plus containerized microservices.',
      icon: '☁️',
      color: 'border-emerald-500 bg-emerald-950/20 text-emerald-300',
    },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-center p-6 sm:p-8 relative select-none">
      <div className="absolute inset-0 bg-radial-gradient from-orange-500/5 to-transparent blur-3xl pointer-events-none" />

      {/* Dynamic Logo Core */}
      <div className="flex justify-center mb-6">
        <div className="relative w-24 h-24 rounded-full bg-linear-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-[0_0_40px_rgba(233,84,32,0.3)]">
          <div className="w-16 h-16 rounded-full bg-[#070007] flex items-center justify-center relative">
            <div className="absolute w-2.5 h-2.5 rounded-full bg-orange-500 -top-0.5 left-[42%]" />
            <div className="absolute w-2.5 h-2.5 rounded-full bg-orange-500 bottom-0.5 left-[15%]" />
            <div className="absolute w-2.5 h-2.5 rounded-full bg-orange-500 bottom-0.5 right-[15%]" />
            <div
              className="w-8 h-8 rounded-full border-4 border-orange-400 border-t-transparent animate-spin"
              style={{ animationDuration: '4s' }}
            />
          </div>
        </div>
      </div>

      <h4 className="text-xs font-mono text-orange-400 tracking-widest mb-4 text-center uppercase">
        Explore Core Features (Click to inspect)
      </h4>

      <div className="grid grid-cols-2 gap-3 max-w-md mx-auto w-full mb-6">
        {features.map((feat) => (
          <button
            key={feat.id}
            onClick={() =>
              setActiveFeature(activeFeature === feat.id ? null : feat.id)
            }
            className={`border rounded-xl p-3 flex flex-col items-center justify-center text-center font-mono transition-all duration-300 cursor-pointer ${feat.color} ${
              activeFeature === feat.id
                ? 'scale-105 ring-2 ring-white/20 shadow-[0_0_20px_rgba(255,255,255,0.05)]'
                : 'opacity-70 hover:opacity-100 hover:scale-[1.02]'
            }`}
          >
            <span className="text-xl mb-1">{feat.icon}</span>
            <span className="text-xs font-bold">{feat.name}</span>
          </button>
        ))}
      </div>

      <div className="min-h-[85px] border border-white/10 bg-slate-950/60 rounded-xl p-3 text-xs max-w-md mx-auto w-full text-slate-300 font-mono">
        {activeFeature ? (
          <div>
            <div className="font-bold text-white uppercase mb-1.5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              {features.find((f) => f.id === activeFeature)?.name}
            </div>
            <p className="text-slate-400 leading-relaxed">
              {features.find((f) => f.id === activeFeature)?.desc}
            </p>
          </div>
        ) : (
          <div className="text-center text-slate-500 italic flex items-center justify-center h-full min-h-[60px]">
            Click a feature block above to load system details...
          </div>
        )}
      </div>
    </div>
  );
}
