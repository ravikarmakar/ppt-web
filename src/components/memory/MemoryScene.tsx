'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ScrollControls, Scroll, useScroll, Float, Text, MeshDistortMaterial, Stars, OrbitControls } from '@react-three/drei';
import { useRef, useState } from 'react';
import * as THREE from 'three';
import { slides } from './MemoryContent';
import MemoryContent from './MemoryContent';

// -----------------------------------------------------------------------------
// Helper for Responsive Positioning
// -----------------------------------------------------------------------------
function useResponsivePosition(defaultX: number) {
    const { viewport } = useThree();
    const isMobile = viewport.width < 7;
    return isMobile ? (defaultX > 0 ? 1.2 : -1.2) : defaultX;
}

// -----------------------------------------------------------------------------
// 3D Components for each section
// -----------------------------------------------------------------------------

interface SceneProps {
    scroll: ReturnType<typeof useScroll>;
    globalScale: number;
}

function BackgroundGrid() {
    const gridRef = useRef<THREE.Mesh>(null);
    useFrame((state) => {
        if (!gridRef.current) return;
        gridRef.current.position.z = Math.sin(state.clock.elapsedTime * 0.1) * 2 - 10;
        gridRef.current.rotation.x = Math.PI / 2.2;
    });

    return (
        <group>
            <gridHelper args={[100, 50, 0x3b82f6, 0x1e293b]} position={[0, -5, 0]} />
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        </group>
    );
}

function FloatingBlocks({ globalScale }: { globalScale: number }) {
    const group = useRef<THREE.Group>(null);

    // Stable random positions using state initializer (satisfies purity rules)
    const [positions] = useState(() => Array.from({ length: 15 }).map(() => [
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
    ]));

    useFrame((state) => {
        if (!group.current) return;
        group.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
        group.current.rotation.y = state.clock.elapsedTime * 0.1;
    });

    return (
        <group ref={group} position={[0, 0, -5]}>
            {positions.map((pos, i) => (
                <Float key={i} speed={1.5} rotationIntensity={1} floatIntensity={2}>
                    <mesh position={pos as [number, number, number]} scale={[globalScale, globalScale, globalScale]}>
                        <boxGeometry args={[1, 1, 1]} />
                        <meshStandardMaterial
                            color={i % 2 === 0 ? "#3b82f6" : "#8b5cf6"}
                            transparent
                            opacity={0.6}
                            wireframe
                        />
                    </mesh>
                </Float>
            ))}
        </group>
    );
}

function IntroBrain({ scroll, globalScale }: SceneProps) {
    const group = useRef<THREE.Group>(null);
    const x = useResponsivePosition(-4);

    useFrame((state) => {
        if (!group.current) return;
        const isVisible = scroll.visible(1 / 9, 1 / 9);
        const targetScale = isVisible ? globalScale : 0;
        group.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
        group.current.rotation.y += 0.01;
        group.current.rotation.z = Math.sin(state.clock.elapsedTime) * 0.1;
    });

    return (
        <group ref={group} position={[x, 0, 0]} scale={[0, 0, 0]}>
            <mesh position={[0.6, 0, 0]}>
                <sphereGeometry args={[1, 16, 16]} />
                <meshStandardMaterial color="#ec4899" wireframe emissive="#ec4899" emissiveIntensity={0.2} />
            </mesh>
            <mesh position={[-0.6, 0, 0]}>
                <sphereGeometry args={[1, 16, 16]} />
                <meshStandardMaterial color="#ec4899" wireframe emissive="#ec4899" emissiveIntensity={0.2} />
            </mesh>
            <Text position={[0, -2, 0]} fontSize={0.3} color="#ec4899" anchorX="center">The OS Brain</Text>
        </group>
    );
}

function ObjectivesIcons({ scroll, globalScale }: SceneProps) {
    const group = useRef<THREE.Group>(null);
    const x = useResponsivePosition(4);

    useFrame(() => {
        if (!group.current) return;
        const isVisible = scroll.visible(2 / 9, 1 / 9);
        const targetScale = isVisible ? globalScale : 0;
        group.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    });

    return (
        <group ref={group} position={[x, 0, 0]} scale={[0, 0, 0]}>
            <Float floatIntensity={2}>
                <mesh position={[-1, 1, 0]}>
                    <icosahedronGeometry args={[0.5, 0]} />
                    <meshStandardMaterial color="#10b981" />
                </mesh>
                <mesh position={[1, 1, 0]}>
                    <boxGeometry args={[0.7, 0.7, 0.7]} />
                    <meshStandardMaterial color="#3b82f6" />
                </mesh>
                <mesh position={[-1, -1, 0]}>
                    <torusGeometry args={[0.4, 0.2, 16, 100]} />
                    <meshStandardMaterial color="#f59e0b" />
                </mesh>
                <mesh position={[1, -1, 0]}>
                    <octahedronGeometry args={[0.6, 0]} />
                    <meshStandardMaterial color="#8b5cf6" />
                </mesh>
            </Float>
            <Text position={[0, 2.5, 0]} fontSize={0.3} color="#10b981" anchorX="center">Multi-Tasking Core</Text>
        </group>
    );
}

function ConstraintsWarning({ scroll, globalScale }: SceneProps) {
    const group = useRef<THREE.Group>(null);
    const x = useResponsivePosition(-4);

    useFrame((state) => {
        if (!group.current) return;
        const isVisible = scroll.visible(3 / 9, 1 / 9);
        const s = isVisible ? (globalScale + Math.sin(state.clock.elapsedTime * 5) * (0.1 * globalScale)) : 0;
        group.current.scale.lerp(new THREE.Vector3(s, s, s), 0.1);
    });

    return (
        <group ref={group} position={[x, 0, 0]} scale={[0, 0, 0]}>
            <mesh rotation={[0, 0, 0]}>
                <coneGeometry args={[1.5, 2, 3]} />
                <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.5} wireframe />
            </mesh>
            <Text position={[0, -0.2, 0.8]} fontSize={1} color="white" fontWeight="bold">!</Text>
            <Text position={[0, -2, 0]} fontSize={0.3} color="#f59e0b" anchorX="center">Hardware Limits</Text>
        </group>
    );
}

function FragmentationVisualizer({ scroll, globalScale }: SceneProps) {
    const group = useRef<THREE.Group>(null);
    const x = useResponsivePosition(4);

    useFrame(() => {
        if (!group.current) return;
        const isVisible = scroll.visible(4 / 9, 1 / 9);
        const targetScale = isVisible ? globalScale : 0;
        group.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    });

    return (
        <group ref={group} position={[x, 0, 0]} scale={[0, 0, 0]}>
            <Text position={[0, 3.5, 0]} fontSize={0.5} anchorX="center">Fragmentation</Text>
            {Array.from({ length: 5 }).map((_, y) => (
                Array.from({ length: 5 }).map((_, x) => {
                    const isHole = (x + y) % 3 === 0;
                    const isOccupied = !isHole;
                    if (!isOccupied) return null;
                    return (
                        <mesh key={`${x}-${y}`} position={[(x - 2) * 1.2, (y - 2) * 1.2, 0]}>
                            <boxGeometry args={[1, 1, 1]} />
                            <meshStandardMaterial color={isOccupied ? "#10b981" : "#ef4444"} transparent opacity={0.8} />
                        </mesh>
                    )
                })
            ))}
            <Text position={[0, -3.5, 0]} fontSize={0.3} color="#ef4444" anchorX="center">Wasted Gaps (External)</Text>
        </group>
    )
}

function MemoryHierarchy({ scroll, globalScale }: SceneProps) {
    const group = useRef<THREE.Group>(null);
    const x = useResponsivePosition(-4);

    useFrame(() => {
        if (!group.current) return;
        const isVisible = scroll.visible(5 / 9, 1 / 9);
        const targetScale = isVisible ? globalScale : 0;
        group.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
        group.current.rotation.y += 0.005;
    });

    return (
        <group ref={group} position={[x, 0, 0]} scale={[0, 0, 0]}>
            <Text position={[0, 4.5, 0]} fontSize={0.5} color="white" anchorX="center">Memory Hierarchy</Text>
            <mesh position={[0, 3, 0]}>
                <coneGeometry args={[1, 1.5, 4]} />
                <meshStandardMaterial color="#ef4444" />
                <Text position={[1.5, 0, 0]} fontSize={0.3} anchorX="left">Registers</Text>
            </mesh>
            <mesh position={[0, 1.5, 0]}>
                <cylinderGeometry args={[1, 2, 1.5, 4]} />
                <meshStandardMaterial color="#f59e0b" />
                <Text position={[2, 0, 0]} fontSize={0.3} anchorX="left">Cache (L1/L2/L3)</Text>
            </mesh>
            <mesh position={[0, -0.2, 0]}>
                <cylinderGeometry args={[2, 3.5, 2, 4]} />
                <meshStandardMaterial color="#3b82f6" />
                <Text position={[3, 0, 0]} fontSize={0.3} anchorX="left">Main Memory (RAM)</Text>
            </mesh>
            <mesh position={[0, -2.5, 0]}>
                <cylinderGeometry args={[3.5, 5, 2.5, 4]} />
                <meshStandardMaterial color="#64748b" />
                <Text position={[4, 0, 0]} fontSize={0.3} anchorX="left">Storage (HDD/SSD)</Text>
            </mesh>
        </group>
    );
}

function OsConductor({ scroll, globalScale }: SceneProps) {
    const group = useRef<THREE.Group>(null);
    const x = useResponsivePosition(4);

    useFrame((state) => {
        if (!group.current) return;
        const isVisible = scroll.visible(6 / 9, 1 / 9);
        const targetScale = isVisible ? globalScale : 0;
        group.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
        group.current.rotation.z = Math.sin(state.clock.elapsedTime * 3) * 0.3;
    });

    return (
        <group ref={group} position={[x, 0, 0]} scale={[0, 0, 0]}>
            <mesh position={[0, 1, 0]}>
                <cylinderGeometry args={[0.05, 0.05, 4, 16]} />
                <meshStandardMaterial color="white" emissive="white" emissiveIntensity={0.5} />
            </mesh>
            <Text position={[0, 3.5, 0]} fontSize={0.3} color="#8b5cf6" anchorX="center">Traffic Controller (OS)</Text>
        </group>
    );
}

function AnalogyScene({ scroll, globalScale }: SceneProps) {
    const group = useRef<THREE.Group>(null);
    const x = useResponsivePosition(-3);

    useFrame(() => {
        if (!group.current) return;
        const isVisible = scroll.visible(7 / 9, 1.5 / 9);
        const targetScale = isVisible ? globalScale : 0;
        group.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    });

    return (
        <group ref={group} position={[x, -1, 0]}>
            <mesh position={[0, -0.5, 0]}>
                <boxGeometry args={[5, 0.2, 3]} />
                <meshStandardMaterial color="#a16207" />
            </mesh>
            <Text position={[0, 0.5, 1]} fontSize={0.4} rotation={[-Math.PI / 6, 0, 0]} anchorX="center">RAM (Desk)</Text>
            <mesh position={[-1, 0, 0.5]}>
                <boxGeometry args={[0.8, 0.1, 1]} />
                <meshStandardMaterial color="white" />
            </mesh>
            <mesh position={[1, 0, 0.8]}>
                <boxGeometry args={[0.8, 0.1, 1]} />
                <meshStandardMaterial color="white" />
            </mesh>
            <group position={[-4, 2, -2]}>
                <mesh>
                    <boxGeometry args={[3, 5, 1]} />
                    <meshStandardMaterial color="#78350f" />
                </mesh>
                <Text position={[0, 3, 0]} fontSize={0.4} anchorX="center">HDD (Shelf)</Text>
                {Array.from({ length: 10 }).map((_, i) => (
                    <mesh key={i} position={[0, i * 0.4 - 1.8, 0.6]}>
                        <boxGeometry args={[2, 0.3, 0.8]} />
                        <meshStandardMaterial color={`hsl(${i * 30}, 70%, 50%)`} />
                    </mesh>
                ))}
            </group>
        </group>
    )
}

function SummaryCheck({ scroll, globalScale }: SceneProps) {
    const group = useRef<THREE.Group>(null);
    const x = useResponsivePosition(4);

    useFrame(() => {
        if (!group.current) return;
        const isVisible = scroll.visible(8 / 9, 1 / 9);
        const targetScale = isVisible ? globalScale : 0;
        group.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
        group.current.rotation.y += 0.01;
    });

    return (
        <group ref={group} position={[x, 0, 0]} scale={[0, 0, 0]}>
            <Float>
                <mesh>
                    <torusKnotGeometry args={[1, 0.3, 100, 16]} />
                    <MeshDistortMaterial color="#10b981" distort={0.4} speed={2} />
                </mesh>
            </Float>
            <Text position={[0, -2.5, 0]} fontSize={0.5} color="#10b981" anchorX="center">Optimized Performance</Text>
        </group>
    );
}

function SceneDirector({ globalScale }: { globalScale: number }) {
    const scroll = useScroll();

    useFrame((state) => {
        const offset = scroll.offset;
        state.camera.position.z = 10 - offset * 2;
        state.camera.lookAt(0, 0, 0);
    });

    return (
        <>
            <BackgroundGrid />
            <FloatingBlocks globalScale={globalScale} />
            <IntroBrain scroll={scroll} globalScale={globalScale} />
            <ObjectivesIcons scroll={scroll} globalScale={globalScale} />
            <ConstraintsWarning scroll={scroll} globalScale={globalScale} />
            <FragmentationVisualizer scroll={scroll} globalScale={globalScale} />
            <MemoryHierarchy scroll={scroll} globalScale={globalScale} />
            <OsConductor scroll={scroll} globalScale={globalScale} />
            <AnalogyScene scroll={scroll} globalScale={globalScale} />
            <SummaryCheck scroll={scroll} globalScale={globalScale} />
        </>
    );
}

export default function MemoryScene() {
    const [globalScale, setGlobalScale] = useState(1);

    return (
        <div className="w-full h-screen bg-slate-950 relative">
            {/* Slider UI */}
            <div className="absolute top-4 right-4 z-50 flex flex-col items-center gap-2 p-4 bg-black/50 backdrop-blur-md rounded-xl border border-white/10">
                <label className="text-white text-xs font-mono tracking-widest uppercase">
                    Object Scale
                </label>
                <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.1"
                    value={globalScale}
                    onChange={(e) => setGlobalScale(parseFloat(e.target.value))}
                    className="w-32 accent-blue-500 cursor-pointer"
                />
                <span className="text-blue-300 font-mono text-xs">{globalScale}x</span>
            </div>

            <Canvas shadows camera={{ position: [0, 0, 10], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <spotLight position={[-10, 10, 10]} angle={0.5} penumbra={1} intensity={10} castShadow />

                <OrbitControls enableZoom={false} enablePan={true} />

                <ScrollControls pages={slides.length} damping={0.2}>
                    <SceneDirector globalScale={globalScale} />
                    <Scroll html style={{ width: '100%' }}>
                        <MemoryContent />
                    </Scroll>
                </ScrollControls>
            </Canvas>
        </div>
    );
}
