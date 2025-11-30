'use client';

import { useScroll, Stars, PerspectiveCamera } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { PodcastDistrict, FinTechDistrict, AcademyDistrict, CreatorTower } from './Buildings';

export default function Experience() {
    const scroll = useScroll();
    const cameraRef = useRef<THREE.PerspectiveCamera>(null);
    const groupRef = useRef<THREE.Group>(null);

    // Define keyframes for camera path
    // Format: [x, y, z]
    const curve = useMemo(() => {
        return new THREE.CatmullRomCurve3([
            new THREE.Vector3(0, 2, 10),    // Start
            new THREE.Vector3(0, 5, -10),   // Podcast Approach
            new THREE.Vector3(8, 6, -30),   // FinTech Approach
            new THREE.Vector3(-8, 6, -50),  // Academy Approach
            new THREE.Vector3(0, 12, -70),  // Creator Tower Approach
            new THREE.Vector3(0, 20, -90),  // End Overview
        ], false, 'catmullrom', 0.5);
    }, []);

    useFrame((state, delta) => {
        // The scroll offset is between 0 and 1
        const offset = scroll.offset;

        // Get point on curve
        const point = curve.getPoint(offset);
        const lookAtPoint = curve.getPoint(Math.min(offset + 0.1, 1));

        if (cameraRef.current) {
            // Smoothly interpolate camera position
            cameraRef.current.position.lerp(point, delta * 24); // High speed lerp for responsiveness
            cameraRef.current.lookAt(lookAtPoint);
        }
    });

    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 2, 10]} ref={cameraRef} fov={60} />

            {/* Background Color - Critical for preventing white screen */}
            <color attach="background" args={['#030014']} />

            {/* Lighting */}
            <ambientLight intensity={0.2} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#4f46e5" />
            <pointLight position={[-10, 10, -10]} intensity={1} color="#ec4899" />

            {/* Environment */}
            <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
            <fog attach="fog" args={['#030014', 10, 60]} />

            {/* City Content */}
            <group ref={groupRef}>
                {/* Floor Grid */}
                <gridHelper args={[200, 100, 0x4f46e5, 0x222222]} position={[0, -0.1, -50]} />

                {/* Districts */}
                <PodcastDistrict position={[0, 0, -20]} />
                <FinTechDistrict position={[15, 0, -40]} />
                <AcademyDistrict position={[-15, 0, -60]} />
                <CreatorTower position={[0, 0, -80]} />

                {/* Connecting Lines/Roads (Visual only) */}
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, -50]}>
                    <planeGeometry args={[2, 100]} />
                    <meshBasicMaterial color="#4f46e5" transparent opacity={0.1} />
                </mesh>
            </group>
        </>
    );
}
