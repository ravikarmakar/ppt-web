'use client';

import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    color: string;
    alpha: number;
    life: number;
    maxLife: number;
}

export default function ParticleUniverse() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: 0, y: 0, isMoving: false });
    const particlesRef = useRef<Particle[]>([]);
    const frameRef = useRef<number>(0);

    const colors = [
        '#3b82f6', // Blue
        '#8b5cf6', // Purple
        '#ec4899', // Pink
        '#f59e0b', // Amber
        '#22c55e', // Green
        '#06b6d4', // Cyan
        '#ef4444', // Red
        '#ffffff', // White
    ];

    const createParticle = useCallback((x: number, y: number, isMouseParticle = false): Particle => {
        const angle = Math.random() * Math.PI * 2;
        const speed = isMouseParticle ? Math.random() * 3 + 2 : Math.random() * 0.5 + 0.1;

        return {
            x,
            y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            size: isMouseParticle ? Math.random() * 4 + 2 : Math.random() * 3 + 1,
            color: colors[Math.floor(Math.random() * colors.length)],
            alpha: 1,
            life: 0,
            maxLife: isMouseParticle ? 60 + Math.random() * 40 : 300 + Math.random() * 200,
        };
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        // Initialize background particles
        for (let i = 0; i < 150; i++) {
            particlesRef.current.push(
                createParticle(
                    Math.random() * canvas.width,
                    Math.random() * canvas.height
                )
            );
        }

        // Mouse handlers
        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current.x = e.clientX;
            mouseRef.current.y = e.clientY;
            mouseRef.current.isMoving = true;

            // Create trail particles
            for (let i = 0; i < 3; i++) {
                particlesRef.current.push(
                    createParticle(e.clientX, e.clientY, true)
                );
            }
        };

        const handleMouseStop = () => {
            mouseRef.current.isMoving = false;
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseout', handleMouseStop);

        // Animation loop
        const animate = () => {
            ctx.fillStyle = 'rgba(10, 15, 26, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Update and draw particles
            particlesRef.current = particlesRef.current.filter((particle) => {
                particle.life++;
                particle.alpha = 1 - particle.life / particle.maxLife;

                // Mouse attraction/repulsion
                const dx = mouseRef.current.x - particle.x;
                const dy = mouseRef.current.y - particle.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 200 && mouseRef.current.isMoving) {
                    const force = (200 - dist) / 200;
                    particle.vx += (dx / dist) * force * 0.5;
                    particle.vy += (dy / dist) * force * 0.5;
                }

                // Apply velocity with damping
                particle.vx *= 0.98;
                particle.vy *= 0.98;
                particle.x += particle.vx;
                particle.y += particle.vy;

                // Draw particle
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = particle.color;
                ctx.globalAlpha = particle.alpha * 0.8;
                ctx.fill();

                // Draw glow
                const gradient = ctx.createRadialGradient(
                    particle.x, particle.y, 0,
                    particle.x, particle.y, particle.size * 3
                );
                gradient.addColorStop(0, particle.color);
                gradient.addColorStop(1, 'transparent');
                ctx.fillStyle = gradient;
                ctx.globalAlpha = particle.alpha * 0.3;
                ctx.fillRect(
                    particle.x - particle.size * 3,
                    particle.y - particle.size * 3,
                    particle.size * 6,
                    particle.size * 6
                );

                ctx.globalAlpha = 1;

                // Keep background particles alive
                if (particle.life >= particle.maxLife) {
                    if (!particle.maxLife || particle.maxLife > 100) {
                        // Reset background particle
                        particle.x = Math.random() * canvas.width;
                        particle.y = Math.random() * canvas.height;
                        particle.life = 0;
                        particle.alpha = 1;
                        return true;
                    }
                    return false;
                }
                return true;
            });

            // Draw connections between close particles
            ctx.strokeStyle = 'rgba(59, 130, 246, 0.1)';
            ctx.lineWidth = 0.5;
            for (let i = 0; i < particlesRef.current.length; i++) {
                for (let j = i + 1; j < particlesRef.current.length; j++) {
                    const dx = particlesRef.current[i].x - particlesRef.current[j].x;
                    const dy = particlesRef.current[i].y - particlesRef.current[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 100) {
                        ctx.globalAlpha = (1 - dist / 100) * 0.3;
                        ctx.beginPath();
                        ctx.moveTo(particlesRef.current[i].x, particlesRef.current[i].y);
                        ctx.lineTo(particlesRef.current[j].x, particlesRef.current[j].y);
                        ctx.stroke();
                    }
                }
            }
            ctx.globalAlpha = 1;

            frameRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseout', handleMouseStop);
            cancelAnimationFrame(frameRef.current);
        };
    }, [createParticle]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none"
            style={{ background: 'transparent' }}
        />
    );
}
