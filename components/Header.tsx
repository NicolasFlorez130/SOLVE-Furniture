import Link from 'next/link';
import { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { HEADERS } from '../utils/globals';
import { Product } from '../types/products_api_response';
import Label from './Label';
import gsap from 'gsap';
import { useTypedSelector } from '../hooks/redux';

interface StyledProps {
   inHome?: boolean;
}

interface Props extends StyledProps {
   changeVisibility: (value: 'open' | 'close') => void;
   cartHandler: (value: 'open' | 'close') => void;
}

const Header_S = styled.header<StyledProps>`
   ${tw`
      flex justify-between
      m-auto p-5
      max-w-screen-2xl
      relative
      w-full
      z-10
   `}

   .line {
      ${({ inHome }) => (inHome ? tw`border-titles` : tw`border-texts`)}
   }

   ${({ inHome }) => (inHome ? tw`text-titles` : tw`text-texts`)}
`;

const Menu = styled.div`
   ${tw`
      bg-background
      grid grid-cols-2
      p-6
      relative
      z-10   
   `}

   ul {
      h2 {
         ${tw`text-2xl`}
      }

      li {
         ${tw`mb-4`}
      }
   }
`;

const CartBubble = styled.div<StyledProps>`
   ${tw`
      rounded-full
      text-center
      w-6 h-6
   `}

   ${({ inHome }) => (inHome ? tw`text-texts bg-titles` : tw`text-titles bg-texts`)}
`;

const Header = ({ inHome, changeVisibility, cartHandler }: Props) => {
   const cartValue = useTypedSelector(store => store.cart.products.length);
   const [featured, setFeatured] = useState<Product[]>([]);

   const getFeaturedProducts = useCallback(async () => {
      const res = await fetch(process.env.NEXT_PUBLIC_API + '/api/products?populate=*', HEADERS);
      const data = await res.json();
      setFeatured(data.data);
   }, []);

   const menu = useRef<HTMLDivElement>(null);
   const container = useRef<HTMLDivElement>(null);
   const currentState = useRef(0);

   const toggleMenu = () => {
      container.current?.classList.toggle('h-screen');

      if (!currentState.current) {
         menu.current?.classList.remove('hidden');

         gsap.to('.lineTop', {
            keyframes: {
               '0%': { width: '100%', rotation: 0 },
               '50%': { width: '50%', rotation: 0, top: 0 },
               '100%': { rotation: 45, top: '50%' },
            },
            duration: 0.3,
         });
         gsap.to('.lineBot', {
            keyframes: {
               '0%': { width: '80%', rotation: 0 },
               '50%': { width: '50%', rotation: 0, bottom: 0 },
               '100%': { rotation: -45, bottom: '50%' },
            },
            duration: 0.3,
         });
         gsap.fromTo(
            menu.current,
            { opacity: 0, yPercent: -10 },
            { opacity: 1, yPercent: 0, duration: 0.3 }
         );

         changeVisibility('open');
         currentState.current = 1;
      } else {
         gsap.to('.lineTop', {
            keyframes: {
               '50%': { width: '50%', rotation: 0, top: 0 },
               '100%': { width: '100%', rotation: 0 },
            },
            duration: 0.3,
         });
         gsap.to('.lineBot', {
            keyframes: {
               '50%': { width: '50%', rotation: 0, bottom: 0 },
               '100%': { width: '80%', rotation: 0 },
            },
            duration: 0.3,
         });
         gsap.fromTo(
            menu.current,
            { opacity: 1, yPercent: 0 },
            {
               opacity: 0,
               yPercent: -10,
               duration: 0.3,
               onComplete: () => menu.current?.classList.add('hidden'),
            }
         );

         changeVisibility('close');
         currentState.current = 0;
      }
   };

   useEffect(() => {
      getFeaturedProducts();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return (
      <div ref={container} tw="absolute overflow-hidden w-full z-20">
         <Header_S inHome={inHome}>
            <Link href="/home">
               <a>
                  <Label size={4}>SØLVE</Label>
               </a>
            </Link>
            <ul tw="flex gap-2 items-center">
               <li>
                  <Link href="/shop">SHOP</Link>
               </li>
               <li
                  onClick={() => {
                     cartHandler('open');
                  }}
                  tw="flex items-start gap-2">
                  <button>CART</button>
                  <CartBubble inHome={inHome} className="aspect-square">
                     {cartValue}
                  </CartBubble>
               </li>
               <li onClick={toggleMenu} tw="cursor-pointer relative w-12 h-4">
                  <div
                     className="line lineTop"
                     tw="absolute border-t right-0 self-start top-0 w-full"></div>
                  <div
                     className="line lineBot"
                     tw="absolute border-b bottom-0 right-0 self-end w-4/5"></div>
               </li>
            </ul>
         </Header_S>
         <div ref={menu} className="hidden">
            <Menu>
               <ul>
                  <li>
                     <h2>SOLVE</h2>
                  </li>
                  <li>
                     <Link href="/home">HOME</Link>
                  </li>
                  <li>
                     <Link href="/rooms">ROOMS</Link>
                  </li>
               </ul>
               <ul>
                  <li>
                     <h2>SHOP</h2>
                  </li>
                  <li>
                     <Link href="/shop">ALL PRODUCTS</Link>
                  </li>
                  <li>
                     <Link href="/lookbook">LOOKBOOK</Link>
                  </li>
               </ul>
               <div className="featured" tw="hidden">
                  {featured.map(
                     feat =>
                        feat.attributes.featured && <h2 key={feat.id}>{feat.attributes.name}</h2>
                  )}
               </div>
            </Menu>
            <div
               onClick={toggleMenu}
               tw="absolute bg-texts bg-opacity-50 h-screen top-0 w-screen"></div>
         </div>
      </div>
   );
};

export default Header;
