'use client';

import { useScroll, Sky, Environment, PerspectiveCamera } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { PodcastDistrict, FinTechDistrict, AcademyDistrict, CreatorTower, Road } from './Buildings';
import { Trees, Mountains } from './Nature';

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
            new THREE.Vector3(0, 6, -30),   // FinTech Approach
            new THREE.Vector3(0, 6, -50),   // Academy Approach
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

            {/* Daylight Environment */}
            <color attach="background" args={['#87CEEB']} />
            <Sky sunPosition={[100, 20, 100]} />
            <ambientLight intensity={0.8} />
            <directionalLight
                position={[50, 50, 25]}
                intensity={1.5}
                castShadow
                shadow-mapSize={[1024, 1024]}
            />
            <fog attach="fog" args={['#87CEEB', 10, 80]} />

            {/* City Content */}
            <group ref={groupRef}>
                {/* Ground */}
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, -50]} receiveShadow>
                    <planeGeometry args={[200, 200]} />
                    <meshStandardMaterial color="#3a4d31" />
                </mesh>

                {/* Nature */}
                <Trees count={100} area={150} />
                <Mountains />

                {/* Roads - Continuous Straight Line */}
                <Road position={[0, 0.1, -20]} length={40} />
                <Road position={[0, 0.1, -60]} length={40} />
                <Road position={[0, 0.1, -100]} length={40} />

                {/* Districts - Aligned along the straight road */}
                {/* Podcast on Left */}
                <PodcastDistrict position={[-8, 0, -20]} />

                {/* FinTech on Right */}
                <FinTechDistrict position={[8, 0, -40]} />

                {/* Academy on Left */}
                <AcademyDistrict position={[-8, 0, -60]} />

                {/* Creator Tower at the End */}
                <CreatorTower position={[0, 0, -80]} />
            </group>
        </>
    );
}
