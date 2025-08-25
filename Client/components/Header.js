// components/Header.js
import Link from 'next/link';
import styles from '../styles/Header.module.css';

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Link href="/">My Awesome Site</Link>
            </div>
            <nav className={styles.nav}>
                <Link href="/">Home</Link>
                <Link href="/about">About</Link>
                <Link href="/contact">Contact</Link>
            </nav>
        </header>
    );
}