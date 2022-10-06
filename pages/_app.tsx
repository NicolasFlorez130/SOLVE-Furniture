import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import GlobalStyles from '../components/GlobalStyles';
import { Provider, useDispatch } from 'react-redux';
import { store } from '../contexts/store';

function MyApp({ Component, pageProps }: AppProps) {
   return (
      <Provider store={store}>
         <GlobalStyles />
         <Component {...pageProps} />
      </Provider>
   );
}

export default MyApp;
