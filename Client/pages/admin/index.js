// pages/admin/index.js
import Head from 'next/head';
import { useState, useEffect } from 'react';
import styles from '../../styles/Admin.module.css';

export default function AdminDashboard() {
    // State to hold the content fetched from the DB
    const [content, setContent] = useState({});
    const [statusMessage, setStatusMessage] = useState('');

    // Fetch all content when the component mounts
    useEffect(() => {
        fetch('/api/content') // We're using a proxy, more on this below
            .then(res => res.json())
            .then(data => {
                // Convert array to an object for easier access, e.g., { aboutPageText: '...' }
                const contentMap = data.reduce((acc, item) => {
                    acc[item.key] = item.value;
                    return acc;
                }, {});
                setContent(contentMap);
            });
    }, []);

    // Generic function to handle changes in any textarea
    const handleChange = (key, value) => {
        setContent(prevContent => ({
            ...prevContent,
            [key]: value,
        }));
    };

    // Function to save a specific piece of content
    const handleSave = async (key) => {
        setStatusMessage(`Saving ${key}...`);
        const response = await fetch(`/api/content/${key}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ value: content[key] }),
        });

        if (response.ok) {
            setStatusMessage(`${key} saved successfully!`);
        } else {
            setStatusMessage(`Error saving ${key}.`);
        }
        // Clear the message after 3 seconds
        setTimeout(() => setStatusMessage(''), 3000);
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>Admin Dashboard</title>
            </Head>

            <h1>Admin Content Management</h1>
            <p className={styles.statusMessage}>{statusMessage}</p>

            <div className={styles.editor}>
                <h2>About Page Content</h2>
                <textarea
                    value={content.aboutPageText || ''}
                    onChange={(e) => handleChange('aboutPageText', e.target.value)}
                    rows="10"
                />
                <button onClick={() => handleSave('aboutPageText')}>Save About Content</button>
            </div>

            <div className={styles.editor}>
                <h2>Contact Page Content</h2>
                <textarea
                    value={content.contactPageInfo || ''}
                    onChange={(e) => handleChange('contactPageInfo', e.target.value)}
                    rows="10"
                />
                <button onClick={() => handleSave('contactPageInfo')}>Save Contact Content</button>
            </div>
            <div className={styles.editor}>
                <h2>Homepage Welcome Message</h2>
                <textarea
                    value={content.homepageWelcome || ''}
                    onChange={(e) => handleChange('homepageWelcome', e.target.value)}
                    rows="5"
                />
                <button onClick={() => handleSave('homepageWelcome')}>Save Welcome Message</button>
            </div>
        </div>
    );
}