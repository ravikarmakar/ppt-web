'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface Props {
    text: string;
    className?: string;
    delay?: number;
    onComplete?: () => void;
}

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';

export default function GlitchText({ text, className = '', delay = 0, onComplete }: Props) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [displayText, setDisplayText] = useState('');
    const [isGlitching, setIsGlitching] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsGlitching(true);
            let iterations = 0;
            const maxIterations = text.length * 3;

            const interval = setInterval(() => {
                setDisplayText(
                    text
                        .split('')
                        .map((char, index) => {
                            if (char === ' ') return ' ';
                            if (index < iterations / 3) {
                                return char;
                            }
                            return chars[Math.floor(Math.random() * chars.length)];
                        })
                        .join('')
                );

                iterations++;

                if (iterations >= maxIterations) {
                    clearInterval(interval);
                    setDisplayText(text);
                    setIsGlitching(false);
                    onComplete?.();
                }
            }, 30);

            return () => clearInterval(interval);
        }, delay);

        return () => clearTimeout(timeout);
    }, [text, delay, onComplete]);

    useEffect(() => {
        if (!containerRef.current || !isGlitching) return;

        // Glitch effect with random transforms
        const glitchTimeline = gsap.timeline({ repeat: -1 });

        glitchTimeline
            .to(containerRef.current, {
                skewX: () => Math.random() * 10 - 5,
                x: () => Math.random() * 6 - 3,
                duration: 0.05,
            })
            .to(containerRef.current, {
                skewX: 0,
                x: 0,
                duration: 0.05,
            });

        const container = containerRef.current;
        return () => {
            glitchTimeline.kill();
            if (container) {
                gsap.set(container, { skewX: 0, x: 0 });
            }
        };
    }, [isGlitching]);

    return (
        <div ref={containerRef} className={`relative ${className}`}>
            {/* Main text */}
            <span className="relative z-10">{displayText || text.replace(/./g, ' ')}</span>

            {/* Glitch layers */}
            {isGlitching && (
                <>
                    <span
                        className="absolute inset-0 text-cyan-400 opacity-80"
                        style={{
                            clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)',
                            transform: 'translateX(-2px)',
                        }}
                    >
                        {displayText}
                    </span>
                    <span
                        className="absolute inset-0 text-pink-500 opacity-80"
                        style={{
                            clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)',
                            transform: 'translateX(2px)',
                        }}
                    >
                        {displayText}
                    </span>
                </>
            )}
        </div>
    );
}
