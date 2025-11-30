'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float, RoundedBox, useScroll } from '@react-three/drei';
import * as THREE from 'three';

// Road Segment Component
export function Road({ position, rotation = [0, 0, 0], length = 20 }: any) {
    return (
        <group position={position} rotation={rotation}>
            {/* Road Surface */}
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[4, length]} />
                <meshStandardMaterial color="#333" roughness={0.8} />
            </mesh>
            {/* Road Markings */}
            <MovingMarkings length={length} />
        </group>
    );
}

function MovingMarkings({ length }: { length: number }) {
    const markings = useRef<THREE.Group>(null);
    const scroll = useScroll();

    useFrame(() => {
        if (markings.current) {
            const offset = scroll.offset * 50;
            markings.current.children.forEach((child: any, i) => {
                const zPos = ((offset + i * 5) % length) - length / 2;
                child.position.z = -zPos;
            });
        }
    });

    return (
        <group ref={markings} position={[0, 0.02, 0]}>
            {[...Array(Math.floor(length / 5))].map((_, i) => (
                <mesh key={i} rotation={[-Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[0.2, 2]} />
                    <meshBasicMaterial color="#fff" />
                </mesh>
            ))}
        </group>
    );
}

// Podcast District - Giant Microphone with Animated Lights
export function PodcastDistrict({ position }: { position: [number, number, number] }) {
    const lightsRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (lightsRef.current) {
            lightsRef.current.children.forEach((light: any, i) => {
                // Pulsing effect with offset for each light
                const pulse = Math.sin(state.clock.elapsedTime * 2 + i * 0.5) * 0.5 + 0.5;
                light.intensity = pulse * 2;
            });
        }
    });

    return (
        <group position={position}>
            <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
                {/* Microphone Base */}
                <mesh position={[0, 1, 0]}>
                    <cylinderGeometry args={[0.8, 1.2, 2, 16]} />
                    <meshStandardMaterial color="#2d2d2d" metalness={0.8} roughness={0.2} />
                </mesh>

                {/* Microphone Body */}
                <mesh position={[0, 4, 0]}>
                    <cylinderGeometry args={[1.5, 1.5, 6, 16]} />
                    <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} />
                </mesh>

                {/* Microphone Grille/Head */}
                <mesh position={[0, 7.5, 0]}>
                    <sphereGeometry args={[2, 16, 16]} />
                    <meshStandardMaterial color="#a855f7" metalness={0.6} roughness={0.3} />
                </mesh>

                {/* Animated Light Rings */}
                <group ref={lightsRef}>
                    <pointLight position={[0, 3, 0]} color="#ff00ff" distance={10} />
                    <pointLight position={[0, 5, 0]} color="#00ffff" distance={10} />
                    <pointLight position={[0, 7, 0]} color="#ffff00" distance={10} />
                </group>

                {/* Glowing Rings on Mic */}
                {[3, 5, 7].map((y, i) => (
                    <mesh key={i} position={[0, y, 0]}>
                        <torusGeometry args={[1.6, 0.1, 8, 32]} />
                        <meshBasicMaterial color={['#ff00ff', '#00ffff', '#ffff00'][i]} />
                    </mesh>
                ))}
            </Float>

            {/* Label */}
            <Text
                position={[0, 0.5, 0]}
                fontSize={0.5}
                color="#a855f7"
                anchorX="center"
                anchorY="middle"
            >
                The Knowledge Groove Podcast
            </Text>
        </group>
    );
}

// FinTech District - Financial Skyscrapers
export function FinTechDistrict({ position }: { position: [number, number, number] }) {
    const dataRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (dataRef.current) {
            dataRef.current.rotation.y = state.clock.elapsedTime * 0.5;
        }
    });

    return (
        <group position={position}>
            {/* Tall Skyscrapers */}
            <Float speed={1} rotationIntensity={0.05} floatIntensity={0.2}>
                {/* Main Tower */}
                <mesh position={[0, 8, 0]}>
                    <boxGeometry args={[2, 16, 2]} />
                    <meshStandardMaterial color="#00C4FF" metalness={0.8} roughness={0.2} />
                </mesh>

                {/* Left Tower */}
                <mesh position={[-3, 6, 0]}>
                    <boxGeometry args={[1.5, 12, 1.5]} />
                    <meshStandardMaterial color="#0099cc" metalness={0.8} roughness={0.2} />
                </mesh>

                {/* Right Tower */}
                <mesh position={[3, 7, 0]}>
                    <boxGeometry args={[1.8, 14, 1.8]} />
                    <meshStandardMaterial color="#0077aa" metalness={0.8} roughness={0.2} />
                </mesh>

                {/* Back Towers */}
                <mesh position={[-1.5, 5, -2]}>
                    <boxGeometry args={[1.2, 10, 1.2]} />
                    <meshStandardMaterial color="#005588" metalness={0.8} roughness={0.2} />
                </mesh>
                <mesh position={[1.5, 5.5, -2]}>
                    <boxGeometry args={[1.3, 11, 1.3]} />
                    <meshStandardMaterial color="#006699" metalness={0.8} roughness={0.2} />
                </mesh>

                {/* Windows on main tower */}
                {[...Array(8)].map((_, i) => (
                    <mesh key={i} position={[0, 2 + i * 2, 1.01]}>
                        <planeGeometry args={[1.5, 1.5]} />
                        <meshBasicMaterial color="#ffff00" opacity={0.8} transparent />
                    </mesh>
                ))}
            </Float>

            {/* Rotating Data Visualization */}
            <group ref={dataRef} position={[0, 16, 0]}>
                <mesh>
                    <torusGeometry args={[2, 0.1, 16, 32]} />
                    <meshBasicMaterial color="#00ffff" />
                </mesh>
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[2, 0.1, 16, 32]} />
                    <meshBasicMaterial color="#00ffff" />
                </mesh>
            </group>

            {/* Label */}
            <Text
                position={[0, 0.5, 0]}
                fontSize={0.5}
                color="#00C4FF"
                anchorX="center"
                anchorY="middle"
            >
                AI + FinTech Lab
            </Text>
        </group>
    );
}

// Academy District - Classroom with Students
export function AcademyDistrict({ position }: { position: [number, number, number] }) {
    const handsRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (handsRef.current) {
            handsRef.current.children.forEach((hand: any, i) => {
                // Hands raise and lower at different times
                const wave = Math.sin(state.clock.elapsedTime * 1.5 + i) * 0.3 + 0.3;
                hand.position.y = 1.5 + wave;
            });
        }
    });

    return (
        <group position={position}>
            <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
                {/* Classroom Building */}
                <mesh position={[0, 2, 0]}>
                    <boxGeometry args={[8, 4, 6]} />
                    <meshStandardMaterial color="#ec4899" roughness={0.3} />
                </mesh>

                {/* Roof */}
                <mesh position={[0, 4.5, 0]} rotation={[0, Math.PI / 4, 0]}>
                    <coneGeometry args={[5, 2, 4]} />
                    <meshStandardMaterial color="#be185d" roughness={0.4} />
                </mesh>

                {/* Blackboard */}
                <mesh position={[0, 2.5, -2.9]}>
                    <planeGeometry args={[3, 1.5]} />
                    <meshStandardMaterial color="#1a1a1a" />
                </mesh>

                {/* Desks (rows of students) */}
                {[...Array(3)].map((_, row) => (
                    <group key={row} position={[0, 0, row * 1.5 - 1]}>
                        {[...Array(4)].map((_, col) => (
                            <group key={col} position={[col * 1.8 - 2.7, 0.5, 0]}>
                                {/* Desk */}
                                <mesh>
                                    <boxGeometry args={[0.8, 0.1, 0.6]} />
                                    <meshStandardMaterial color="#8b4513" />
                                </mesh>
                                {/* Student (simple figure) */}
                                <mesh position={[0, 0.5, 0]}>
                                    <sphereGeometry args={[0.2, 8, 8]} />
                                    <meshStandardMaterial color="#ffd700" />
                                </mesh>
                            </group>
                        ))}
                    </group>
                ))}
            </Float>

            {/* Animated Raised Hands */}
            <group ref={handsRef}>
                {[[-2, 0, 0], [0, 0, 0.5], [1.5, 0, -0.5]].map((pos, i) => (
                    <mesh key={i} position={pos as any}>
                        <sphereGeometry args={[0.15, 8, 8]} />
                        <meshStandardMaterial color="#ffb6c1" emissive="#ff69b4" emissiveIntensity={0.5} />
                    </mesh>
                ))}
            </group>

            {/* Label */}
            <Text
                position={[0, 0.3, 0]}
                fontSize={0.5}
                color="#ec4899"
                anchorX="center"
                anchorY="middle"
            >
                Knowledge Groove Academy
            </Text>
        </group>
    );
}

// Creator Tower - Keep existing
export function CreatorTower({ position }: { position: [number, number, number] }) {
    return (
        <group position={position}>
            <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
                {/* Main Tower */}
                <mesh position={[0, 10, 0]}>
                    <cylinderGeometry args={[2, 3, 20, 8]} />
                    <meshStandardMaterial color="#fbbf24" metalness={0.7} roughness={0.2} />
                </mesh>

                {/* Top Sphere */}
                <mesh position={[0, 21, 0]}>
                    <sphereGeometry args={[3, 16, 16]} />
                    <meshStandardMaterial color="#f59e0b" metalness={0.8} roughness={0.1} />
                </mesh>

                {/* Spotlight */}
                <pointLight position={[0, 22, 0]} intensity={2} color="#fbbf24" distance={20} />
            </Float>

            {/* Label */}
            <Text
                position={[0, 1, 0]}
                fontSize={0.6}
                color="#fbbf24"
                anchorX="center"
                anchorY="middle"
            >
                I'm Ishaan Garg
            </Text>
        </group>
    );
}
