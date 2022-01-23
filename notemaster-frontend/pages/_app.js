import '../styles/globals.css';
import '../styles/fontawesome/css/all.min.css';
import { GlobalState } from '../context/GlobalContext';
import { ThemeProvider } from 'next-themes';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const authenticatedUrls = [
    "/labels",
  ]

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");

    if (authToken===null || authToken==="") {
      for (let url of authenticatedUrls) {
        if (router.pathname === url) {
          router.push("/login");
        }
      }
    }
  }, []);


  return <ThemeProvider attribute="class">
    <GlobalState>
      <Component {...pageProps} />
    </GlobalState>
  </ThemeProvider>
}

export default MyApp;
