// pages/about.js
import Head from 'next/head';

// This is the new function that fetches data before the page is rendered
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
                aboutContent: { key: 'aboutPageText', value: 'Error: Could not load content.' },
            },
        };
    }
}

// The 'aboutContent' prop comes from getStaticProps
export default function AboutPage({ aboutContent }) {
    return (
        <>
            <Head>
                <title>About Us | My Awesome Site</title>
            </Head>
            <div>
                <h1>About Our Company</h1>
                {/* We are now displaying the 'value' from our database! */}
                <p style={{ whiteSpace: 'pre-wrap' }}>
                    {aboutContent.value}
                </p>
            </div>
        </>
    );
}