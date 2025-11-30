'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import IntroAnimation from "@/components/IntroAnimation";

// Dynamically import CityScene to avoid SSR issues with 3D canvas
const CityScene = dynamic(() => import('@/components/KnowledgeCity/CityScene'), {
  ssr: false,
  loading: () => <div style={{ background: '#030014', width: '100vw', height: '100vh' }} />
});

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <main style={{ width: '100vw', height: '100vh', background: '#030014', overflow: 'hidden' }}>
      {showIntro && <IntroAnimation onComplete={() => setShowIntro(false)} />}
      <div style={{
        opacity: showIntro ? 0 : 1,
        transition: 'opacity 2s ease-in-out',
        width: '100%',
        height: '100%'
      }}>
        {!showIntro && <CityScene />}
      </div>
    </main>
  );
}
