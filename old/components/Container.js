import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

import Header from './Header';
import Footer from './Footer';

export default function Container({ children, ...customMeta }) {
  const [mounted, setMounted] = useState(false);

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);

  const router = useRouter();
  const meta = {
    image: 'https://www.jeremygautrais.fr/static/images/profile_pic.png',
    type: 'website',
    ...customMeta,
  };

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name='robots' content='follow, index' />
        <meta content={meta.description} name='description' />
        <meta
          property='og:url'
          content={`https://www.jeremygautrais.fr/${router.asPath}`}
        />
        <link
          rel='canonical'
          href={`https://www.jeremygautrais.fr/${router.asPath}`}
        />
        <meta property='og:type' content={meta.type} />
        <meta property='og:site_name' content='Jérémy Gautrais' />
        <meta property='og:description' content={meta.description} />
        <meta property='og:title' content={meta.title} />
        <meta property='og:image' content={meta.image} />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:site' content='@JereHoh' />
        <meta name='twitter:title' content={meta.title} />
        <meta name='twitter:description' content={meta.description} />
        <meta name='twitter:image' content={meta.image} />
      </Head>
      <Header mounted={mounted} />
      <main className='max-w-5xl w-full flex-grow px-6 sm:px-16 mt-3'>
        {children}
      </main>
      <Footer />
    </>
  );
}
