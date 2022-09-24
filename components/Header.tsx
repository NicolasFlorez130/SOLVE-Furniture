import { GetStaticProps } from 'next';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { HEADERS, STRAPI_URL } from '../globalVariables';
import { Product } from '../types/products_api_response';
import Label from './Label';

interface Props {
   inHome?: boolean;
}

const Header_S = styled.header<Props>`
   ${tw`
      flex justify-between
      m-auto p-5
      max-w-screen-2xl
      relative
      w-full
      z-10
   `}

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

const CartBubble = styled.div<Props>`
   ${tw`
      rounded-full
      text-center
      w-6 h-6
   `}

   ${({ inHome }) => (inHome ? tw`bg-texts text-background` : tw`text-texts bg-background`)}
`;

const Header = ({ inHome }: Props) => {
   const linesColor = inHome ? 'border-titles' : 'border-texts';

   const [inCart, setInCart] = useState(0);
   const [featured, setFeatured] = useState<Product[]>([]);

   const getFeaturedProducts = useCallback(async () => {
      const res = await fetch(STRAPI_URL + '/api/products?populate=*', HEADERS);
      const data = await res.json();
      setFeatured(data.data);
   }, []);

   useEffect(() => {
      getFeaturedProducts();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return (
      <div tw="absolute w-full z-20">
         <Header_S inHome={inHome}>
            <Link href="/home">
               <a>
                  <Label size={4}>SØLVE</Label>
               </a>
            </Link>
            <ul tw="flex gap-4 items-center">
               <li>
                  <Link href="/shop">SHOP</Link>
               </li>
               <li tw="flex items-start gap-1">
                  <button>CART</button>
                  <CartBubble className="aspect-square">{inCart}</CartBubble>
               </li>
               <button tw="w-12 h-4 grid grid-rows-2 justify-items-end">
                  <div className={linesColor} tw="border-t self-start w-full"></div>
                  <div className={linesColor} tw="border-b self-end w-4/5"></div>
               </button>
            </ul>
         </Header_S>
         <div tw="hidden">
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
               className="filter"
               tw="absolute w-screen h-screen inset-0 bg-texts bg-opacity-30"></div>
         </div>
      </div>
   );
};

export default Header;
