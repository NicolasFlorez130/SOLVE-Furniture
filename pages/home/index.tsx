import { GetStaticProps } from 'next';
import Link from 'next/link';
import styled from 'styled-components';
import tw from 'twin.macro';
import ButtonText from '../../components/ButtonText';
import CommonButton from '../../components/CommonButton';
import Product from '../../components/Product';
import { Section } from '../../components/styledComponents';
import { HEADERS } from '../../utils/globals';
import { HomeContent } from '../../types/home_api_responses';
import { Product as Product_T } from '../../types/products_api_response';
import { Room as Room_T } from '../../types/rooms_api_response';
import { Store as Store_T } from '../../types/stores_api_response';
import Layout from '../_layout';
import Images from './components/Images';
import Room from './components/Room';
import Store from './components/Store';
import { createContext, useEffect, useRef, useState } from 'react';
import { setScrollSmooth } from '../../hooks/ScrollSmooth';
import Scrollbar from 'smooth-scrollbar';

interface Props {
   content: HomeContent;
   products: Product_T[];
   rooms: Room_T[];
   stores: Store_T[];
}

export interface BgProps {
   bgHref: string;
}

const Hero = styled.section<BgProps>`
   ${tw`
      bg-cover
      flex flex-col items-center justify-center gap-8
      px-5 py-36
      text-titles
   `}

   ${({ bgHref }) => {
      return `background-image: url(${bgHref})`;
   }}
`;

const Home = ({ content, products, rooms, stores }: Props) => {
   useEffect(() => {
      setScrollSmooth('#homeWrapper', '', 'x');
   }, []);

   return (
      <div id="homeWrapper" tw="h-screen">
         <Layout inHome>
            <Hero bgHref={process.env.NEXT_PUBLIC_API + content.background.data.attributes.url}>
               <h1 tw="text-center text-titles text-6xl">{content.title}</h1>
               <Link href="/shop">
                  <a>
                     <CommonButton type="inverse">SHOP NOW</CommonButton>
                  </a>
               </Link>
            </Hero>
            <Section className="featured" tw="border-b border-texts border-opacity-20">
               <h2 tw="mb-12 text-center text-5xl">Featured</h2>
               <div tw="grid grid-cols-2 gap-8">
                  {products.map(product =>
                     product.attributes.featured ? (
                        <Product key={product.id} product={product} />
                     ) : null
                  )}
               </div>
            </Section>
            <Section className="highlight">
               <h3 tw="mb-10 text-5xl">Lorem ipsum</h3>
               <div>
                  <div>
                     {content.highlight.text.split('_').map((p, i) => {
                        return (
                           <p tw="mb-10" key={i}>
                              {p}
                           </p>
                        );
                     })}
                     <Link href="/shop">
                        <a>
                           <CommonButton type="default">SHOP NOW</CommonButton>
                        </a>
                     </Link>
                  </div>
               </div>
            </Section>
            <Images
               bgHref={process.env.NEXT_PUBLIC_API + content.bubblesBackground.data.attributes.url}
               bubbles={content.bubble.data}>
               {content.bubblesTitle}
            </Images>
            <Section className="rooms">
               <h2 tw="text-5xl text-center">Rooms</h2>
               <Link href="rooms">
                  <a tw="flex justify-center my-6">
                     <ButtonText arrowPos="after">SEE ALL</ButtonText>
                  </a>
               </Link>
               <div tw="grid grid-cols-1 gap-8 mx-auto max-w-[200px]">
                  {rooms.map((room, i) => {
                     return i < 3 ? <Room key={room.id} room={room} /> : null;
                  })}
               </div>
            </Section>
            <Section className="stores" tw="border-texts border-opacity-20 border-t border-b">
               <h2 tw="flex text-5xl">Our Stores</h2>
               {stores.map(store => {
                  return <Store key={store.id} store={store} />;
               })}
            </Section>
         </Layout>
      </div>
   );
};

export const getStaticProps: GetStaticProps = async ctx => {
   const homeRes = await fetch(process.env.NEXT_PUBLIC_API + '/api/home?populate=*', HEADERS);
   const homeData = await homeRes.json();

   const productsRes = await fetch(
      process.env.NEXT_PUBLIC_API + '/api/products?populate=*',
      HEADERS
   );
   const productsData = await productsRes.json();

   const roomsRes = await fetch(process.env.NEXT_PUBLIC_API + '/api/rooms?populate=*', HEADERS);
   const roomsData = await roomsRes.json();

   const storesRes = await fetch(process.env.NEXT_PUBLIC_API + '/api/stores?populate=*', HEADERS);
   const storesData = await storesRes.json();

   return {
      props: {
         content: homeData.data.attributes,
         products: productsData.data,
         rooms: roomsData.data,
         stores: storesData.data,
      },
   };
};

export default Home;
