// pages/about.js
import Head from 'next/head';

// This is the new function that fetches data before the page is rendered
export async function getStaticProps() {
    // Fetch data from our API endpoint for the about page
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
    const res = await fetch(`${apiUrl}/api/content/aboutPageText`);
    const data = await res.json();

    // The data we fetched is passed to the page component as 'props'
    return {
        props: {
            aboutContent: data, // The 'data' object contains our 'key' and 'value'
        },
        revalidate: 10, // Optional: Next.js will re-fetch the data every 10 seconds
    };
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