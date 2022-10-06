import { createSlice } from '@reduxjs/toolkit';
import { Product } from '../types/products_api_response';
import { cartKey } from '../utils/keys';

export interface CartState {
   products: Product[];
}

const persistenceCart = (products: CartState['products']) => {
   localStorage.setItem(cartKey, JSON.stringify(products));
};

interface AddAction {
   payload: Product[];
}

const initialState: CartState = {
   products: [],
};

const cartSlice = createSlice({
   name: 'cart',
   initialState,
   reducers: {
      add: (state, { payload }: AddAction) => {
         payload.forEach(product => state.products.push(product));
         persistenceCart(state.products);
      },
      reset: state => (state = initialState),
      update: (state, { payload }: { payload: Product[] }) => {
         state.products = payload;
         persistenceCart(state.products);
      },
   },
});

export default cartSlice.reducer;
export const { add, update } = cartSlice.actions;
