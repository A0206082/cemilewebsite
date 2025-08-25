// pages/about.js
import Head from 'next/head';

// This is the new function that fetches data before the page is rendered
export async function getStaticProps() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${apiUrl}/api/content/aboutPageText`);
    const data = await res.json();

    return {
        props: {
            aboutContent: data,
        },
        revalidate: 10,
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