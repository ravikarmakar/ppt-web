'use client';

import { useEffect, useRef } from 'react';

export default function NoiseOverlay() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = 256;
        canvas.height = 256;

        const createNoise = () => {
            const imageData = ctx.createImageData(canvas.width, canvas.height);
            const data = imageData.data;

            for (let i = 0; i < data.length; i += 4) {
                const noise = Math.random() * 255;
                data[i] = noise;     // R
                data[i + 1] = noise; // G
                data[i + 2] = noise; // B
                data[i + 3] = 15;    // A (very subtle)
            }

            ctx.putImageData(imageData, 0, 0);
        };

        // Animate noise
        const animate = () => {
            createNoise();
            requestAnimationFrame(animate);
        };

        animate();
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-50 pointer-events-none opacity-30 mix-blend-overlay"
            style={{
                width: '100%',
                height: '100%',
                imageRendering: 'pixelated',
            }}
        />
    );
}
