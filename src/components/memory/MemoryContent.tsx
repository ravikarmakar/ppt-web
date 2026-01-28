'use client';


import {
    Server,
    ShieldCheck,
    Cpu,
    Layers,
    Database,
    AlertTriangle,

    Box,
    LucideIcon
} from 'lucide-react';

interface BulletPoint {
    text: string;
    sub?: string;
    icon?: LucideIcon;
}

interface Slide {
    id: string;
    title: string;
    subtitle?: string;
    content?: string;
    extra?: string;
    icon?: LucideIcon;
    color: string;
    bullets?: BulletPoint[];
    steps?: string[];
}

export const slides: Slide[] = [
    {
        id: 'title',
        title: "Memory Management",
        subtitle: "The Operating System's Brain",
        content: "An immersive journey into how computers manage their most precious resource.",
        icon: Server,
        color: "#3b82f6"
    },
    {
        id: 'intro',
        title: "What is it?",
        content: "Memory Management is the process of controlling and coordinating computer memory. It assigns portions of optimized memory to running programs to ensure overall system performance.",
        extra: "Why important? Without it, programs would crash into each other, and the CPU would waste time waiting for data.",
        icon: Database,
        color: "#8b5cf6"
    },
    {
        id: 'objectives',
        title: "Core Objectives",
        bullets: [
            { text: "Efficient Utilization", sub: "Minimize wastage", icon: Box },
            { text: "Fast Access", sub: "Latency matters", icon: Cpu },
            { text: "Isolation & Protection", sub: "Prevent data corruption", icon: ShieldCheck },
            { text: "Multiprogramming", sub: "Run multiple apps at once", icon: Layers },
        ],
        color: "#10b981"
    },
    {
        id: 'constraints',
        title: "Design Constraints",
        content: "The physical reality of hardware imposes strict limits.",
        bullets: [
            { text: "Limited Capacity", sub: "RAM is finite and expensive", icon: AlertTriangle },
            { text: "Speed vs Cost", sub: "Fast memory is small; huge memory is slow", icon: AlertTriangle },
            { text: "Fragmentation", sub: "Wasted gaps in memory", icon: AlertTriangle },
        ],
        color: "#f59e0b"
    },
    {
        id: 'fragmentation',
        title: "The Fragmentation Problem",
        content: "Imagine a parking lot with empty spaces, but they are too scattered to fit a bus. That's external fragmentation.",
        extra: "Internal Fragmentation: Parsing a 4KB block for 1KB of data waste 3KB.",
        color: "#ef4444"
    },
    {
        id: 'hierarchy',
        title: "The Memory Hierarchy",
        content: "Data moves through layers based on speed and need.",
        steps: [
            "Registers (Instant, Tiny)",
            "Cache (Very Fast, Small)",
            "RAM (Fast, Medium)",
            "SSD/HDD (Slow, Huge)"
        ],
        color: "#3b82f6"
    },
    {
        id: 'os-role',
        title: "The OS as Conductor",
        content: "The OS constantly decides what stays in RAM and what gets moved to storage (Paging/Swapping).",
        extra: "It translates 'Virtual Addresses' (what the app sees) to 'Physical Addresses' (where data actually lives).",
        color: "#8b5cf6"
    },
    {
        id: 'analogy',
        title: "The Study Table Analogy",
        content: "Think of your RAM as a study table and your Hard Drive as a bookshelf.",
        bullets: [
            { text: "Study Table (RAM)", sub: "Limited space, fast access to open books." },
            { text: "Bookshelf (HDD)", sub: "Huge storage, slow to walk over and fetch a book." },
            { text: "You (OS)", sub: "Deciding which books to keep on the table for current work." }
        ],
        color: "#ec4899"
    },
    {
        id: 'conclusion',
        title: "Summary",
        content: "Effective memory management balances the trade-offs between speed, cost, and capacity to keep your system stable and fast.",
        color: "#10b981"
    }
];

interface SectionProps {
    slide: Slide;
    index: number;
}

function Section({ slide, index }: SectionProps) {
    return (
        <section
            className="h-screen w-full flex items-center p-8 md:p-20 pointer-events-none"
            style={{ justifyContent: index % 2 === 0 ? 'flex-start' : 'flex-end' }}
        >
            <div
                className="max-w-xl w-full bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl pointer-events-auto"
                style={{ borderLeft: `4px solid ${slide.color}` }}
            >
                <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-2xl bg-white/5 text-white">
                        {slide.icon && <slide.icon size={32} style={{ color: slide.color }} />}
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                        {slide.title}
                    </h2>
                </div>

                {slide.subtitle && (
                    <h3 className="text-xl text-blue-200 mb-6 font-mono border-b border-white/10 pb-4">
                        {slide.subtitle}
                    </h3>
                )}

                {slide.content && (
                    <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
                        {slide.content}
                    </p>
                )}

                {slide.bullets && (
                    <ul className="space-y-4 mb-6">
                        {slide.bullets.map((b, i) => (
                            <li key={i} className="flex items-start gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors">
                                {b.icon ? (
                                    <b.icon size={24} className="mt-1 flex-shrink-0" style={{ color: slide.color }} />
                                ) : (
                                    <div className="w-2 h-2 mt-2.5 rounded-full bg-blue-500 flex-shrink-0" />
                                )}
                                <div>
                                    <strong className="block text-white text-lg">{b.text}</strong>
                                    {b.sub && <span className="text-sm text-gray-400">{b.sub}</span>}
                                </div>
                            </li>
                        ))}
                    </ul>
                )}

                {slide.steps && (
                    <div className="flex flex-col gap-2 mt-6">
                        {slide.steps.map((step, i) => (
                            <div key={i} className="flex items-center gap-4 text-gray-300">
                                <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm bg-white/10 border border-white/20">
                                    {i + 1}
                                </div>
                                <span className="text-lg">{step}</span>
                            </div>
                        ))}
                    </div>
                )}

                {slide.extra && (
                    <div className="mt-6 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-200 text-sm italic">
                        {slide.extra}
                    </div>
                )}
            </div>
        </section>
    );
}

export default function MemoryContent() {
    return (
        <div className="w-full">
            {slides.map((slide, index) => (
                <Section key={slide.id} slide={slide} index={index} />
            ))}
        </div>
    );
}
