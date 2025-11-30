'use client';

import { useMemo } from 'react';
import { Instance, Instances } from '@react-three/drei';
import * as THREE from 'three';

export function Trees({ count = 50, area = 100 }: { count?: number, area?: number }) {
    const trees = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const x = (Math.random() - 0.5) * area;
            const z = (Math.random() - 0.5) * area;
            // Avoid placing trees on the main road path (approx z axis)
            if (Math.abs(x) < 10) continue;
            const scale = 0.5 + Math.random() * 0.5;
            temp.push({ position: [x, 0, z], scale: [scale, scale, scale] });
        }
        return temp;
    }, [count, area]);

    return (
        <group>
            <Instances range={trees.length}>
                <cylinderGeometry args={[0.2, 0.4, 1]} />
                <meshStandardMaterial color="#4a3728" />
                {trees.map((data, i) => (
                    <Instance key={i} position={data.position as any} scale={data.scale as any} />
                ))}
            </Instances>
            <Instances range={trees.length}>
                <coneGeometry args={[1.5, 3, 8]} />
                <meshStandardMaterial color="#2d5a27" />
                {trees.map((data, i) => (
                    <Instance
                        key={i}
                        position={[data.position[0], data.position[1] + 1.5, data.position[2]] as any}
                        scale={data.scale as any}
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
