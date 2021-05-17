import Head from 'next/head';
import Link from 'next/link';

const Index = () => {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="keywords" content="Home" />
        <meta property="og:title" content="Home" key="title" />
      </Head>
      <h1>Welcome at home for user-lists, details</h1>
    </>
  );
};

export default Index;
