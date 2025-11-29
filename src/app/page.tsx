'use client';

import { useState, useEffect } from 'react';
import styles from "./page.module.css";
import Link from "next/link";
import IntroAnimation from "@/components/IntroAnimation";
import TypewriterText from "@/components/TypewriterText";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [startTyping, setStartTyping] = useState(false);

  // Prevent scrolling while intro is playing
  useEffect(() => {
    if (showIntro) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      // Start typing slightly before the intro fully fades out for seamless transition
      setStartTyping(true);
    }
  }, [showIntro]);

  return (
    <>
      {showIntro && <IntroAnimation onComplete={() => setShowIntro(false)} />}
      <main className={styles.main}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={`${styles.title} gradient-text-primary`} style={{ minHeight: '1.1em' }}>
              <TypewriterText
                text="Knowledge Groove"
                start={startTyping}
                speed={70}
                cursor={false}
              />
            </h1>
            <div className={styles.subtitle} style={{ minHeight: '3.2em' }}>
              <TypewriterText
                text="Empowering the future through the convergence of finance, technology, and artificial intelligence."
                start={startTyping}
                delay={1200}
                speed={30}
                as="p"
                cursor={false}
              />
            </div>
            <div className={styles.heroButtons} style={{ opacity: startTyping ? 1 : 0, transition: 'opacity 0.5s ease 3.5s' }}>
              <Link href="#ecosystem" className="btn">
                <TypewriterText
                  text="Explore Ecosystem"
                  start={startTyping}
                  delay={3500}
                  speed={50}
                  cursor={false}
                />
              </Link>
              <Link href="#about" className="btn" style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
                <TypewriterText
                  text="About Ishaan"
                  start={startTyping}
                  delay={4500}
                  speed={50}
                  cursor={false}
                />
              </Link>
            </div>
          </div>

          <div className={`${styles.scrollIndicator} animate-fade-up delay-300`}>
            <div className={styles.scrollMouse}>
              <div className={styles.scrollWheel}></div>
            </div>
            <span style={{ fontSize: '0.8rem', letterSpacing: '0.1em' }}>SCROLL</span>
          </div>
        </section>

        {/* Ecosystem Section */}
        <section id="ecosystem" className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={`${styles.sectionTitle} gradient-text`}>Our Ecosystem</h2>
            <p className={styles.sectionDesc}>
              A suite of cutting-edge tools and resources designed to bridge the gap between complex data and actionable insights.
            </p>
          </div>

          <div className={styles.grid}>
            {/* Podcast Card */}
            <div className={`${styles.card} glass-card`}>
              <div className={styles.cardContent}>
                <h3 className={`${styles.cardTitle} gradient-text-primary`}>The Knowledge Groove Podcast</h3>
                <p className={styles.cardDesc}>
                  Dive deep into conversations with industry leaders, innovators, and thinkers shaping the world of tomorrow.
                </p>
              </div>
            </div>

            {/* FinTech + AI Card */}
            <div className={`${styles.card} glass-card`}>
              <div className={styles.cardContent}>
                <h3 className={`${styles.cardTitle} gradient-text-primary`}>The FinTech + AI Project</h3>
                <p className={styles.cardDesc}>
                  Research and development at the frontier of financial technology. Experience our AI-powered analysis tools.
                </p>
                <div className={styles.cardActions}>
                  <Link href="/stock-market-analyzer" className="btn">
                    Try Stock Analyzer
                  </Link>
                  <Link href="/real-estate-analyzer" className="btn" style={{ background: 'transparent', border: '1px solid var(--primary)' }}>
                    Try Real Estate Analyzer
                  </Link>
                </div>
              </div>
            </div>

            {/* Academy Card */}
            <div className={`${styles.card} glass-card`}>
              <div className={styles.cardContent}>
                <h3 className={`${styles.cardTitle} gradient-text-primary`}>The Knowledge Groove Academy</h3>
                <p className={styles.cardDesc}>
                  Educational resources and courses designed to master the skills of the modern digital economy.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className={styles.section}>
          <div className={styles.about}>
            <div className={styles.aboutContent}>
              <h2 className={`${styles.sectionTitle} gradient-text`} style={{ textAlign: 'left' }}>About Ishaan</h2>
              <div className={styles.aboutText}>
                <p>
                  Ishaan is the visionary behind Knowledge Groove, dedicated to bridging the gap between complex technologies and accessible knowledge.
                </p>
                <br />
                <p>
                  With a passion for FinTech and AI, Ishaan leads projects that push the boundaries of what&apos;s possible, while fostering a community of learners and innovators. His work focuses on creating intuitive interfaces for complex data systems.
                </p>
              </div>
            </div>
            <div className={`${styles.aboutImage} glass-card`}>
              {/* Placeholder for an image or abstract graphic */}
              <div style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'radial-gradient(circle, rgba(79,70,229,0.2) 0%, transparent 70%)'
              }}>
                <span style={{ fontSize: '5rem', opacity: 0.2 }}>IG</span>
              </div>
            </div>
          </div>
        </section>

        <footer className={styles.footer}>
          <div className={styles.footerContent}>
            &copy; {new Date().getFullYear()} Knowledge Groove. All rights reserved.
          </div>
        </footer>
      </main>
    </>
  );
}
