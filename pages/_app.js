import 'bootstrap/dist/css/bootstrap.css';
import Head from 'next/head';
import '../styles/globals.css';
import Layout from '../comps/Layout';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="App" key="title" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
