import { Product } from './products_api_response';

export interface OrderedProduct {
   id: number;
   quantity: number;
   product: Product;
}
