import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cart_slice';

export const store = configureStore({
   reducer: {
      cart: cartReducer,
   },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
