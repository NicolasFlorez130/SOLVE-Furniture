import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useEffect, useLayoutEffect } from 'react';
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
   useEffect(() => {
      gsap.registerPlugin(ScrollTrigger);

      const movement = gsap.fromTo(
         '.bubble',
         {
            scale: 0.5,
            xPercent: () => Math.random() * 100,
            y: '100vh',
         },
         {
            duration: 0.5,
            ease: 'none',
            scale: () => 1 + Math.random() * 0.7,
            stagger: 0.15,
            y: '-170%',
         }
      );

      ScrollTrigger.create({
         animation: movement,
         end: `${bubbles.length * 300}vh end`,
         pin: true,
         scroller: '#homeWrapper',
         scrub: true,
         start: 'top top',
         trigger: '#imagesWrapper',
      });

      return () => {
         movement.kill();
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return (
      <Images_S id="imagesWrapper" bgHref={bgHref}>
         <Title>{children}</Title>
         {bubbles.map(bubble => {
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
