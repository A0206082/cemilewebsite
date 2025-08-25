// pages/login.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import styles from '../styles/Login.module.css';

export default function LoginPage() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password }),
        });

        if (res.ok) {
            // If login is successful, redirect to the admin page
            router.push('/admin');
        } else {
            setError('Invalid password. Please try again.');
        }
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>Admin Login</title>
            </Head>
            <form onSubmit={handleSubmit} className={styles.loginForm}>
                <h2>Admin Login</h2>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit">Login</button>
                {error && <p className={styles.error}>{error}</p>}
            </form>
        </div>
    );
}