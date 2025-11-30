'use client';

import { Scroll } from '@react-three/drei';

export default function Overlay() {
    return (
        <Scroll html style={{ width: '100%' }}>
            {/* Intro Section */}
            <section style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
                <div style={{ textAlign: 'center', color: 'white' }}>
                    <h1 style={{
                        fontSize: '5rem',
                        fontWeight: '800',
                        textShadow: '0 0 20px rgba(79, 70, 229, 0.8)',
                        fontFamily: '"Outfit", "Inter", sans-serif'
                    }}>
                        Welcome to Knowledge Groove
                    </h1>
                    <p style={{ fontSize: '1.5rem', opacity: 0.8 }}>Where Ideas Grow</p>
                    <div style={{ marginTop: '2rem', fontSize: '0.8rem', opacity: 0.5 }}>SCROLL TO EXPLORE</div>
                </div>
            </section>

            {/* Podcast Section */}
            <section style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingLeft: '10vw', pointerEvents: 'none' }}>
                <div style={{ maxWidth: '500px', color: 'white' }}>
                    {/* Large Visible Title */}
                    <h1 style={{
                        fontSize: '4rem',
                        fontWeight: '900',
                        color: '#a855f7',
                        marginBottom: '2rem',
                        textShadow: '0 0 30px rgba(168, 85, 247, 0.8), 0 4px 20px rgba(0,0,0,0.5)',
                        fontFamily: '"Outfit", "Inter", sans-serif',
                        letterSpacing: '-0.02em'
                    }}>
                        PODCAST
                    </h1>

                    {/* Info Card */}
                    <div style={{
                        background: 'rgba(0,0,0,0.7)',
                        padding: '2rem',
                        borderRadius: '1rem',
                        backdropFilter: 'blur(15px)',
                        border: '2px solid rgba(168, 85, 247, 0.4)',
                        boxShadow: '0 8px 32px rgba(168, 85, 247, 0.3)'
                    }}>
                        <h2 style={{ fontSize: '1.8rem', color: '#d8b4fe', marginBottom: '1rem', fontWeight: '700' }}>The Knowledge Groove Podcast</h2>
                        <p style={{ marginBottom: '1.5rem', lineHeight: '1.6', fontSize: '1.1rem' }}>
                            Stories of history, science, business, and innovation.
                        </p>
                        <a href="https://open.spotify.com/show/5GgvbJT6WznJCmIX6OeEGy?si=ce9e5a1dd07245bb" target="_blank" rel="noopener noreferrer" style={{
                            pointerEvents: 'auto',
                            color: '#a855f7',
                            fontWeight: 'bold',
                            textDecoration: 'none',
                            fontSize: '1.1rem',
                            transition: 'color 0.3s'
                        }}>Listen to Podcast →</a>
                    </div>
                </div>
            </section>

            {/* FinTech Section */}
            <section style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '10vw', pointerEvents: 'none' }}>
                <div style={{ maxWidth: '500px', color: 'white' }}>
                    {/* Large Visible Title */}
                    <h1 style={{
                        fontSize: '4rem',
                        fontWeight: '900',
                        color: '#00C4FF',
                        marginBottom: '2rem',
                        textShadow: '0 0 30px rgba(0, 196, 255, 0.8), 0 4px 20px rgba(0,0,0,0.5)',
                        fontFamily: '"Outfit", "Inter", sans-serif',
                        letterSpacing: '-0.02em'
                    }}>
                        AI + FINTECH
                    </h1>

                    {/* Info Card */}
                    <div style={{
                        background: 'rgba(0,0,0,0.7)',
                        padding: '2rem',
                        borderRadius: '1rem',
                        backdropFilter: 'blur(15px)',
                        border: '2px solid rgba(0, 196, 255, 0.4)',
                        boxShadow: '0 8px 32px rgba(0, 196, 255, 0.3)'
                    }}>
                        <h2 style={{ fontSize: '1.8rem', color: '#7dd3fc', marginBottom: '1rem', fontWeight: '700' }}>Knowledge Groove Lab</h2>
                        <p style={{ marginBottom: '1.5rem', lineHeight: '1.6', fontSize: '1.1rem' }}>
                            AI tools, predictive models, cybersecurity, and data analysis.
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <a href="/stock-market-analyzer" style={{
                                pointerEvents: 'auto',
                                color: '#00C4FF',
                                fontWeight: 'bold',
                                textDecoration: 'none',
                                fontSize: '1.1rem'
                            }}>Try Stock Analyzer →</a>
                            <a href="/real-estate-analyzer" style={{
                                pointerEvents: 'auto',
                                color: '#00C4FF',
                                fontWeight: 'bold',
                                textDecoration: 'none',
                                fontSize: '1.1rem'
                            }}>Try Real Estate Analyzer →</a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Academy Section */}
            <section style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingLeft: '10vw', pointerEvents: 'none' }}>
                <div style={{ maxWidth: '500px', color: 'white' }}>
                    {/* Large Visible Title */}
                    <h1 style={{
                        fontSize: '4rem',
                        fontWeight: '900',
                        color: '#ec4899',
                        marginBottom: '2rem',
                        textShadow: '0 0 30px rgba(236, 72, 153, 0.8), 0 4px 20px rgba(0,0,0,0.5)',
                        fontFamily: '"Outfit", "Inter", sans-serif',
                        letterSpacing: '-0.02em'
                    }}>
                        ACADEMY
                    </h1>

                    {/* Info Card */}
                    <div style={{
                        background: 'rgba(0,0,0,0.7)',
                        padding: '2rem',
                        borderRadius: '1rem',
                        backdropFilter: 'blur(15px)',
                        border: '2px solid rgba(236, 72, 153, 0.4)',
                        boxShadow: '0 8px 32px rgba(236, 72, 153, 0.3)'
                    }}>
                        <h2 style={{ fontSize: '1.8rem', color: '#fbcfe8', marginBottom: '1rem', fontWeight: '700' }}>Knowledge Groove Academy</h2>
                        <p style={{ marginBottom: '1.5rem', lineHeight: '1.6', fontSize: '1.1rem' }}>
                            Workshops, tutoring, and confidence building.
                        </p>
                        <a href="#academy" style={{
                            pointerEvents: 'auto',
                            color: '#ec4899',
                            fontWeight: 'bold',
                            textDecoration: 'none',
                            fontSize: '1.1rem'
                        }}>Visit the Academy →</a>
                    </div>
                </div>
            </section>

            {/* Creator Section */}
            <section style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
                <div style={{ textAlign: 'center', color: 'white' }}>
                    {/* Large Visible Title */}
                    <h1 style={{
                        fontSize: '4rem',
                        fontWeight: '900',
                        color: '#fbbf24',
                        marginBottom: '2rem',
                        textShadow: '0 0 30px rgba(251, 191, 36, 0.8), 0 4px 20px rgba(0,0,0,0.5)',
                        fontFamily: '"Outfit", "Inter", sans-serif',
                        letterSpacing: '-0.02em'
                    }}>
                        ISHAAN GARG
                    </h1>

                    {/* Info Card */}
                    <div style={{
                        background: 'rgba(0,0,0,0.7)',
                        padding: '3rem',
                        borderRadius: '1rem',
                        backdropFilter: 'blur(15px)',
                        border: '2px solid rgba(251, 191, 36, 0.4)',
                        boxShadow: '0 8px 32px rgba(251, 191, 36, 0.3)',
                        maxWidth: '600px',
                        margin: '0 auto'
                    }}>
                        <h2 style={{ fontSize: '2rem', marginBottom: '1rem', fontWeight: '700', color: '#fde68a' }}>Creator & Innovator</h2>
                        <p style={{ fontSize: '1.2rem', opacity: 0.9, marginBottom: '2rem', lineHeight: '1.6' }}>
                            I help people learn, create, and innovate.
                        </p>
                        <a href="#about" style={{
                            pointerEvents: 'auto',
                            display: 'inline-block',
                            padding: '1rem 2.5rem',
                            background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                            color: 'black',
                            borderRadius: '50px',
                            fontWeight: 'bold',
                            textDecoration: 'none',
                            fontSize: '1.1rem',
                            boxShadow: '0 4px 15px rgba(251, 191, 36, 0.4)',
                            transition: 'transform 0.3s, box-shadow 0.3s'
                        }}>Learn more →</a>
                    </div>
                </div>
            </section>
        </Scroll>
    );
}
