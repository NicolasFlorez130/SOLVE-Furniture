import Image from 'next/image';
import { useEffect, useLayoutEffect, useRef } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { BgProps } from '..';
import { Bubble_Data } from '../../../types/home_api_responses';

interface Props {
   children: string;
   bgHref: string;
   bubbles: Bubble_Data[];
}

const Images_S = styled.section<BgProps>`
   ${tw`
      bg-blend-multiply bg-cover bg-center bg-texts bg-opacity-10
      grid
      h-screen
      relative
   `}

   .bubble {
      ${tw`
         absolute top-0
         overflow-hidden 
         rounded-full
         w-1/2 aspect-ratio[1/1] 
         z-0
      `}

      ${tw`
         xs:(
            w-1/4
         )
      `}

      ${tw`
         lg:(
            w-1/5
         )
      `}
   }

   ${({ bgHref }) => {
      return `background-image: url(${bgHref})`;
   }}
`;

const Title = styled.h2`
   ${tw`
      align-self[center]
      relative 
      text-titles text-center !text-8xl
      z-10
   `}
`;

const Images = ({ children, bgHref, bubbles }: Props) => {
   return (
      <Images_S id="imagesWrapper" bgHref={bgHref}>
         <Title>{children}</Title>
         {bubbles &&
            bubbles.map(bubble => {
               return (
                  <div className="bubble" key={bubble.id}>
                     <Image
                        loading="eager"
                        alt="bubble image"
                        src={process.env.NEXT_PUBLIC_API + bubble.attributes.url}
                        layout="fill"
                        objectFit="cover"
                     />
                  </div>
               );
            })}
      </Images_S>
   );
};

export default Images;
