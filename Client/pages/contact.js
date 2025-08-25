// pages/contact.js
import Head from 'next/head';

export async function getStaticProps() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${apiUrl}/api/content/contactPageInfo`);
    const data = await res.json();

    return {
        props: {
            contactContent: data,
        },
        revalidate: 10,
    };
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