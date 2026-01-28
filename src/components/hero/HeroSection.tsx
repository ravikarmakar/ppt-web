'use client';

import { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import gsap from 'gsap';
import LoadingExperience from './LoadingSpinner';
import GlitchText from './GlitchText';
import MagneticButton from './MagneticButton';
import NoiseOverlay from './NoiseOverlay';

// Dynamic imports
const ParticleUniverse = dynamic(() => import('./ParticleUniverse'), { ssr: false });
const GeometricScene = dynamic(() => import('./MemoryAnimation'), { ssr: false });

export default function HeroSection() {
    const [isLoading, setIsLoading] = useState(true);
    const [showContent, setShowContent] = useState(false);
    const [nameRevealed, setNameRevealed] = useState(false);
    const heroRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const subtitleRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const mouseRef = useRef({ x: 0, y: 0 });

    const handleLoadComplete = () => {
        setIsLoading(false);
        setShowContent(true);
    };

    // Mouse parallax effect
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = {
                x: (e.clientX / window.innerWidth - 0.5) * 2,
                y: (e.clientY / window.innerHeight - 0.5) * 2,
            };

            // Apply parallax to layers
            const layers = document.querySelectorAll('[data-parallax]');
            layers.forEach((layer) => {
                const speed = parseFloat(layer.getAttribute('data-parallax') || '0');
                const x = mouseRef.current.x * speed * 30;
                const y = mouseRef.current.y * speed * 30;
                gsap.to(layer, {
                    x,
                    y,
                    duration: 1,
                    ease: 'power2.out',
                });
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Content reveal animation
    useEffect(() => {
        if (!showContent || !contentRef.current) return;

        const tl = gsap.timeline({ delay: 0.5 });

        // Reveal subtitle after name
        tl.add(() => {
            setTimeout(() => setNameRevealed(true), 100);
        });

        // Animate subtitle words
        if (subtitleRef.current) {
            const words = subtitleRef.current.querySelectorAll('.word');
            tl.fromTo(
                words,
                { y: 50, opacity: 0, rotateX: -90 },
                {
                    y: 0,
                    opacity: 1,
                    rotateX: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'back.out(1.7)',
                },
                '+=0.8'
            );
        }

        // Animate CTA buttons
        if (ctaRef.current) {
            tl.fromTo(
                ctaRef.current.children,
                { y: 30, opacity: 0, scale: 0.8 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.6,
                    stagger: 0.2,
                    ease: 'back.out(1.7)',
                },
                '-=0.4'
            );
        }
    }, [showContent]);

    if (isLoading) {
        return <LoadingExperience onComplete={handleLoadComplete} />;
    }

    return (
        <section
            ref={heroRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0f1a]"
        >
            {/* Noise overlay for cinematic feel */}
            <NoiseOverlay />

            {/* Particle universe background */}
            <ParticleUniverse />

            {/* 3D Scene layer */}
            <div data-parallax="0.5" className="absolute inset-0 z-[1]">
                <GeometricScene />
            </div>

            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-[#0a0f1a] z-[2]" />
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#0a0f1a] to-transparent z-[2]" />

            {/* Animated glow orbs */}
            <div
                data-parallax="1"
                className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[150px]"
            />
            <div
                data-parallax="-0.8"
                className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[150px]"
            />
            <div
                data-parallax="0.6"
                className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-pink-500/10 rounded-full blur-[150px]"
            />

            {/* Main content */}
            <div
                ref={contentRef}
                className={`relative z-10 text-center px-4 max-w-6xl mx-auto transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'
                    }`}
            >
                {/* Glitch name reveal */}
                <div data-parallax="0.2" className="mb-8">
                    <GlitchText
                        text="RAVI KARMAKAR"
                        delay={200}
                        className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight bg-gradient-to-r from-blue-400 via-purple-400 via-pink-400 to-amber-400 bg-clip-text text-transparent"
                    />
                </div>

                {/* Subtitle with staggered words */}
                <div
                    ref={subtitleRef}
                    data-parallax="0.3"
                    className="flex flex-wrap justify-center items-center gap-4 mb-16 text-xl md:text-2xl lg:text-3xl"
                    style={{ perspective: '1000px' }}
                >
                    <span className="word px-4 py-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full border border-blue-500/30 text-blue-300">
                        1st Semester
                    </span>
                    <span className="word text-gray-500">•</span>
                    <span className="word px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full border border-purple-500/30 text-purple-300">
                        MCA Student
                    </span>
                    <span className="word text-gray-500">•</span>
                    <span className="word px-4 py-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-full border border-amber-500/30 text-amber-300">
                        Operating Systems
                    </span>
                </div>

                {/* CTA Buttons */}
                <div ref={ctaRef} data-parallax="0.1" className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <Link href="/topics">
                        <MagneticButton
                            strength={0.4}
                            className="group relative px-10 py-5 text-lg font-bold text-white overflow-hidden rounded-full"
                        >
                            {/* Button background */}
                            <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 transition-transform duration-500 group-hover:scale-110" />

                            {/* Animated border */}
                            <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <span className="absolute inset-[-2px] rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-spin-slow" />
                                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600" />
                            </span>

                            {/* Glow effect */}
                            <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

                            {/* Content */}
                            <span className="relative z-10 flex items-center gap-3">
                                <svg className="w-6 h-6 transition-transform group-hover:rotate-12 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                                Explore Topics
                            </span>
                        </MagneticButton>
                    </Link>

                    <Link href="/presentation">
                        <MagneticButton
                            strength={0.4}
                            className="group relative px-10 py-5 text-lg font-bold text-white overflow-hidden rounded-full border-2 border-purple-500/50 bg-white/5 backdrop-blur-sm hover:border-purple-400 transition-all duration-300"
                        >
                            {/* Hover fill */}
                            <span className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            {/* Glow */}
                            <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-300 blur-xl bg-purple-500" />

                            {/* Content */}
                            <span className="relative z-10 flex items-center gap-3">
                                <svg className="w-6 h-6 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                Presentation Mode
                            </span>
                        </MagneticButton>
                    </Link>
                </div>

                {/* Scroll indicator */}
                <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-60 hover:opacity-100 transition-opacity">
                    <span className="text-xs text-gray-500 tracking-[0.3em] uppercase">Scroll</span>
                    <div className="w-px h-16 bg-gradient-to-b from-gray-500 to-transparent relative overflow-hidden">
                        <div className="absolute w-full h-4 bg-white animate-scroll-line" />
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes scroll-line {
                    0% {
                        top: -16px;
                    }
                    100% {
                        top: 64px;
                    }
                }
                .animate-scroll-line {
                    animation: scroll-line 1.5s ease-in-out infinite;
                }
                .animate-spin-slow {
                    animation: spin 3s linear infinite;
                }
                @keyframes spin {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg);
                    }
                }
            `}</style>
        </section>
    );
}
