'use client';

import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

interface LoadingExperienceProps {
    onComplete: () => void;
}

export default function LoadingExperience({ onComplete }: LoadingExperienceProps) {
    const [phase, setPhase] = useState<'timeline' | 'epicReveal' | 'aiWorldEntry' | 'portal'>('timeline');
    const [currentYear, setCurrentYear] = useState(2002);
    const containerRef = useRef<HTMLDivElement>(null);
    const yearContainerRef = useRef<HTMLDivElement>(null);
    const aiWorldRef = useRef<HTMLDivElement>(null);
    const portalRef = useRef<HTMLDivElement>(null);
    const yearElementsRef = useRef<HTMLDivElement[]>([]);

    // Phase 1: Scrolling timeline - each year appears, scrolls, and disappears
    useEffect(() => {
        if (phase !== 'timeline') return;

        const startYear = 2002;
        const endYear = 2026;
        const totalYears = endYear - startYear + 1;

        // Duration for each year to scroll through
        const durationPerYear = 0.18; // Slightly slower for better visibility
        const totalDuration = totalYears * durationPerYear;

        const tl = gsap.timeline({
            onComplete: () => {
                setPhase('epicReveal');
            }
        });

        // Animate each year sequentially
        for (let year = startYear; year <= endYear; year++) {
            const yearIndex = year - startYear;
            const isLastYear = year === endYear;

            tl.add(() => {
                setCurrentYear(year);
            }, yearIndex * durationPerYear);

            // Each year: appears from bottom (200px), scrolls to center, disappears to top (-200px)
            if (yearContainerRef.current) {
                // First half: appear from bottom to center (ALWAYS visible)
                tl.fromTo(yearContainerRef.current,
                    {
                        y: 200,
                        opacity: 0,
                        scale: 0.8,
                        rotationX: 45
                    },
                    {
                        y: 0, // Move to center
                        opacity: 1, // Fully visible
                        scale: isLastYear ? 1.1 : 1,
                        rotationX: 0,
                        duration: durationPerYear * 0.5, // First half
                        ease: 'power2.out',
                    },
                    yearIndex * durationPerYear
                );

                // Second half: continue to top (except for 2026)
                if (!isLastYear) {
                    tl.to(yearContainerRef.current, {
                        y: -200,
                        opacity: 0,
                        scale: 0.8,
                        rotationX: -45,
                        duration: durationPerYear * 0.5,
                        ease: 'power2.in',
                    }, yearIndex * durationPerYear + durationPerYear * 0.5);
                }

                // Add subtle glow for milestone years only (not 2026 to reduce background glow)
                if (year % 5 === 0 && year !== endYear) {
                    tl.to(yearContainerRef.current, {
                        filter: `drop-shadow(0 0 25px rgba(59, 130, 246, 0.25))`,
                        duration: durationPerYear * 0.3,
                    }, yearIndex * durationPerYear);
                }
            }
        }

        return () => {
            tl.kill();
        };
    }, [phase]);

    // Phase 2: Epic 2026 reveal with dramatic effects
    useEffect(() => {
        if (phase !== 'epicReveal' || !yearContainerRef.current) return;

        const tl = gsap.timeline({
            onComplete: () => setPhase('aiWorldEntry')
        });

        // 2026 is now centered - create epic reveal effect
        tl.to(yearContainerRef.current, {
            scale: 1.5,
            duration: 0.4,
            ease: 'power2.out'
        })
            // Elastic bounce
            .to(yearContainerRef.current, {
                scale: 1,
                duration: 0.5,
                ease: 'elastic.out(1, 0.3)'
            })
            // Pause for impact
            .to({}, { duration: 0.3 })
            // Huge pulse with reduced glow (focus on text, not background)
            .to(yearContainerRef.current, {
                scale: 1.8,
                filter: 'drop-shadow(0 0 50px rgba(59, 130, 246, 0.6)) drop-shadow(0 0 80px rgba(139, 92, 246, 0.4))',
                duration: 0.6,
                ease: 'power2.out'
            })
            .to(yearContainerRef.current, {
                scale: 1.2,
                duration: 0.4,
                ease: 'elastic.out(1, 0.5)'
            })
            // Final dramatic hold
            .to({}, { duration: 0.5 })
            // Explode upward and fade
            .to(yearContainerRef.current, {
                y: -300,
                opacity: 0,
                scale: 2,
                rotationX: -45,
                duration: 0.8,
                ease: 'power3.in'
            });

        return () => {
            tl.kill();
        };
    }, [phase]);

    // Phase 3: AI WORLD 2026 scrolls in from bottom
    useEffect(() => {
        if (phase !== 'aiWorldEntry' || !aiWorldRef.current) return;

        const tl = gsap.timeline({
            onComplete: () => setPhase('portal')
        });

        // AI WORLD scrolls in from bottom with perspective
        tl.fromTo(aiWorldRef.current,
            {
                y: 400,
                opacity: 0,
                scale: 0.5,
                rotationX: 60,
                filter: 'blur(30px)'
            },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                rotationX: 0,
                filter: 'blur(0px)',
                duration: 1.5,
                ease: 'power3.out'
            }
        )
            // Settle effect
            .to(aiWorldRef.current, {
                scale: 1.05,
                duration: 0.3,
                ease: 'back.out(2)'
            })
            // Hold for impact
            .to({}, { duration: 0.8 })
            // Pulse glow
            .to(aiWorldRef.current, {
                textShadow: '0 0 120px rgba(59, 130, 246, 1), 0 0 240px rgba(139, 92, 246, 0.8)',
                scale: 1.08,
                duration: 0.6,
                yoyo: true,
                repeat: 1,
                ease: 'power2.inOut'
            });

        return () => {
            tl.kill();
        };
    }, [phase]);

    // Phase 4: Portal opening - website reveals from center
    useEffect(() => {
        if (phase !== 'portal' || !portalRef.current || !containerRef.current) return;

        const tl = gsap.timeline({
            onComplete: () => onComplete()
        });

        // Portal expands from center, revealing the website
        tl.to(aiWorldRef.current, {
            scale: 25,
            opacity: 0,
            duration: 1.8,
            ease: 'power4.in'
        })
            .to(portalRef.current, {
                scale: 60,
                opacity: 1,
                duration: 1.2,
                ease: 'power2.in'
            }, '-=1.2')
            .to(containerRef.current, {
                opacity: 0,
                duration: 0.6,
                ease: 'power2.out'
            }, '-=0.4');

        return () => {
            tl.kill();
        };
    }, [phase, onComplete]);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
            style={{
                background: 'radial-gradient(ellipse at center, #0a1628 0%, #020817 50%, #000000 100%)'
            }}
        >
            {/* Animated background particles */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(50)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-blue-500/30 rounded-full animate-float"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${3 + Math.random() * 4}s`
                        }}
                    />
                ))}
            </div>

            {/* Radial glow */}
            <div
                className="absolute w-[800px] h-[800px] rounded-full opacity-30"
                style={{
                    background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)',
                    animation: 'pulse-glow 2s ease-in-out infinite'
                }}
            />

            {/* Year display - scrolls through 2002 → 2026 */}
            <div
                ref={yearContainerRef}
                className={`absolute transition-all duration-300 ${phase === 'aiWorldEntry' || phase === 'portal' ? 'pointer-events-none' : ''}`}
                style={{
                    opacity: phase === 'aiWorldEntry' || phase === 'portal' ? 0 : 1,
                    perspective: '1000px',
                    transformStyle: 'preserve-3d'
                }}
            >
                <span
                    className="text-[18rem] sm:text-[24rem] md:text-[28rem] lg:text-[32rem] font-black tracking-tighter leading-none block"
                    style={{
                        backgroundImage: currentYear === 2026
                            ? 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)'
                            : 'linear-gradient(135deg, #64748b 0%, #94a3b8 50%, #cbd5e1 100%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        filter: currentYear === 2026
                            ? 'drop-shadow(0 0 80px rgba(59, 130, 246, 0.6)) drop-shadow(0 0 120px rgba(139, 92, 246, 0.4))'
                            : 'drop-shadow(0 0 20px rgba(100, 116, 139, 0.3))',
                        transition: 'all 0.2s ease'
                    }}
                >
                    {currentYear}
                </span>
            </div>

            {/* AI WORLD 2026 reveal */}
            <div
                ref={aiWorldRef}
                className={`absolute flex flex-col items-center gap-6 ${phase === 'aiWorldEntry' || phase === 'portal' ? '' : 'opacity-0 pointer-events-none'}`}
                style={{
                    perspective: '1000px',
                    transformStyle: 'preserve-3d'
                }}
            >
                <span
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-[0.5em] text-blue-300/80"
                >
                    WELCOME TO
                </span>
                <span
                    className="text-8xl sm:text-9xl md:text-[12rem] lg:text-[16rem] font-black tracking-tight leading-none block"
                    style={{
                        backgroundImage: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 30%, #ec4899 60%, #f59e0b 100%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        filter: 'drop-shadow(0 0 80px rgba(139, 92, 246, 0.8)) drop-shadow(0 0 120px rgba(59, 130, 246, 0.6))'
                    }}
                >
                    AI WORLD
                </span>
                <span
                    className="text-5xl sm:text-7xl md:text-9xl lg:text-[12rem] font-bold tracking-wider text-white/90 leading-none block"
                    style={{
                        filter: 'drop-shadow(0 0 60px rgba(255, 255, 255, 0.5))'
                    }}
                >
                    2026
                </span>
            </div>

            {/* Portal circle */}
            <div
                ref={portalRef}
                className="absolute w-4 h-4 rounded-full opacity-0"
                style={{
                    background: 'radial-gradient(circle, #ffffff 0%, #3b82f6 30%, transparent 70%)',
                    boxShadow: '0 0 100px 50px rgba(59, 130, 246, 0.5)'
                }}
            />

            {/* Scan lines for retro-futuristic effect */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                    background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)'
                }}
            />

            {/* Corner decorations */}
            <div className="absolute top-8 left-8 w-20 h-20 border-l-2 border-t-2 border-blue-500/30" />
            <div className="absolute top-8 right-8 w-20 h-20 border-r-2 border-t-2 border-blue-500/30" />
            <div className="absolute bottom-8 left-8 w-20 h-20 border-l-2 border-b-2 border-blue-500/30" />
            <div className="absolute bottom-8 right-8 w-20 h-20 border-r-2 border-b-2 border-blue-500/30" />

            {/* Loading indicator at bottom */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
                <div className="flex gap-2">
                    {[0, 1, 2].map((i) => (
                        <div
                            key={i}
                            className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                            style={{ animationDelay: `${i * 0.15}s` }}
                        />
                    ))}
                </div>
                <span className="text-xs text-blue-400/60 tracking-[0.3em] uppercase font-mono">
                    {phase === 'timeline' && 'Traveling through time...'}
                    {phase === 'epicReveal' && 'Arriving at destination...'}
                    {phase === 'aiWorldEntry' && 'Entering AI World...'}
                    {phase === 'portal' && 'Opening gateway...'}
                </span>
            </div>

            <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.8;
          }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        @keyframes pulse-glow {
          0%, 100% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.5;
          }
        }
      `}</style>
        </div>
    );
}
