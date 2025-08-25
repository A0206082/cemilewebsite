// pages/_app.js
import Layout from '../components/Layout';
import '../styles/globals.css'; // We will create this file next

function MyApp({ Component, pageProps }) {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
}

export default MyApp;