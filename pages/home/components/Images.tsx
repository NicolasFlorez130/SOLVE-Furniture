import Image from 'next/image';
import styled from 'styled-components';
import tw from 'twin.macro';
import { BgProps } from '..';
import { STRAPI_URL } from '../../../globalVariables';
import { Bubble_Data } from '../../../types/home_api_responses';

interface Props {
   children: string;
   bgHref: string;
   bubbles: Bubble_Data[];
}

const Images_S = styled.section<BgProps>`
   ${tw`
      bg-cover bg-center
      relative
   `}

   .imageContainer {
      ${tw`
         absolute top-0
         overflow-hidden 
         rounded-full
         w-1/2 aspect-ratio[1/1] 
         z-0
      `}
   }

   ${({ bgHref }) => {
      return `background-image: url(${bgHref})`;
   }}
`;

const Title = tw.h2`
   py-[50vh]
   max-h-screen 
   relative 
   text-titles text-center text-8xl
   z-10
`;

const Images = ({ children, bgHref, bubbles }: Props) => {
   return (
      <Images_S bgHref={bgHref}>
         <Title>{children}</Title>
         {bubbles.map(bubble => {
            return (
               <div className="imageContainer" key={bubble.id}>
                  <Image
                     loading="eager"
                     alt="bubble image"
                     src={STRAPI_URL + bubble.attributes.url}
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
