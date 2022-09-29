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
import Layout from '../_layout';
import { useEffect } from 'react';
import { setScrollSmooth } from '../../hooks/ScrollSmooth';

interface Props {
   room: Room_T;
   nextRoom: Room_T;
}
const Place = ({ room, nextRoom }: Props) => {
   useEffect(() => {
      setScrollSmooth('#roomWrapper');
   }, []);

   return (
      <div id="roomWrapper" tw="h-screen">
         <Layout>
            <Section className="top">
               <h1 tw="mt-16 text-7xl">{room.attributes.place.toUpperCase()}</h1>
               <p tw="my-4">{room.attributes.description}</p>
               <Link href="/rooms">
                  <a>
                     <ButtonText arrowPos="after">ROOMS</ButtonText>
                  </a>
               </Link>
            </Section>
            <div tw="relative w-full" className="aspect-square">
               <Image
                  src={process.env.NEXT_PUBLIC_API + room.attributes.image.data.attributes.url}
                  alt={room.attributes.place + ' room'}
                  layout="fill"
                  loading="eager"
                  priority
               />
            </div>
            <Section className="highlight">
               <h2 tw="text-4xl">{room.attributes.details.label}</h2>
               <div>
                  {room.attributes.details.text.split('_').map((par, i) => (
                     <p key={i} tw="mt-8">
                        {par}
                     </p>
                  ))}
               </div>
            </Section>
            <div tw="mb-14" className="next">
               <h3 tw="mb-4 text-7xl text-center">NEXT</h3>
               <div tw="m-auto w-3/4">
                  <Room room={nextRoom} />
               </div>
            </div>
            <Help />
         </Layout>
      </div>
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
