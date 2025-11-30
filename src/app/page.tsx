'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import IntroAnimation from "@/components/IntroAnimation";
import TypewriterText from "@/components/TypewriterText";

// Dynamically import CityScene to avoid SSR issues with 3D canvas
const CityScene = dynamic(() => import('@/components/KnowledgeCity/CityScene'), {
  ssr: false,
  loading: () => <div style={{ background: '#030014', width: '100vw', height: '100vh' }} />
});

export default function Home() {
  const [stage, setStage] = useState<'intro' | 'typing' | 'city'>('intro');

  return (
    <main style={{ width: '100vw', height: '100vh', background: '#000', overflow: 'hidden', position: 'relative' }}>

      {/* City Scene - Preloaded but hidden until typing is done */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        opacity: stage === 'city' ? 1 : 0,
        pointerEvents: stage === 'city' ? 'auto' : 'none',
        transition: 'opacity 2s ease-in-out'
      }}>
        <CityScene />
      </div>

      {/* Typewriter Phase - Black screen with text */}
      {stage === 'typing' && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 30,
          background: 'black',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <TypewriterText
            text="Welcome to Knowledge Groove"
            onComplete={() => setTimeout(() => setStage('city'), 1000)}
          />
        </div>
      )}

      {/* Intro Animation - Unmounts after completion */}
      {stage === 'intro' && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 20
        }}>
          <IntroAnimation onComplete={() => setStage('typing')} />
        </div>
      )}
    </main>
  );
}
