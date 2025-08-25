// components/Footer.js
import styles from '../styles/Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <p>&copy; {new Date().getFullYear()} My Awesome Site. All Rights Reserved.</p>
        </footer>
    );
}