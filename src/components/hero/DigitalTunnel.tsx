'use client';

import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Float } from '@react-three/drei';
import * as THREE from 'three';

function TunnelMesh() {
    const meshRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<THREE.ShaderMaterial>(null);

    const tunnelShader = useMemo(() => ({
        uniforms: {
            uTime: { value: 0 },
        },
        vertexShader: `
            varying vec2 vUv;
            varying float vDepth;
            uniform float uTime;

            void main() {
                vUv = uv;
                vec3 pos = position;
                
                // Add a subtle "breath" or wobble to the tunnel
                float warp = sin(pos.z * 0.1 + uTime) * 0.5;
                pos.x += warp;
                pos.y += cos(pos.z * 0.15 + uTime) * 0.5;

                vec4 modelViewPosition = modelViewMatrix * vec4(pos, 1.0);
                vDepth = -modelViewPosition.z;
                gl_Position = projectionMatrix * modelViewPosition;
            }
        `,
        fragmentShader: `
            uniform float uTime;
            varying vec2 vUv;
            varying float vDepth;

            // Cosine based palette, 4 vec3 params
            vec3 palette( in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d )
            {
                return a + b * cos( 6.28318 * (c * t + d) );
            }

            void main() {
                // Moving grid
                float gridScroll = vUv.y * 3.0 + uTime * 0.8;
                float gridX = step(0.95, fract(vUv.x * 12.0 + sin(uTime + vUv.y * 5.0) * 0.2)); 
                float gridY = step(0.95, fract(gridScroll)); 
                
                float grid = max(gridX, gridY);
                
                // Rainbow coloring logic
                float colorFactor = vUv.x + vUv.y * 0.2 + uTime * 0.2;
                
                vec3 col = palette(colorFactor, 
                    vec3(0.5, 0.5, 0.5), 
                    vec3(0.5, 0.5, 0.5), 
                    vec3(1.0, 1.0, 1.0), 
                    vec3(0.00, 0.33, 0.67)
                );

                vec3 finalColor = col * vec3(2.0); // HDR-ish
                float fog = smoothstep(60.0, 5.0, vDepth);
                float alpha = grid * fog;

                gl_FragColor = vec4(finalColor, alpha);
            }
        `
    }), []);

    useFrame((state) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
        }
    });

    return (
        <mesh ref={meshRef} position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[12, 12, 120, 32, 1, true]} />
            <shaderMaterial
                ref={materialRef}
                attach="material"
                args={[tunnelShader]}
                side={THREE.BackSide}
                transparent={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </mesh>
    );
}

function HyperStars() {
    const count = 400;
    const mesh = useRef<THREE.InstancedMesh>(null);

    // State for star data
    const [starData, setStarData] = useState<{ positions: Float32Array; colors: Float32Array } | null>(null);

    useEffect(() => {
        const posAndSpeed = new Float32Array(count * 4); // x, y, z, speed
        const cols = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            posAndSpeed[i * 4] = (Math.random() - 0.5) * 50;
            posAndSpeed[i * 4 + 1] = (Math.random() - 0.5) * 50;
            posAndSpeed[i * 4 + 2] = Math.random() * 100 - 50;
            posAndSpeed[i * 4 + 3] = Math.random() * 0.8 + 0.2; // Higher speed

            const color = new THREE.Color().setHSL(Math.random(), 0.8, 0.6);
            cols[i * 3] = color.r;
            cols[i * 3 + 1] = color.g;
            cols[i * 3 + 2] = color.b;
        }
        setStarData({ positions: posAndSpeed, colors: cols });
    }, [count]);

    const dummy = useMemo(() => new THREE.Object3D(), []);

    useFrame((state) => {
        if (!mesh.current || !starData) return;
        const time = state.clock.elapsedTime;
        const data = starData.positions;

        for (let i = 0; i < count; i++) {
            const x = data[i * 4];
            const y = data[i * 4 + 1];
            const originalZ = data[i * 4 + 2];
            const speed = data[i * 4 + 3];

            // Move stars towards camera quickly
            let z = originalZ + time * 20 * speed;
            if (z > 20) z -= 120; // Loop back far away

            const scale = Math.max(0.1, Math.min(1.5, (z + 80) / 100));

            dummy.position.set(x, y, z);
            dummy.scale.set(scale, scale, scale * 8); // Long streak
            dummy.updateMatrix();
            mesh.current.setMatrixAt(i, dummy.matrix);
        }
        mesh.current.instanceMatrix.needsUpdate = true;
    });

    // Don't render until data is ready
    if (!starData) return null;

    const colorArray = starData.colors;

    return (
        <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
            <boxGeometry args={[0.08, 0.08, 1]} />
            <meshBasicMaterial vertexColors transparent opacity={0.8} blending={THREE.AdditiveBlending} />
            <instancedBufferAttribute attach="attributes-color" args={[colorArray, 3]} />
        </instancedMesh>
    );
}



export default function DigitalTunnel() {
    return (
        <div className="absolute inset-0 z-0">
            <Canvas
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: "high-performance"
                }}
            >
                <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={80} />

                <group rotation={[0, 0, Math.PI / 8]}>
                    <TunnelMesh />
                </group>

                <HyperStars />

                <fogExp2 attach="fog" args={['#000000', 0.015]} />
            </Canvas>
        </div>
    );
}
