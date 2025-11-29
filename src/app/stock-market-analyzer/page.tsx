import type { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
    title: 'Stock Market Analyzer | Knowledge Groove',
    description: 'Advanced stock market analysis tool powered by AI.',
    icons: {
        icon: '/stock-favicon.png',
    },
};

export default function StockMarketAnalyzer() {
    return (
        <div className={styles.container}>
            <iframe
                src="https://stock-market-analyzer-sigma.vercel.app/"
                className={styles.iframe}
                title="Stock Market Analyzer"
                allow="clipboard-write; clipboard-read"
            />
        </div>
    );
}
