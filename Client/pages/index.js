// pages/index.js
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
                homeContent: { key: 'homepageWelcome', value: 'Error: Could not load content.' },
            },
        };
    }
}

export default function Home({ homeContent }) {
    return (
        <div>
            <Head>
                <title>My Awesome Site</title>
                <meta name="description" content="A dynamic website built with Next.js" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main style={{ textAlign: 'center', paddingTop: '50px' }}>
                <h1>
                    Welcome to My Website!
                </h1>
                <p style={{ fontSize: '1.2rem', marginTop: '20px', whiteSpace: 'pre-wrap' }}>
                    {/* Display the dynamic content from the database */}
                    {homeContent.value}
                </p>
            </main>
        </div>
    );
}