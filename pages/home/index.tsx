import { GetStaticProps } from 'next';
import Link from 'next/link';
import styled from 'styled-components';
import tw from 'twin.macro';
import ButtonText from '../../components/ButtonText';
import CommonButton from '../../components/CommonButton';
import Product from '../../components/Product';
import { Section } from '../../components/styledComponents';
import { STRAPI_URL } from '../../globalVariables';
import { HomeContent } from '../../types/home_api_responses';
import { Product as Product_T } from '../../types/products_api_response';
import { Room as Room_T } from '../../types/rooms_api_response';
import { Store as Store_T } from '../../types/stores_api_response';
import Layout from '../_layout';
import Images from './components/Images';
import Room from './components/Room';
import Store from './components/Store';

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
   return (
      <>
         <Layout inHome>
            <Hero bgHref={STRAPI_URL + content.background.data.attributes.url}>
               <h1 tw="text-center text-titles text-7xl">{content.title}</h1>
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
                     <CommonButton type="default">SHOP NOW</CommonButton>
                  </div>
               </div>
            </Section>
            <Images
               bgHref={STRAPI_URL + content.bubblesBackground.data.attributes.url}
               bubbles={content.bubble.data}>
               {content.bubblesTitle}
            </Images>
            <Section className="rooms">
               <h2 tw="text-5xl text-center">Rooms</h2>
               <Link href="rooms">
                  <a tw="flex justify-center mt-6">
                     <ButtonText arrowPos="after">SEE ALL</ButtonText>
                  </a>
               </Link>
               <div tw="grid grid-cols-2 gap-8">
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
      </>
   );
};

export const getStaticProps: GetStaticProps = async ctx => {
   const homeRes = await fetch(STRAPI_URL + '/api/home?populate=*');
   const homeData = await homeRes.json();

   const productsRes = await fetch(STRAPI_URL + '/api/products?populate=*');
   const productsData = await productsRes.json();

   const roomsRes = await fetch(STRAPI_URL + '/api/rooms?populate=*');
   const roomsData = await roomsRes.json();

   const storesRes = await fetch(STRAPI_URL + '/api/stores?populate=*');
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
