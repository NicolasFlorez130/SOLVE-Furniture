import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import GlobalStyles from '../components/GlobalStyles';
import { Provider, useDispatch } from 'react-redux';
import { store } from '../contexts/store';
import Head from 'next/head';
import { useEffect } from 'react';
import { alert } from '../utils/keys';

function MyApp({ Component, pageProps }: AppProps) {
   useEffect(() => {
      const reload = () => {
         location.reload();
      };
      window.addEventListener('resize', reload);

      const alertShown = localStorage.getItem(alert);

      if (!alertShown) {
         window.alert(
            'IMPORTANT: Since this is just a demonstration page, its headless CMD is allocated in a serverless heroku service, therefore, if have passed many time since the last user visited the page, it may take a certain long time to load the resources for first time. Sorry for the inconvenience.'
         );
         localStorage.setItem(alert, 'shown');
      }

      return () => {
         window.removeEventListener('resize', reload);
      };
   }, []);

   return (
      <Provider store={store}>
         <GlobalStyles />
         <Head>
            <link
               rel="apple-touch-icon"
               sizes="57x57"
               href="SOLVE-Furniture/apple-icon-57x57.png"
            />
            <link
               rel="apple-touch-icon"
               sizes="60x60"
               href="SOLVE-Furniture/apple-icon-60x60.png"
            />
            <link
               rel="apple-touch-icon"
               sizes="72x72"
               href="SOLVE-Furniture/apple-icon-72x72.png"
            />
            <link
               rel="apple-touch-icon"
               sizes="76x76"
               href="SOLVE-Furniture/apple-icon-76x76.png"
            />
            <link
               rel="apple-touch-icon"
               sizes="114x114"
               href="SOLVE-Furniture/apple-icon-114x114.png"
            />
            <link
               rel="apple-touch-icon"
               sizes="120x120"
               href="SOLVE-Furniture/apple-icon-120x120.png"
            />
            <link
               rel="apple-touch-icon"
               sizes="144x144"
               href="SOLVE-Furniture/apple-icon-144x144.png"
            />
            <link
               rel="apple-touch-icon"
               sizes="152x152"
               href="SOLVE-Furniture/apple-icon-152x152.png"
            />
            <link
               rel="apple-touch-icon"
               sizes="180x180"
               href="SOLVE-Furniture/apple-icon-180x180.png"
            />
            <link
               rel="icon"
               type="image/png"
               sizes="192x192"
               href="SOLVE-Furniture/android-icon-192x192.png"
            />
            <link
               rel="icon"
               type="image/png"
               sizes="32x32"
               href="SOLVE-Furniture/favicon-32x32.png"
            />
            <link
               rel="icon"
               type="image/png"
               sizes="96x96"
               href="SOLVE-Furniture/favicon-96x96.png"
            />
            <link
               rel="icon"
               type="image/png"
               sizes="16x16"
               href="SOLVE-Furniture/favicon-16x16.png"
            />
            <link rel="manifest" href="/manifest.json" />
            <meta name="msapplication-TileColor" content="#ffffff" />
            <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
            <meta name="theme-color" content="#ffffff" />
            <meta name="robots" content="all" />
         </Head>
         <Component {...pageProps} />
      </Provider>
   );
}

export default MyApp;
