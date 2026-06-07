'use client';

import { useState } from 'react';

export default function ArchitectureVisual() {
  const [activeLayer, setActiveLayer] = useState<number | null>(null);

  const layers = [
    {
      level: 4,
      name: 'Userspace (GUI, CLI Shells)',
      color: 'border-orange-500 bg-orange-950/20 text-orange-300 hover:bg-orange-950/40',
      description: 'The layer where standard applications execute. Contains your browser, graphical desktop interface (GNOME/Ubuntu Desktop), user documents, and interactive CLI shells like bash.',
    },
    {
      level: 3,
      name: 'System Services (systemd)',
      color: 'border-purple-500 bg-purple-950/20 text-purple-300 hover:bg-purple-950/40',
      description: 'Initializes the userspace environment and runs background services (daemons). systemd manages network-manager, cron jobs, cron triggers, docker containers, and hardware daemon events.',
    },
    {
      level: 2,
      name: 'Linux Kernel (Core OS)',
      color: 'border-blue-500 bg-blue-950/20 text-blue-300 hover:bg-blue-950/40',
      description: 'The interface between hardware and software. The kernel schedules tasks, allocates physical RAM registers, operates hardware drivers, and manages CPU execution contexts.',
    },
    {
      level: 1,
      name: 'Hardware (CPU, RAM, GPU, Disks)',
      color: 'border-emerald-500 bg-emerald-950/20 text-emerald-300 hover:bg-emerald-950/40',
      description: 'The physical device chips and registers. Processor execution cores, memory banks, solid state drives, and GPU calculation channels.',
    },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-center p-6 relative font-mono text-xs select-none">
      <h4 className="text-xs text-orange-400 tracking-wider mb-4 text-center uppercase">
        UBUNTU LINUX ARCHITECTURE STACK
      </h4>

      {/* Stack Container */}
      <div className="flex flex-col gap-2.5 max-w-sm mx-auto w-full mb-6">
        {layers.map((layer, idx) => (
          <button
            key={layer.level}
            onClick={() => setActiveLayer(activeLayer === idx ? null : idx)}
            className={`w-full border rounded-xl p-3 text-center cursor-pointer transition-all duration-300 ${layer.color} ${
              activeLayer === idx
                ? 'scale-105 ring-2 ring-white/10 shadow-[0_0_25px_rgba(255,255,255,0.05)]'
                : 'opacity-80 hover:opacity-100'
            }`}
          >
            <div className="font-bold flex items-center justify-between">
              <span>L{layer.level}: {layer.name}</span>
              <span className="text-[9px] px-1.5 py-0.5 bg-black/40 rounded border border-white/10">
                {activeLayer === idx ? 'INSPECTING' : 'CLICK TO VIEW'}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Inspector Details Output */}
      <div className="min-h-[95px] border border-white/10 bg-slate-950/60 rounded-xl p-3.5 max-w-sm mx-auto w-full text-slate-300">
        {activeLayer !== null ? (
          <div>
            <div className="font-bold text-white uppercase mb-1 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Layer Details
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              {layers[activeLayer].description}
            </p>
          </div>
        ) : (
          <div className="text-center text-slate-500 italic flex items-center justify-center h-full min-h-[60px]">
            Click a layer block above to inspect system communications...
          </div>
        )}
      </div>
    </div>
  );
}
