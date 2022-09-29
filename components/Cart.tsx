import { forwardRef, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { useTypedSelector } from '../hooks/redux';
import { OrderedProduct } from '../types/custom_objects_types';
import { UsdFormatter } from '../utils/formatters';
import CommonButton from './CommonButton';
import PreviewProduct from './PreviewProduct';

interface Props {
   closeHandler: (value: 'open' | 'close') => void;
}

const Container = styled.div`
   ${tw`
      absolute
      bg-background 
      hidden grid-rows-[min-content 1fr min-content]
      overflow-scroll
      w-screen h-screen
      z-30
   `}

   .products {
      overflow: scroll;
   }

   .subtotal {
      ${tw`
         border-texts border-opacity-30 border-t
         grid grid-cols-1
         p-6
         w-full
      `}

      div {
         ${tw`
            grid grid-cols-2
         `}

         p {
            ${tw`
               font-medium
               mb-4
            `}

            :nth-child(1) {
               justify-self: start;
            }
            :nth-child(2) {
               justify-self: end;
            }
         }
      }
   }
`;

const Cart = ({ closeHandler }: Props) => {
   const products = useTypedSelector(store => store.cart.products);
   const orderProducts = () => {
      const ordered: OrderedProduct[] = [];
      products.forEach(product => {
         const orderedProd = ordered.find(ordProd => ordProd.id === product.id);
         if (orderedProd != null) {
            orderedProd.quantity++;
         } else {
            ordered.push({
               id: product.id,
               product: product,
               quantity: 1,
            });
         }
      });
      return ordered;
   };

   const [ordProds, setOrdProds] = useState(orderProducts());

   useEffect(() => {
      setOrdProds([]);
      setTimeout(() => {
         setOrdProds(orderProducts());
      }, 1);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [products]);

   let totalCost =
      products.length > 0
         ? products.map(product => product.attributes.price).reduce((acc, current) => acc + current)
         : 0;

   return (
      <Container className="cart">
         <div tw="px-6 pt-6 text-2xl font-new-york flex justify-between ">
            <h2>Cart</h2>
            <button
               onClick={() => {
                  closeHandler('close');
               }}>
               Close
            </button>
         </div>
         <div className="products">
            {ordProds.length > 0 ? (
               ordProds.map((oP, i) => <PreviewProduct key={i} orderedProduct={oP} />)
            ) : (
               <p tw="text-center w-2/3 m-auto pt-20">
                  It seems there&apos;s nothing.
                  <br />
                  All you add to the cart will appear here.
               </p>
            )}
         </div>
         <div className="subtotal">
            <div>
               <p>SUBTOTAL</p>
               <p>{UsdFormatter.format(totalCost)} USD</p>
            </div>
            <CommonButton type="primary">CONTINUE TO CHECKOUT</CommonButton>
         </div>
      </Container>
   );
};

export default Cart;
