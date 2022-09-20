import Link from 'next/link';
import { useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import Label from './Label';

interface Props {
   inHome: boolean;
}

const Header_S = styled.header<Props>`
   ${tw`
      absolute
      flex justify-between
      m-auto p-5
      max-w-screen-2xl
      w-full
   `}

   ${({ inHome }) => (inHome ? tw`text-titles` : tw`text-texts`)}
`;

const CartBubble = tw.div`
   bg-titles
   rounded-full
   text-texts text-center
   w-6 h-6
`;

const Header = ({ inHome }: Props) => {
   const linesColor = inHome ? 'border-titles' : 'border-texts';

   const [inCart, setInCart] = useState(0);

   return (
      <Header_S inHome={inHome}>
         <Link href="/home">
            <a>
               <Label size={4}>SØLVE</Label>
            </a>
         </Link>
         <ul tw="flex gap-4 items-center">
            <li>
               <Link href='/shop'>SHOP</Link>
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
   );
};

export default Header;
