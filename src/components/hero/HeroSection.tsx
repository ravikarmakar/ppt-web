'use client';

import { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import gsap from 'gsap';
import LoadingExperience from './LoadingSpinner';
import NoiseOverlay from './NoiseOverlay';

// Dynamic imports
const DigitalTunnel = dynamic(() => import('./DigitalTunnel'), { ssr: false });

// Declare global window property for type safety
declare global {
    interface Window {
        __HAS_SHOWN_LOADING__?: boolean;
    }
}

function HolographicText({ text }: { text: string }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const redRef = useRef<HTMLHeadingElement>(null);
    const blueRef = useRef<HTMLHeadingElement>(null);
    const whiteRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            const x = (clientX / innerWidth - 0.5) * 2; // -1 to 1
            const y = (clientY / innerHeight - 0.5) * 2;

            // Chromatic aberration shift
            gsap.to(redRef.current, {
                x: x * 10,
                y: y * 5,
                duration: 0.5,
                ease: 'power2.out'
            });
            gsap.to(blueRef.current, {
                x: -x * 10,
                y: -y * 5,
                duration: 0.5,
                ease: 'power2.out'
            });
            // White core moves slightly less for depth
            gsap.to(whiteRef.current, {
                x: x * 3,
                y: y * 1.5,
                duration: 0.5,
                ease: 'power2.out'
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div ref={containerRef} className="relative z-10 select-none mix-blend-screen">
            <h1 ref={redRef} className="absolute inset-0 text-center text-red-500 opacity-80 blur-[1px]">
                {text}
            </h1>
            <h1 ref={blueRef} className="absolute inset-0 text-center text-cyan-500 opacity-80 blur-[1px]">
                {text}
            </h1>
            <h1 ref={whiteRef} className="relative z-10 text-center text-white mix-blend-screen">
                {text}
            </h1>
        </div>
    );
}

function PortalButton() {
    return (
        <div className="relative group cursor-pointer">
            {/* Outer Ring */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-blue-500/30 scale-75 group-hover:scale-100 transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full border border-purple-500/30 scale-90 group-hover:scale-110 transition-transform duration-700 delay-75 ease-[cubic-bezier(0.23,1,0.32,1)]" />

            {/* Magical Glowing Core */}
            <div className="relative w-32 h-32 rounded-full flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:shadow-[0_0_50px_rgba(59,130,246,0.6)]">
                <div className="absolute inset-0 bg-black rounded-full z-0" />

                {/* Portal Swirl */}
                <div className="absolute inset-0 opacity-40 group-hover:opacity-80 transition-opacity duration-500">
                    <div className="w-full h-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,1)_0%,transparent_70%)] animate-pulse" />
                </div>

                {/* Text */}
                <span className="relative z-10 text-xs font-bold tracking-[0.2em] text-blue-200 group-hover:text-white transition-colors duration-300">
                    ENTER
                </span>
            </div>
        </div>
    );
}

function TechStackDisplay() {
    // Holographic ticker effect
    return (
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 w-full max-w-2xl px-4 pointer-events-none">
            <div className="text-[10px] sm:text-xs font-mono text-blue-400/50 tracking-[0.3em] uppercase mb-2">
                System Capabilities
            </div>

            {/* Glass Container */}
            <div className="w-full h-12 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg flex items-center justify-center overflow-hidden relative shadow-[0_0_20px_rgba(59,130,246,0.1)]">
                {/* Scanline overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] opacity-20 pointer-events-none" />

                {/* Moving ticker mask */}
                <div className="w-full overflow-hidden whitespace-nowrap mask-gradient">
                    <div className="inline-block animate-marquee">
                        {[
                            'REACT', 'NEXT.JS', 'THREE.JS', 'TYPESCRIPT', 'NODE.JS',
                            'TAILWIND', 'FRAMER', 'MONGODB', 'POSTGRESQL', 'DOCKER',
                            'REACT', 'NEXT.JS', 'THREE.JS', 'TYPESCRIPT', 'NODE.JS',
                        ].map((tech, i) => (
                            <span key={i} className="inline-block mx-6 text-sm font-bold tracking-wider text-blue-100/80">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
                .animate-marquee {
                    animation: marquee 20s linear infinite;
                }
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .mask-gradient {
                    mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
                }
            `}</style>
        </div>
    );
}

export default function HeroSection() {
    // If we've already shown it in this window session, skip it.
    // We use a global variable to persist across internal route changes.
    const [isLoading, setIsLoading] = useState(() => {
        if (typeof window !== 'undefined') {
            return !window.__HAS_SHOWN_LOADING__;
        }
        return true;
    });
    const [showContent, setShowContent] = useState(() => {
        if (typeof window !== 'undefined') {
            return !!window.__HAS_SHOWN_LOADING__;
        }
        return false;
    });

    const handleLoadComplete = () => {
        if (typeof window !== 'undefined') {
            window.__HAS_SHOWN_LOADING__ = true;
        }
        setIsLoading(false);
        setTimeout(() => setShowContent(true), 100);
    };

    if (isLoading) {
        return <LoadingExperience onComplete={handleLoadComplete} />;
    }

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black text-white">
            {/* 3D Background */}
            <DigitalTunnel />
            <NoiseOverlay />

            {/* Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#000000_120%)] pointer-events-none z-[5]" />

            {/* Content Container */}
            <div
                className={`relative z-10 flex flex-col items-center justify-center gap-8 transition-all duration-1000 ${showContent ? 'opacity-100 blur-0 scale-100' : 'opacity-0 blur-lg scale-95'}`}
            >
                {/* Holographic Text Block */}
                <div className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter">
                    <HolographicText text="RAVI KARMAKAR" />
                </div>

                {/* Subtext */}
                <div className="flex items-center gap-4 text-xs sm:text-sm font-mono text-blue-300/60 tracking-[0.5em] uppercase">
                    <span>System</span>
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span>Online</span>
                </div>

                {/* Interactive Portal Button */}
                <div className="mt-4 mb-20">
                    <Link href="#modules" onClick={(e) => {
                        e.preventDefault();
                        document.getElementById('modules')?.scrollIntoView({ behavior: 'smooth' });
                    }}>
                        <PortalButton />
                    </Link>
                </div>
            </div>

            {/* Tech Stack Ticker (replaces static decorations) */}
            <TechStackDisplay />

            {/* Corner Status */}
            <div className="absolute bottom-8 right-8 text-xs font-mono text-white/20 text-right hidden sm:block">
                SECURE CONNECTION<br />
                ENCRYPTED_V2
            </div>
            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce pointer-events-none">
                <span className="text-[10px] font-mono text-blue-400/60 tracking-widest uppercase">Explore System</span>
                <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </div>
        </section>
    );
}
