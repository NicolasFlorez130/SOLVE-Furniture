import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import tw from 'twin.macro';
import ButtonText from '../../components/ButtonText';
import Help from '../../components/Help';
import { Section } from '../../components/styledComponents';
import { HEADERS } from '../../utils/globals';
import { Room as Room_T, Rooms } from '../../types/rooms_api_response';
import Room from '../home/components/Room';
import Layout from '../../components/Layout';
import { useEffect, useRef } from 'react';
import { setScrollSmooth } from '../../hooks/ScrollSmooth';
import { TransitionScreen } from '../../components/TransitionScreen';
import { Scrollbar } from 'smooth-scrollbar/interfaces';
import Head from 'next/head';

interface Props {
   room: Room_T;
   nextRoom: Room_T;
}
const Place = ({ room, nextRoom }: Props) => {
   const scrollWrapper = useRef<Scrollbar>();

   useEffect(() => {
      scrollWrapper.current = setScrollSmooth('#roomWrapper', '', 'x');
   }, []);

   useEffect(() => {
      scrollWrapper.current?.setPosition(0, 0);
   }, [room]);

   const PageHead = () => (
      <Head>
         <base href="/" />
         <title>{room.attributes.place} room</title>
         <meta name="description" content={`See the ${room.attributes.place} style.`} key="desc" />
         <meta property="og:title" content={`SØLVE ${room.attributes.place}`} />
         <meta property="og:description" content={`See the ${room.attributes.place} style.`} />
         <meta property="og:image" content="/thumbnail.webp" />
      </Head>
   );

   return (
      <>
         <PageHead />
         <TransitionScreen>
            <div id="roomWrapper" tw="h-full">
               <Layout>
                  <Section className="top" tw="md:(flex gap-6 items-end)">
                     <div>
                        <h1 tw="mt-16 text-7xl md:( text-9xl )">{room.attributes.place}</h1>
                        <p tw="my-4">{room.attributes.description}</p>
                     </div>
                     <Link href="/rooms">
                        <a>
                           <ButtonText arrowPos="after">ROOMS</ButtonText>
                        </a>
                     </Link>
                  </Section>
                  <div tw="relative w-full" className="aspect-square">
                     <Image
                        src={
                           room.attributes.image.data.attributes.url
                        }
                        alt={room.attributes.place + ' room'}
                        layout="fill"
                        loading="eager"
                        priority
                     />
                  </div>
                  <Section className="highlight" tw="lg:( grid grid-cols-2 )">
                     <h2 tw="text-4xl md:( text-6xl ) lg:( ml-8 )">
                        {room.attributes.details.label}
                     </h2>
                     <div>
                        {room.attributes.details.text.split('_').map((par, i) => (
                           <p key={i} tw="mt-8 lg:( mt-0 mb-8 )">
                              {par}
                           </p>
                        ))}
                     </div>
                  </Section>
                  <div tw="mb-14" className="next">
                     <h3 tw="mb-4 text-7xl text-center md:(text-9xl translate-y-1/2)">NEXT</h3>
                     <div tw="m-auto w-3/4 md:(w-2/3) lg:(w-1/2) xl:( w-1/3 )">
                        <Room room={nextRoom} />
                     </div>
                  </div>
                  <Help />
               </Layout>
            </div>
         </TransitionScreen>
      </>
   );
};

export const getStaticPaths: GetStaticPaths = async ctx => {
   const res = await fetch(process.env.NEXT_PUBLIC_API + '/api/rooms?populate=*', HEADERS);
   const data: Rooms = await res.json();

   return {
      paths: data.data.map(room => ({
         params: { place: room.attributes.place.toLocaleLowerCase() },
      })),
      fallback: false,
   };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
   const res = await fetch(process.env.NEXT_PUBLIC_API + '/api/rooms?populate=*', HEADERS);
   const data: Rooms = await res.json();

   let nextIndex = 0;
   return {
      props: {
         room: data.data.find((room, i) => {
            nextIndex = i;
            return room.attributes.place.toLocaleLowerCase() === params?.place;
         }),
         nextRoom: data.data[nextIndex < data.data.length - 1 ? nextIndex + 1 : 0],
      },
   };
};

export default Place;
