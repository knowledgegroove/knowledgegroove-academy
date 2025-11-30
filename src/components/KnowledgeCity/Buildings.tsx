'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float, MeshDistortMaterial } from '@react-three/drei';
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
    return (
        <group position={position}>
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                {/* Main Tower */}
                <Building position={[0, 4, 0]} args={[4, 8, 4]} color="#a855f7" />
                {/* Side Towers */}
                <Building position={[-3, 2, 1]} args={[2, 4, 2]} color="#8b5cf6" delay={1} />
                <Building position={[3, 3, -1]} args={[2, 6, 2]} color="#d8b4fe" delay={2} />

                {/* Floating Mic Hologram Representation */}
                <mesh position={[0, 9, 0]}>
                    <sphereGeometry args={[0.5, 32, 32]} />
                    <meshStandardMaterial color="#fff" emissive="#a855f7" emissiveIntensity={2} />
                </mesh>

                <Text
                    position={[0, 11, 0]}
                    fontSize={1}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                    outlineWidth={0.05}
                    outlineColor="#a855f7"
                >
                    Podcast Plaza
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

                {/* Floating Graph Nodes */}
                <mesh position={[0, 11, 0]}>
                    <octahedronGeometry args={[0.8]} />
                    <MeshDistortMaterial color="#00C4FF" speed={5} distort={0.4} />
                </mesh>

                <Text
                    position={[0, 13, 0]}
                    fontSize={1}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                    outlineWidth={0.05}
                    outlineColor="#00C4FF"
                >
                    FinTech & AI Lab
                </Text>
            </Float>
        </group>
    );
}

export function AcademyDistrict({ position }: { position: [number, number, number] }) {
    return (
        <group position={position}>
            <Float speed={2} rotationIntensity={0.1} floatIntensity={0.6}>
                {/* Campus Buildings */}
                <Building position={[0, 3, 0]} args={[6, 4, 4]} color="#ec4899" />
                <Building position={[-4, 2, 0]} args={[3, 3, 3]} color="#f472b6" delay={1} />
                <Building position={[4, 2, 0]} args={[3, 3, 3]} color="#fbcfe8" delay={2} />

                {/* Floating Book/Knowledge Symbol */}
                <mesh position={[0, 7, 0]}>
                    <boxGeometry args={[1, 1.2, 0.2]} />
                    <meshStandardMaterial color="#fff" emissive="#ec4899" emissiveIntensity={1} />
                </mesh>

                <Text
                    position={[0, 9, 0]}
                    fontSize={1}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                    outlineWidth={0.05}
                    outlineColor="#ec4899"
                >
                    KG Academy
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
                <Building position={[0, 8, 0]} args={[5, 16, 5]} color="#E4F2FF" />

                {/* Halo Ring */}
                <mesh position={[0, 17, 0]} rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[4, 0.1, 16, 100]} />
                    <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={5} />
                </mesh>

                <Text
                    position={[0, 19, 0]}
                    fontSize={1.5}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                    outlineWidth={0.05}
                    outlineColor="#000"
                >
                    Ishaan Garg
                </Text>
            </Float>
        </group>
    );
}
