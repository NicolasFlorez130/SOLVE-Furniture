import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import GlobalStyles from '../components/GlobalStyles';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { store } from '../contexts/store';
import { Product } from '../types/products_api_response';
import { add, update } from '../contexts/cart_slice';

function MyApp({ Component, pageProps }: AppProps) {

   return (
      <Provider store={store}>
         <GlobalStyles />
         <Component {...pageProps} />
      </Provider>
   );
}

export default MyApp;
