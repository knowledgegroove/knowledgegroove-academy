'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float, MeshDistortMaterial, Html } from '@react-three/drei';
import * as THREE from 'three';

// Reusable Neon Building Component
export function Building({ position, args, color, delay = 0 }: any) {
    const mesh = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (mesh.current) {
            mesh.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + delay) * 0.2;
        }
    });

    return (
        <mesh ref={mesh} position={position}>
            <boxGeometry args={args} />
            <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.5}
                roughness={0.1}
                metalness={0.8}
                transparent
                opacity={0.9}
            />
            {/* Wireframe effect overlay */}
            <lineSegments>
                <edgesGeometry args={[new THREE.BoxGeometry(...args)]} />
                <lineBasicMaterial color="white" transparent opacity={0.2} />
            </lineSegments>
        </mesh>
    );
}

export function PodcastDistrict({ position }: { position: [number, number, number] }) {
    const episodes = [
        "Rise of Nike", "The Eiffel Tower", "Olympics",
        "First Airplane", "Silk Road", "Dust Bowl"
    ];

    return (
        <group position={position}>
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                {/* Main Tower */}
                <Building position={[0, 4, 0]} args={[4, 8, 4]} color="#a855f7" />
                {/* Side Towers */}
                <Building position={[-3, 2, 1]} args={[2, 4, 2]} color="#8b5cf6" delay={1} />
                <Building position={[3, 3, -1]} args={[2, 6, 2]} color="#d8b4fe" delay={2} />

                {/* Floating Mic Hologram */}
                <mesh position={[0, 9, 0]}>
                    <sphereGeometry args={[0.5, 32, 32]} />
                    <meshStandardMaterial color="#fff" emissive="#a855f7" emissiveIntensity={2} />
                </mesh>

                {/* Episode Holograms */}
                {episodes.map((ep, i) => (
                    <Text
                        key={i}
                        position={[Math.sin(i) * 3, 6 + i * 0.8, Math.cos(i) * 3]}
                        fontSize={0.3}
                        color="#d8b4fe"
                        anchorX="center"
                        anchorY="middle"
                        rotation={[0, -Math.atan2(Math.sin(i) * 3, Math.cos(i) * 3), 0]}
                    >
                        {ep}
                    </Text>
                ))}

                <Text
                    position={[0, 11, 0]}
                    fontSize={0.8}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                    outlineWidth={0.05}
                    outlineColor="#a855f7"
                >
                    The Knowledge Groove Podcast
                </Text>
            </Float>
        </group>
    );
}

export function FinTechDistrict({ position }: { position: [number, number, number] }) {
    return (
        <group position={position}>
            <Float speed={3} rotationIntensity={0.3} floatIntensity={0.4}>
                {/* Stock Chart Tower */}
                <Building position={[0, 5, 0]} args={[3, 10, 3]} color="#00C4FF" />

                {/* Data Blocks */}
                <Building position={[-2.5, 1, 2]} args={[1.5, 2, 1.5]} color="#3b82f6" delay={0.5} />
                <Building position={[2.5, 2, 2]} args={[1.5, 4, 1.5]} color="#60a5fa" delay={1.5} />

                {/* Massive Hologram Graph */}
                <group position={[0, 11, 0]}>
                    <mesh>
                        <planeGeometry args={[6, 3]} />
                        <meshBasicMaterial color="#00C4FF" transparent opacity={0.2} side={THREE.DoubleSide} />
                    </mesh>
                    <lineSegments>
                        <edgesGeometry args={[new THREE.PlaneGeometry(6, 3, 10, 5)]} />
                        <lineBasicMaterial color="#00C4FF" transparent opacity={0.5} />
                    </lineSegments>
                    {/* Graph Line */}
                    <mesh position={[0, 0, 0.1]}>
                        <torusGeometry args={[1.5, 0.05, 16, 100, Math.PI]} />
                        <meshBasicMaterial color="#fff" />
                    </mesh>
                </group>

                <Text
                    position={[0, 13.5, 0]}
                    fontSize={0.8}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                    outlineWidth={0.05}
                    outlineColor="#00C4FF"
                >
                    Knowledge Groove AI + FinTech Lab
                </Text>
            </Float>
        </group>
    );
}

export function AcademyDistrict({ position }: { position: [number, number, number] }) {
    const words = ["Confidence", "Fluency", "STEM Skills"];

    return (
        <group position={position}>
            <Float speed={2} rotationIntensity={0.1} floatIntensity={0.6}>
                {/* Campus Buildings */}
                <Building position={[0, 3, 0]} args={[6, 4, 4]} color="#ec4899" /> {/* Classroom Block */}
                <Building position={[-4, 4, 0]} args={[2, 6, 2]} color="#f472b6" delay={1} /> {/* Speech Tower */}
                <Building position={[4, 2, 0]} args={[3, 3, 3]} color="#fbcfe8" delay={2} /> {/* Workshop */}

                {/* Floating Words */}
                {words.map((word, i) => (
                    <Text
                        key={i}
                        position={[Math.sin(i * 2) * 4, 7 + i, 0]}
                        fontSize={0.5}
                        color="#fbcfe8"
                        anchorX="center"
                        anchorY="middle"
                    >
                        {word}
                    </Text>
                ))}

                <Text
                    position={[0, 9, 0]}
                    fontSize={0.8}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                    outlineWidth={0.05}
                    outlineColor="#ec4899"
                >
                    Knowledge Groove Academy
                </Text>
            </Float>
        </group>
    );
}

export function CreatorTower({ position }: { position: [number, number, number] }) {
    return (
        <group position={position}>
            <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
                {/* Main HQ Tower */}
                <Building position={[0, 8, 0]} args={[4, 16, 4]} color="#E4F2FF" />

                {/* Floating Icons (Represented by simple shapes for performance) */}
                <group position={[0, 10, 0]}>
                    {/* Mic */}
                    <mesh position={[3, 0, 0]}>
                        <capsuleGeometry args={[0.3, 1, 4, 8]} />
                        <meshStandardMaterial color="#a855f7" />
                    </mesh>
                    {/* Chart */}
                    <mesh position={[-3, 2, 1]}>
                        <boxGeometry args={[1, 1, 0.1]} />
                        <meshStandardMaterial color="#00C4FF" />
                    </mesh>
                    {/* Book */}
                    <mesh position={[2, 4, -2]}>
                        <boxGeometry args={[1, 1.2, 0.3]} />
                        <meshStandardMaterial color="#ec4899" />
                    </mesh>
                </group>

                {/* Spotlight Beam */}
                <mesh position={[0, 18, 0]} rotation={[0, 0, 0]}>
                    <cylinderGeometry args={[0.1, 4, 10, 32, 1, true]} />
                    <meshBasicMaterial color="#fff" transparent opacity={0.1} side={THREE.DoubleSide} />
                </mesh>

                <Text
                    position={[0, 19, 0]}
                    fontSize={1.2}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                    outlineWidth={0.05}
                    outlineColor="#000"
                >
                    I'm Ishaan Garg
                </Text>
            </Float>
        </group>
    );
}
