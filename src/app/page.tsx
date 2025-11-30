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
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '0 2rem'
        }}>
          <h1 style={{
            fontSize: '5rem',
            fontWeight: '800',
            color: 'white',
            marginBottom: '2rem',
            textShadow: '0 0 20px rgba(79, 70, 229, 0.8)'
          }}>
            <TypewriterText
              text="Welcome to Knowledge Groove"
              speed={50}
              cursor={false}
            />
          </h1>
          <p style={{
            fontSize: '1.5rem',
            color: 'white',
            opacity: 0.8,
            maxWidth: '800px'
          }}>
            <TypewriterText
              text="Empowering the future through the convergence of finance, technology, and artificial intelligence."
              delay={2000}
              speed={30}
              onComplete={() => setTimeout(() => setStage('city'), 2000)}
            />
          </p>
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
