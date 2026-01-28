'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CursorFollower() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const cursorInnerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        const cursorInner = cursorInnerRef.current;
        if (!cursor || !cursorInner) return;

        let mouseX = 0;
        let mouseY = 0;

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        // Smooth follow animation
        const animate = () => {
            gsap.to(cursor, {
                x: mouseX,
                y: mouseY,
                duration: 0.5,
                ease: 'power2.out',
            });

            gsap.to(cursorInner, {
                x: mouseX,
                y: mouseY,
                duration: 0.1,
                ease: 'power2.out',
            });

            requestAnimationFrame(animate);
        };

        // Hover effects for interactive elements
        const handleMouseEnter = () => {
            gsap.to(cursor, {
                scale: 2,
                duration: 0.3,
                ease: 'power2.out',
            });
        };

        const handleMouseLeave = () => {
            gsap.to(cursor, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out',
            });
        };

        // Click effect
        const handleClick = () => {
            gsap.to(cursor, {
                scale: 0.8,
                duration: 0.1,
                ease: 'power2.out',
                onComplete: () => {
                    gsap.to(cursor, {
                        scale: 1,
                        duration: 0.2,
                        ease: 'elastic.out(1, 0.3)',
                    });
                },
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('click', handleClick);
        animate();

        // Add hover listeners to all interactive elements
        const interactiveElements = document.querySelectorAll('a, button, [data-cursor-hover]');
        interactiveElements.forEach((el) => {
            el.addEventListener('mouseenter', handleMouseEnter);
            el.addEventListener('mouseleave', handleMouseLeave);
        });

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('click', handleClick);
            interactiveElements.forEach((el) => {
                el.removeEventListener('mouseenter', handleMouseEnter);
                el.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, []);

    return (
        <>
            {/* Outer glow cursor */}
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-10 h-10 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-screen hidden md:block"
            >
                <div className="w-full h-full rounded-full bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-pink-500/50 blur-md" />
            </div>

            {/* Inner dot cursor */}
            <div
                ref={cursorInnerRef}
                className="fixed top-0 left-0 w-2 h-2 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden md:block"
            >
                <div className="w-full h-full rounded-full bg-white" />
            </div>
        </>
    );
}
