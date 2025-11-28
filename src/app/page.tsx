import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.main}>
      <section className={styles.hero}>
        <h1 className={`${styles.title} gradient-text`}>Knowledge Groove</h1>
        <p className={styles.subtitle}>
          Empowering the future through finance, technology, and education.
        </p>
        <Link href="#services" className="btn">
          Explore Our Universe
        </Link>
      </section>

      <section id="services" className={styles.section}>
        <h2 className={`${styles.sectionTitle} gradient-text`}>Our Ecosystem</h2>
        <div className={styles.grid}>
          <div className={`${styles.card} glass-card`}>
            <h3 className={styles.cardTitle}>The Knowledge Groove Podcast</h3>
            <p className={styles.cardDesc}>
              Dive deep into conversations with industry leaders, innovators, and thinkers shaping the world of tomorrow.
            </p>
          </div>
          <div className={`${styles.card} glass-card`}>
            <h3 className={styles.cardTitle}>The FinTech + AI Project</h3>
            <p className={styles.cardDesc}>
              Cutting-edge research and development at the intersection of financial technology and artificial intelligence.
            </p>
            <Link href="/stock-market-analyzer" className="btn" style={{ marginTop: '1rem', fontSize: '0.9rem', textAlign: 'center' }}>
              Try Stock Analyzer
            </Link>
          </div>
          <div className={`${styles.card} glass-card`}>
            <h3 className={styles.cardTitle}>The Knowledge Groove Academy</h3>
            <p className={styles.cardDesc}>
              Educational resources and courses designed to master the skills of the modern digital economy.
            </p>
          </div>
        </div>
      </section>

      <section id="about" className={`${styles.section} ${styles.about}`}>
        <h2 className={`${styles.sectionTitle} gradient-text`}>About Ishaan</h2>
        <div className="glass-card" style={{ maxWidth: '800px' }}>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
            Ishaan is the visionary behind Knowledge Groove, dedicated to bridging the gap between complex technologies and accessible knowledge. With a passion for FinTech and AI, Ishaan leads projects that push the boundaries of what's possible, while fostering a community of learners and innovators.
          </p>
        </div>
      </section>

      <footer className={styles.footer}>
        &copy; {new Date().getFullYear()} Knowledge Groove. All rights reserved.
      </footer>
    </div>
  );
}
