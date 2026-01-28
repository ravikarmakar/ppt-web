'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, ContactShadows, Environment } from '@react-three/drei';
import * as THREE from 'three';

function TechShape({
    position,
    geometry,
    color,
    scale,
    rotationSpeed
}: {
    position: [number, number, number];
    geometry: 'icosahedron' | 'octahedron' | 'dodecahedron';
    color: string;
    scale: number;
    rotationSpeed: number;
}) {
    const groupRef = useRef<THREE.Group>(null);
    const meshRef = useRef<THREE.Mesh>(null);
    const wireframeRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (groupRef.current) {
            // Gentle float derived from time
            const t = state.clock.getElapsedTime();
            groupRef.current.position.y = position[1] + Math.sin(t * 0.5 + position[0]) * 0.2;
            groupRef.current.rotation.x = t * 0.1 * rotationSpeed;
            groupRef.current.rotation.z = t * 0.05 * rotationSpeed;
        }
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.002 * rotationSpeed;
            meshRef.current.rotation.x += 0.001 * rotationSpeed;
        }
        if (wireframeRef.current) {
            // Wireframe rotates slightly faster/differently for layering effect
            wireframeRef.current.rotation.y -= 0.005 * rotationSpeed;
            wireframeRef.current.rotation.x -= 0.002 * rotationSpeed;
        }
    });

    const GeometryComponent = {
        icosahedron: <icosahedronGeometry args={[1, 0]} />,
        octahedron: <octahedronGeometry args={[1, 0]} />,
        dodecahedron: <dodecahedronGeometry args={[1, 0]} />,
    }[geometry];

    return (
        <group ref={groupRef} position={position} scale={scale}>
            {/* Glass Core */}
            <mesh ref={meshRef}>
                {GeometryComponent}
                <meshPhysicalMaterial
                    color={color}
                    transmission={0.6}
                    thickness={2}
                    roughness={0.1}
                    metalness={0.4}
                    clearcoat={1}
                    clearcoatRoughness={0.1}
                    ior={1.5}
                />
            </mesh>

            {/* Wireframe Shell */}
            <mesh ref={wireframeRef} scale={1.2}>
                {GeometryComponent}
                <meshBasicMaterial
                    color={color}
                    wireframe={true}
                    transparent={true}
                    opacity={0.3}
                />
            </mesh>
        </group>
    );
}

function FloatingParticles() {
    const count = 150;
    const mesh = useRef<THREE.InstancedMesh>(null);

    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const t = Math.random() * 100;
            const factor = 20 + Math.random() * 100;
            const speed = 0.01 + Math.random() / 200;
            const xFactor = -5 + Math.random() * 10;
            const yFactor = -5 + Math.random() * 10;
            const zFactor = -5 + Math.random() * 10;
            temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
        }
        return temp;
    }, [count]);

    const dummy = useMemo(() => new THREE.Object3D(), []);

    useFrame((state) => {
        if (!mesh.current) return;

        particles.forEach((particle, i) => {
            let { t, factor, speed, xFactor, yFactor, zFactor } = particle;

            // Update time
            t = particle.t += speed / 2;
            const a = Math.cos(t) + Math.sin(t * 1) / 10;
            const b = Math.sin(t) + Math.cos(t * 2) / 10;
            const s = Math.cos(t);

            dummy.position.set(
                (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
                (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
                (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
            );
            dummy.scale.set(s, s, s);
            dummy.rotation.set(s * 5, s * 5, s * 5);
            dummy.updateMatrix();

            mesh.current!.setMatrixAt(i, dummy.matrix);
        });
        mesh.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
            <dodecahedronGeometry args={[0.05, 0]} />
            <meshBasicMaterial color="#60a5fa" transparent opacity={0.4} />
        </instancedMesh>
    );
}

function GridPlane() {
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -4, 0]}>
            <planeGeometry args={[50, 50, 40, 40]} />
            <meshBasicMaterial
                wireframe
                color="#3b82f6"
                transparent
                opacity={0.15}
            />
        </mesh>
    );
}

function Scene() {
    const shapes = [
        { position: [-4, 2, -2] as [number, number, number], geometry: 'icosahedron' as const, color: '#3b82f6', scale: 0.8, rotationSpeed: 1 },
        { position: [4, -1, -3] as [number, number, number], geometry: 'dodecahedron' as const, color: '#8b5cf6', scale: 1.2, rotationSpeed: 0.8 },
        { position: [-3, -3, 1] as [number, number, number], geometry: 'octahedron' as const, color: '#06b6d4', scale: 0.6, rotationSpeed: 1.5 },
        { position: [5, 3, -4] as [number, number, number], geometry: 'icosahedron' as const, color: '#ec4899', scale: 0.9, rotationSpeed: 0.5 },
    ];

    return (
        <>
            {/* Lighting */}
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={2} color="#ffffff" />
            <pointLight position={[-10, -5, 5]} intensity={1} color="#3b82f6" />

            {/* Environment map for reflections */}
            <Environment preset="city" />

            {/* Geometric Tech Shapes */}
            {shapes.map((shape, i) => (
                <Float key={i} speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                    <TechShape {...shape} />
                </Float>
            ))}

            {/* Background elements */}
            <FloatingParticles />
            {/* <GridPlane />  -- Removed to reduce clutter as per user request */}
        </>
    );
}

export default function GeometricScene() {
    return (
        <div className="absolute inset-0 z-0 opacity-80 pointer-events-none">
            <Canvas
                camera={{ position: [0, 0, 10], fov: 45 }}
                gl={{
                    antialias: true,
                    alpha: true,
                    // Power preference ensures better GPU usage
                    powerPreference: "high-performance"
                }}
                dpr={[1, 2]} // Handle high DPI screens
            >
                <Scene />
            </Canvas>
        </div>
    );
}
