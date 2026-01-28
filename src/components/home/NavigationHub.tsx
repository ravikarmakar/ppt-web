'use client';

import Link from 'next/link';
import { Cpu, Library, MonitorPlay } from 'lucide-react';

const modules = [
    {
        title: "Memory Management",
        description: "Immersive 3D visualization of OS memory concepts. Scroll through the RAM/HDD hierarchy.",
        href: "/memory-management",
        icon: Cpu,
        color: "from-blue-500 to-cyan-500"
    },
    {
        title: "Topic Library",
        description: "Comprehensive list of Operating System topics including Paging, Virtual Memory, and more.",
        href: "/topics",
        icon: Library,
        color: "from-purple-500 to-pink-500"
    },
    {
        title: "Presentation Mode",
        description: "Slide-deck style viewer for classroom presentations and structured learning.",
        href: "/presentation",
        icon: MonitorPlay,
        color: "from-green-500 to-emerald-500"
    }
];

export default function NavigationHub() {
    return (
        <section id="modules" className="py-20 px-4 bg-black relative z-10 border-t border-white/10">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
                        System Modules
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Select a module to begin your exploration of Operating System concepts.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {modules.map((module) => (
                        <Link key={module.href} href={module.href} className="group relative">
                            <div className="absolute -inset-0.5 bg-gradient-to-r opacity-20 group-hover:opacity-100 transition duration-500 blur rounded-2xl"
                                style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))` }}
                            >
                                <div className={`w-full h-full bg-gradient-to-r ${module.color} opacity-50`} />
                            </div>

                            <div className="relative h-full bg-slate-950 border border-white/10 rounded-2xl p-8 hover:bg-slate-900 transition-colors">
                                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${module.color} flex items-center justify-center mb-6`}>
                                    <module.icon className="text-white w-6 h-6" />
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-3">
                                    {module.title}
                                </h3>
                                <p className="text-gray-400 leading-relaxed mb-6">
                                    {module.description}
                                </p>

                                <div className="flex items-center text-sm font-mono text-blue-400 group-hover:translate-x-2 transition-transform">
                                    <span>ACCESS_MODULE</span>
                                    <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
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
