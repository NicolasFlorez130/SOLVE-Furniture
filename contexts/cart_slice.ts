import { createSlice } from '@reduxjs/toolkit';
import { Product } from '../types/products_api_response';

export interface CartState {
   products: Product[];
}

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
      },
      reset: state => (state = initialState),
      update: (state, { payload }: { payload: Product[] }) => {
         state.products = payload;
      },
   },
});

export default cartSlice.reducer;
export const { add, update } = cartSlice.actions;
