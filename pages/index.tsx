import gsap from 'gsap';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import ButtonCircle from '../components/ButtonCircle';
import { Welcome } from '../types/welcome_api_response';
import { mapRange } from '../utils/maths';
import { TransitionScreen } from '../components/TransitionScreen';

interface Props {
   data: Welcome;
}

const Container = styled.div`
   ${tw`
      flex flex-col items-center justify-center
      h-screen overflow-hidden
      isolate
      relative
   `}

   .images {
      ${tw`
         absolute 
         w-screen h-screen
         z-10
      `}

      .bubble {
         ${tw`
            absolute top-0
            object-position[bottom]
            overflow-hidden 
            rounded-full
            w-1/3 aspect-ratio[1/1] 
            z-10
         `}

         ${tw`
            md:( w-1/4 )
         `}

         ${tw`
            xl:( w-1/5 )
         `}
      }
   }

   .title {
      ${tw`
         grid
         mix-blend-screen
         relative z-20
      `}

      h1 {
         ${tw`
            mb-6
            text-8xl
         `}

         ${tw`
            md:( 
               text-9xl 
             )
         `}
      }

      a {
         ${tw`
            justify-self-center
         `}
      }
   }
`;

const Index = ({ data }: Props) => {
   useEffect(() => {
      const bubbles: HTMLElement[] = gsap.utils.toArray('.bubble');

      bubbles.forEach(bubble => {
         gsap.fromTo(
            bubble,
            {
               x: () => `${mapRange(Math.random(), 0, 1, -20, 90)}vw`,
               y: '100vh',
            },
            {
               y: '-100%',
               duration: () => mapRange(Math.random(), 0, 1, 6, 30),
               ease: 'none',
               repeat: -1,
            }
         );
      });

      // return () => {
      //    animation.kill();
      // };
   }, []);

   return (
      <TransitionScreen>
         <Container>
            <div className="title">
               <h1>{data.attributes.title}</h1>
               <Link href="/home">
                  <a>
                     <ButtonCircle>ENTER</ButtonCircle>
                  </a>
               </Link>
            </div>
            <div className="images">
               {data.attributes.buble.data.map(bubble => (
                  <div className="bubble" key={bubble.id}>
                     <Image
                        loading="eager"
                        alt={bubble.attributes.name + ' image'}
                        src={process.env.NEXT_PUBLIC_API + bubble.attributes.url}
                        layout="fill"
                        objectFit="cover"
                     />
                  </div>
               ))}
            </div>
         </Container>
      </TransitionScreen>
   );
};

export const getStaticProps: GetStaticProps = async ctx => {
   const res = await fetch(process.env.NEXT_PUBLIC_API + '/api/welcome?populate=*');
   const { data } = await res.json();

   return {
      props: {
         data: data,
      },
   };
};

export default Index;
