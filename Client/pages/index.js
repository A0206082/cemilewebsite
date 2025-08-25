// pages/index.js
import Head from 'next/head';

export async function getStaticProps() {
    // Fetch the content for the homepage using its new key
    const res = await fetch('http://localhost:5001/api/content/homepageWelcome');
    const data = await res.json();

    return {
        props: {
            homeContent: data,
        },
        revalidate: 10, // Revalidate every 10 seconds
    };
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