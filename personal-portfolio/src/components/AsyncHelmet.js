import Head from 'next/head';

const AsyncHelmet = ({ pageName }) => {
  return (
    <Head>
      <title> David Riva | {pageName} </title>
    </Head>
  );
};

export default AsyncHelmet;
