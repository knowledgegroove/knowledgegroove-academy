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
  const [introFinished, setIntroFinished] = useState(false);

  return (
    <main style={{ width: '100vw', height: '100vh', background: '#030014', overflow: 'hidden', position: 'relative' }}>

      {/* City Scene - Always mounted to avoid re-initialization errors and allow preloading */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        opacity: introFinished ? 1 : 0,
        pointerEvents: introFinished ? 'auto' : 'none',
        transition: 'opacity 1.5s ease-in-out'
      }}>
        <CityScene />
      </div>

      {/* Intro Animation - Unmounts after completion to cleanup */}
      {!introFinished && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 20
        }}>
          <IntroAnimation onComplete={() => setIntroFinished(true)} />
        </div>
      )}
    </main>
  );
}
