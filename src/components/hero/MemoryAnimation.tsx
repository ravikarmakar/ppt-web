'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function FloatingShape({
    position,
    geometry,
    color,
    speed,
    distort,
}: {
    position: [number, number, number];
    geometry: 'torus' | 'icosahedron' | 'octahedron' | 'dodecahedron' | 'box';
    color: string;
    speed: number;
    distort: number;
}) {
    const meshRef = useRef<THREE.Mesh>(null);
    const timeRef = useRef(Math.random() * 100);

    useFrame(() => {
        if (meshRef.current) {
            timeRef.current += 0.01 * speed;
            meshRef.current.rotation.x += 0.003 * speed;
            meshRef.current.rotation.y += 0.005 * speed;
            meshRef.current.rotation.z += 0.002 * speed;
        }
    });

    return (
        <Float speed={speed} rotationIntensity={0.8} floatIntensity={1.5}>
            <mesh ref={meshRef} position={position} castShadow>
                {geometry === 'torus' && <torusGeometry args={[0.8, 0.3, 16, 32]} />}
                {geometry === 'icosahedron' && <icosahedronGeometry args={[0.7, 0]} />}
                {geometry === 'octahedron' && <octahedronGeometry args={[0.6, 0]} />}
                {geometry === 'dodecahedron' && <dodecahedronGeometry args={[0.5, 0]} />}
                {geometry === 'box' && <boxGeometry args={[0.6, 0.6, 0.6]} />}
                <MeshDistortMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={0.5}
                    metalness={0.9}
                    roughness={0.1}
                    distort={distort}
                    speed={2}
                />
            </mesh>
        </Float>
    );
}

function RainbowParticles() {
    const particlesRef = useRef<THREE.Points>(null);
    const particleCount = 200;

    const [positions, colors] = useMemo(() => {
        const pos = new Float32Array(particleCount * 3);
        const col = new Float32Array(particleCount * 3);
        const colorPalette = [
            new THREE.Color('#3b82f6'),
            new THREE.Color('#8b5cf6'),
            new THREE.Color('#ec4899'),
            new THREE.Color('#f59e0b'),
            new THREE.Color('#22c55e'),
            new THREE.Color('#06b6d4'),
        ];

        for (let i = 0; i < particleCount; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 15;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 8;

            const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
            col[i * 3] = color.r;
            col[i * 3 + 1] = color.g;
            col[i * 3 + 2] = color.b;
        }
        return [pos, col];
    }, []);

    useFrame((state) => {
        if (particlesRef.current) {
            particlesRef.current.rotation.y = state.clock.elapsedTime * 0.03;
            particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
        }
    });

    return (
        <points ref={particlesRef}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
                <bufferAttribute attach="attributes-color" args={[colors, 3]} />
            </bufferGeometry>
            <pointsMaterial
                size={0.08}
                vertexColors
                transparent
                opacity={0.8}
                sizeAttenuation
            />
        </points>
    );
}

function OrbitingRing({ radius, color, speed }: { radius: number; color: string; speed: number }) {
    const ringRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (ringRef.current) {
            ringRef.current.rotation.z = state.clock.elapsedTime * speed;
        }
    });

    return (
        <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[radius, 0.02, 8, 64]} />
            <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.8}
                transparent
                opacity={0.6}
            />
        </mesh>
    );
}

function Scene() {
    const shapes = [
        { position: [-3, 1.5, -1] as [number, number, number], geometry: 'torus' as const, color: '#3b82f6', speed: 1.5, distort: 0.2 },
        { position: [3, -1, -2] as [number, number, number], geometry: 'icosahedron' as const, color: '#8b5cf6', speed: 1.2, distort: 0.3 },
        { position: [-2.5, -1.5, 0] as [number, number, number], geometry: 'octahedron' as const, color: '#ec4899', speed: 1.8, distort: 0.15 },
        { position: [2.5, 1, -1.5] as [number, number, number], geometry: 'dodecahedron' as const, color: '#22c55e', speed: 1, distort: 0.25 },
        { position: [0, 2.5, -2] as [number, number, number], geometry: 'box' as const, color: '#f59e0b', speed: 1.3, distort: 0.2 },
        { position: [-1, -2, -1] as [number, number, number], geometry: 'torus' as const, color: '#06b6d4', speed: 1.6, distort: 0.18 },
        { position: [1.5, 0, 1] as [number, number, number], geometry: 'icosahedron' as const, color: '#ef4444', speed: 1.4, distort: 0.22 },
    ];

    return (
        <>
            {/* Ambient lighting */}
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
            <pointLight position={[-10, -10, -10]} intensity={0.8} color="#8b5cf6" />
            <pointLight position={[0, 10, 5]} intensity={0.5} color="#3b82f6" />

            {/* Orbiting rings */}
            <OrbitingRing radius={4} color="#3b82f6" speed={0.3} />
            <OrbitingRing radius={5} color="#8b5cf6" speed={-0.2} />
            <OrbitingRing radius={6} color="#ec4899" speed={0.15} />

            {/* Floating geometric shapes */}
            {shapes.map((shape, i) => (
                <FloatingShape key={i} {...shape} />
            ))}

            {/* Rainbow particles */}
            <RainbowParticles />
        </>
    );
}

export default function GeometricScene() {
    return (
        <div className="absolute inset-0 z-0">
            <Canvas
                camera={{ position: [0, 0, 7], fov: 50 }}
                gl={{ antialias: true, alpha: true }}
            >
                <Scene />
            </Canvas>
        </div>
    );
}
