import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import GlobalStyles from '../components/GlobalStyles';
import { Provider, useDispatch } from 'react-redux';
import { store } from '../contexts/store';
import Head from 'next/head';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
   useEffect(() => {
      const reload = () => {
         location.reload();
      };
      window.addEventListener('resize', reload);

      return () => {
         window.removeEventListener('resize', reload);
      };
   }, []);

   return (
      <Provider store={store}>
         <GlobalStyles />
         <Head>
            <meta name="robots" content="all" />
         </Head>
         <Component {...pageProps} />
      </Provider>
   );
}

export default MyApp;
