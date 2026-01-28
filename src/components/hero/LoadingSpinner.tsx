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
    const yearElementsRef = useRef<(HTMLDivElement | HTMLSpanElement)[]>([]);

    const timelineRef = useRef<HTMLDivElement>(null);

    // Phase 1: Scrolling timeline - vertical scroll from 2002 to 2026
    useEffect(() => {
        if (phase !== 'timeline' || !timelineRef.current) return;

        const timelineDuration = 4.0;

        // Ensure we start with a clean state for the wheel elements
        const updateWheel = () => {
            if (!yearElementsRef.current.length) return;
            const center = window.innerHeight / 2;
            const height = window.innerHeight;

            yearElementsRef.current.forEach((el, index) => {
                if (!el) return;
                const rect = el.getBoundingClientRect();
                const elCenter = rect.top + rect.height / 2;
                const dist = Math.abs(center - elCenter);

                // Normalized distance logic (0 at center, 1 at edges)
                const maxDist = height / 2;
                let progress = dist / maxDist;
                progress = Math.min(Math.max(progress, 0), 1);

                const scale = 1 - (progress * 0.5); // 1.0 at center, 0.5 at edges
                const opacity = 1 - (progress * 0.7); // 1.0 at center, 0.3 at edges
                const blur = progress * 8; // 0px at center, 8px at edges

                // Handle drop shadow for 2026 (last element)
                const year = 2002 + index;
                const isTarget = year === 2026;
                const baseShadow = isTarget
                    ? 'drop-shadow(0 0 40px rgba(59, 130, 246, 0.8))'
                    : 'drop-shadow(0 0 10px rgba(100, 116, 139, 0.3))';

                gsap.set(el, {
                    scale: scale,
                    opacity: opacity,
                    filter: `blur(${blur}px) ${baseShadow}`,
                    zIndex: isTarget ? 10 : 1
                });
            });
        };

        const tl = gsap.timeline({
            onComplete: () => setPhase('epicReveal'),
            onUpdate: updateWheel
        });

        // Start from below center (2002 centered) and scroll to above center (2026 centered)
        // 25 items -> distance between first and last is 24 units.
        // If height is 100%, each unit is 1/25 = 4%.
        // 24 * 4% = 96%.
        // We move from +48% (2002 centered) to -48% (2026 centered).
        tl.fromTo(timelineRef.current,
            { y: "48%" },
            {
                y: "-48%",
                duration: timelineDuration,
                ease: "power2.inOut"
            }
        );

        return () => {
            tl.kill();
        };
    }, [phase]);

    // Phase 2: Epic 2026 reveal with dramatic effects
    useEffect(() => {
        if (phase !== 'epicReveal' || !yearContainerRef.current) return;

        // Ensure we reset any potential transforms from previous phases if we reused the ref
        // But we are swapping components, so it should be fresh.

        const tl = gsap.timeline({
            onComplete: () => setPhase('aiWorldEntry')
        });

        // 2026 is now centered (static component mounted)
        tl.fromTo(yearContainerRef.current,
            { scale: 1, opacity: 1 },
            {
                scale: 1.5,
                duration: 0.4,
                ease: 'power2.out'
            }
        )
            // Elastic bounce
            .to(yearContainerRef.current, {
                scale: 1,
                duration: 0.5,
                ease: 'elastic.out(1, 0.3)'
            })
            // Pause for impact
            .to({}, { duration: 0.3 })
            // Huge pulse with reduced glow
            .to(yearContainerRef.current, {
                scale: 1.8,
                filter: 'drop-shadow(0 0 30px rgba(59, 130, 246, 0.6)) drop-shadow(0 0 50px rgba(139, 92, 246, 0.4))',
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
                textShadow: '0 0 60px rgba(59, 130, 246, 1), 0 0 100px rgba(139, 92, 246, 0.8)',
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
            scale: 8, // Reduced from 25 to prevent extensive smooth-out lag
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
            {phase === 'timeline' ? (
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
                    <div
                        ref={timelineRef}
                        className="flex flex-col items-center"
                    // Transform is handled by GSAP
                    >
                        {Array.from({ length: 25 }, (_, i) => 2002 + i).map((year, i) => (
                            <span
                                key={year}
                                ref={(el) => {
                                    if (el) yearElementsRef.current[i] = el;
                                }}
                                className="text-[18rem] sm:text-[24rem] md:text-[28rem] lg:text-[32rem] font-black tracking-tighter leading-none block flex-shrink-0"
                                style={{
                                    backgroundImage: year === 2026
                                        ? 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)'
                                        : 'linear-gradient(135deg, #64748b 0%, #94a3b8 50%, #cbd5e1 100%)',
                                    backgroundClip: 'text',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    filter: year === 2026
                                        ? 'drop-shadow(0 0 40px rgba(59, 130, 246, 0.6))'
                                        : 'drop-shadow(0 0 10px rgba(100, 116, 139, 0.3))',
                                    height: '1.2em', // Fixed height helps exact alignment
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                {year}
                            </span>
                        ))}
                    </div>
                </div>
            ) : (
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
                            backgroundImage: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            filter: 'drop-shadow(0 0 40px rgba(59, 130, 246, 0.6))',
                            willChange: 'transform, filter',
                            transition: 'all 0.2s ease',
                            height: '1.2em',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        2026
                    </span>
                </div>
            )}

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
                        filter: 'drop-shadow(0 0 50px rgba(139, 92, 246, 0.7))',
                        willChange: 'transform, opacity'
                    }}
                >
                    AI WORLD
                </span>
                <span
                    className="text-5xl sm:text-7xl md:text-9xl lg:text-[12rem] font-bold tracking-wider text-white/90 leading-none block"
                    style={{
                        filter: 'drop-shadow(0 0 30px rgba(255, 255, 255, 0.5))',
                        willChange: 'transform, opacity'
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
                    boxShadow: '0 0 60px 30px rgba(59, 130, 246, 0.4)',
                    willChange: 'transform, opacity'
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
