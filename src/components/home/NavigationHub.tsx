'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Cpu, Library, MonitorPlay, BookOpen, Layers } from 'lucide-react';

const modules = [
  {
    title: 'MCA Semester 1',
    description:
      'Explore the curriculum, theory courses, electives (Mobile Computing), and practical labs for Semester 1.',
    href: '/mca/sem-1',
    icon: BookOpen,
    color: 'from-blue-500 to-indigo-500',
    category: 'subjects',
  },
  {
    title: 'MCA Semester 2',
    description:
      'Explore the advanced modules, including Artificial Intelligence, Advanced Algorithms, and Digital Image Processing.',
    href: '/mca/sem-2',
    icon: Layers,
    color: 'from-purple-500 to-indigo-500',
    category: 'subjects',
  },
  {
    title: 'Memory Management',
    description:
      'Immersive 3D visualization of OS memory concepts. Scroll through the RAM/HDD hierarchy.',
    href: '/memory-management',
    icon: Cpu,
    color: 'from-blue-500 to-cyan-500',
    category: 'topics',
  },
  {
    title: 'Topic Library',
    description:
      'Comprehensive list of Operating System topics including Paging, Virtual Memory, and more.',
    href: '/topics',
    icon: Library,
    color: 'from-purple-500 to-pink-500',
    category: 'topics',
  },
  {
    title: 'Presentation Mode',
    description:
      'Slide-deck style viewer for classroom presentations and structured learning.',
    href: '/presentation',
    icon: MonitorPlay,
    color: 'from-green-500 to-emerald-500',
    category: 'presentations',
  },
  {
    title: 'Ubuntu OS Scroll Deck',
    description:
      'Stunning scrollytelling presentation covering Ubuntu architecture, boot manager, filesystems, and comparisons.',
    href: '/presentation/ubuntu',
    icon: MonitorPlay,
    color: 'from-orange-500 to-red-600',
    category: 'presentations',
  },
];

type FilterCategory = 'all' | 'subjects' | 'topics' | 'presentations';

interface FilterOption {
  id: FilterCategory;
  label: string;
}

const filters: FilterOption[] = [
  { id: 'all', label: 'All Modules' },
  { id: 'subjects', label: 'Subjects' },
  { id: 'topics', label: 'Topics' },
  { id: 'presentations', label: 'Presentations' },
];

export default function NavigationHub() {
  const [activeFilter, setActiveFilter] = useState<
    'all' | 'subjects' | 'topics' | 'presentations'
  >('all');

  const filteredModules =
    activeFilter === 'all'
      ? modules
      : modules.filter((m) => m.category === activeFilter);

  return (
    <section
      id="modules"
      className="py-20 px-4 bg-black relative z-10 border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-linear-to-r from-white to-gray-500 bg-clip-text text-transparent">
            System Modules
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Select a module to begin your exploration of MCA curriculum and
            Operating System concepts.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {filters.map((filter) => {
            const isActive = activeFilter === filter.id;
            return (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 border cursor-pointer ${
                  isActive
                    ? 'bg-linear-to-r from-blue-500/20 to-purple-500/20 text-white border-blue-500/40 shadow-[0_0_15px_rgba(59,130,246,0.15)]'
                    : 'bg-white/5 text-slate-400 border-white/5 hover:bg-white/10 hover:text-white'
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[380px]">
          {filteredModules.map((module) => (
            <Link
              key={module.href}
              href={module.href}
              className="group relative block h-full cursor-pointer"
            >
              <div
                className="absolute -inset-0.5 bg-linear-to-r opacity-20 group-hover:opacity-100 transition duration-500 blur rounded-2xl"
                style={{
                  backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`,
                }}
              >
                <div
                  className={`w-full h-full bg-linear-to-r ${module.color} opacity-50`}
                />
              </div>

              <div className="relative h-full bg-slate-950 border border-white/10 rounded-2xl p-8 hover:bg-slate-900 transition-colors flex flex-col justify-between">
                <div>
                  <div
                    className={`w-12 h-12 rounded-lg bg-linear-to-br ${module.color} flex items-center justify-center mb-6`}
                  >
                    <module.icon className="text-white w-6 h-6" />
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3">
                    {module.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed mb-6">
                    {module.description}
                  </p>
                </div>

                <div className="flex items-center text-sm font-mono text-blue-400 group-hover:translate-x-2 transition-transform mt-auto">
                  <span>ACCESS_MODULE</span>
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
