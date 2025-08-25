// pages/contact.js
import Head from 'next/head';

export async function getStaticProps() {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
        const res = await fetch(`${apiUrl}/api/content/aboutPageText`);

        // If the response is not OK (like a 404 or 500), don't try to parse it as JSON
        if (!res.ok) {
            throw new Error(`Failed to fetch: ${res.status}`);
        }

        const data = await res.json();

        return {
            props: {
                aboutContent: data, // Pass the successful data
            },
            revalidate: 10,
        };
    } catch (error) {
        console.error("Error in getStaticProps for /about:", error);
        // If ANYTHING goes wrong, return a default value so the page doesn't crash
        return {
            props: {
                contactContent: { key: 'contactPageInfo', value: 'Error: Could not load content.' },
            },
        };
    }
}

export default function ContactPage({ contactContent }) {
    return (
        <>
            <Head>
                <title>Contact Us | My Awesome Site</title>
            </Head>
            <div>
                <h1>Contact Information</h1>
                {/* The contact info will now come from the database */}
                <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.8' }}>
                    {contactContent.value}
                </div>
            </div>
        </>
    );
}