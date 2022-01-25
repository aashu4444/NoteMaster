import '../styles/globals.css';
import '../styles/fontawesome/css/all.min.css';
import { GlobalState } from '../context/GlobalContext';
import { ThemeProvider } from 'next-themes';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const authenticatedUrls = [
    "/labels",
  ]

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");

    if (authToken === null || authToken === "") {
      for (let url of authenticatedUrls) {
        if (router.pathname === url) {
          router.push("/login");
        }
      }
    }
  }, []);


  return <ThemeProvider attribute="class">
    <GlobalState>
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <meta name="robots" content="all" />
        <meta
          name="description"
          content="NoteMaster helps you to save your notes on the cloud and it is easy to manage your notes on NoteMaster. You can create labels and categorize your images easily. Why you are waiting for? create your account and start using NoteMaster now, this is quick and easy!."
        />

      </Head>
      <Component {...pageProps} />
    </GlobalState>
  </ThemeProvider>
}

export default MyApp;
