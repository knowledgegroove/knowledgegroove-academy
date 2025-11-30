'use client';

import { useMemo, useRef } from 'react';
import { Instance, Instances } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import * as THREE from 'three';

export function Trees({ count = 50, area = 100 }: { count?: number, area?: number }) {
    const trees = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const x = (Math.random() - 0.5) * area;
            const z = (Math.random() - 0.5) * area - 50; // Offset to be around the city
            // Avoid placing trees on the main road path (center)
            if (Math.abs(x) < 15) continue;
            const scale = 0.8 + Math.random() * 0.6;
            const treeType = Math.random() > 0.5 ? 'pine' : 'deciduous';
            temp.push({ position: [x, 0, z], scale, treeType });
        }
        return temp;
    }, [count, area]);

    return (
        <group>
            {/* Tree Trunks */}
            <Instances range={trees.length}>
                <cylinderGeometry args={[0.3, 0.5, 2, 8]} />
                <meshStandardMaterial color="#3d2817" roughness={0.9} />
                {trees.map((data, i) => (
                    <Instance
                        key={i}
                        position={[data.position[0], 1, data.position[2]] as any}
                        scale={[data.scale, data.scale, data.scale] as any}
                    />
                ))}
            </Instances>

            {/* Tree Foliage - Pine Trees */}
            <Instances range={trees.filter(t => t.treeType === 'pine').length}>
                <coneGeometry args={[2, 4, 8]} />
                <meshStandardMaterial color="#1a4d2e" roughness={0.8} />
                {trees.filter(t => t.treeType === 'pine').map((data, i) => (
                    <Instance
                        key={i}
                        position={[data.position[0], 3 * data.scale, data.position[2]] as any}
                        scale={[data.scale, data.scale, data.scale] as any}
                    />
                ))}
            </Instances>

            {/* Tree Foliage - Deciduous Trees (Spherical) */}
            <Instances range={trees.filter(t => t.treeType === 'deciduous').length}>
                <sphereGeometry args={[1.5, 8, 8]} />
                <meshStandardMaterial color="#2d5a27" roughness={0.7} />
                {trees.filter(t => t.treeType === 'deciduous').map((data, i) => (
                    <Instance
                        key={i}
                        position={[data.position[0], 2.5 * data.scale, data.position[2]] as any}
                        scale={[data.scale, data.scale * 0.8, data.scale] as any}
                    />
                ))}
            </Instances>
        </group>
    );
}

export function Mountains() {
    return (
        <group position={[0, -1, -100]}>
            {/* Background Mountains */}
            <mesh position={[-40, 0, 0]} rotation={[0, 0, 0]}>
                <coneGeometry args={[30, 40, 4]} />
                <meshStandardMaterial color="#5a6e7c" roughness={0.8} />
            </mesh>
            <mesh position={[40, 0, 10]} rotation={[0, 0, 0]}>
                <coneGeometry args={[25, 35, 4]} />
                <meshStandardMaterial color="#6b7f8c" roughness={0.8} />
            </mesh>
            <mesh position={[0, 0, -20]} rotation={[0, 0, 0]}>
                <coneGeometry args={[50, 50, 4]} />
                <meshStandardMaterial color="#7c90a0" roughness={0.8} />
            </mesh>
        </group>
    );
}

// Car component with realistic 3D model
function Car({ position, color, speed = 1 }: { position: [number, number, number], color: string, speed?: number }) {
    return (
        <group position={position}>
            {/* Car Body */}
            <mesh position={[0, 0.3, 0]}>
                <boxGeometry args={[1.8, 0.6, 4]} />
                <meshStandardMaterial color={color} metalness={0.6} roughness={0.3} />
            </mesh>
            {/* Car Roof */}
            <mesh position={[0, 0.8, -0.3]}>
                <boxGeometry args={[1.6, 0.6, 2]} />
                <meshStandardMaterial color={color} metalness={0.6} roughness={0.3} />
            </mesh>
            {/* Windshield */}
            <mesh position={[0, 0.8, 0.8]}>
                <boxGeometry args={[1.5, 0.5, 0.1]} />
                <meshStandardMaterial color="#87CEEB" transparent opacity={0.3} metalness={0.9} roughness={0.1} />
            </mesh>
            {/* Wheels */}
            <mesh position={[-0.9, -0.1, 1.2]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.3, 0.3, 0.3, 16]} />
                <meshStandardMaterial color="#1a1a1a" />
            </mesh>
            <mesh position={[0.9, -0.1, 1.2]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.3, 0.3, 0.3, 16]} />
                <meshStandardMaterial color="#1a1a1a" />
            </mesh>
            <mesh position={[-0.9, -0.1, -1.2]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.3, 0.3, 0.3, 16]} />
                <meshStandardMaterial color="#1a1a1a" />
            </mesh>
            <mesh position={[0.9, -0.1, -1.2]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.3, 0.3, 0.3, 16]} />
                <meshStandardMaterial color="#1a1a1a" />
            </mesh>
        </group>
    );
}

// Highway Cars - animated based on scroll
export function HighwayCars() {
    const scroll = useScroll();
    const carsRef = useRef<THREE.Group>(null);

    const cars = useMemo(() => [
        { lane: -1.5, offset: 0, color: '#ff4444', speed: 1.2 },
        { lane: -1.5, offset: -30, color: '#4444ff', speed: 1.0 },
        { lane: -1.5, offset: -60, color: '#44ff44', speed: 1.3 },
        { lane: 1.5, offset: -15, color: '#ffff44', speed: 1.1 },
        { lane: 1.5, offset: -45, color: '#ff44ff', speed: 0.9 },
        { lane: 1.5, offset: -75, color: '#44ffff', speed: 1.15 },
    ], []);

    useFrame(() => {
        if (carsRef.current) {
            const scrollSpeed = scroll.offset * 200; // Convert scroll to distance

            carsRef.current.children.forEach((carGroup: any, i) => {
                const car = cars[i];
                // Move cars based on scroll
                const newZ = (car.offset - scrollSpeed * car.speed) % 120;
                carGroup.position.z = newZ > 20 ? newZ - 120 : newZ;
            });
        }
    });

    return (
        <group ref={carsRef} position={[0, 0.2, 0]}>
            {cars.map((car, i) => (
                <group key={i} position={[car.lane, 0, car.offset]}>
                    <Car position={[0, 0, 0]} color={car.color} speed={car.speed} />
                </group>
            ))}
        </group>
    );
}
