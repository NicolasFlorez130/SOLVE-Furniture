import gsap from 'gsap';
import Draggable from 'gsap/Draggable';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { GetStaticProps } from 'next';
import { useEffect, useLayoutEffect, useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { Product as Product_T } from '../../types/products_api_response';
import { Room } from '../../types/rooms_api_response';
import Layout from '../_layout';
import { TransitionScreen } from '../_transitionScreen';
import Product from './components/ItemCard';
import ItemDetailed from './components/ItemDetailed';
import dummy from './utils/dummyItem';

interface Props {
   items: Product_T[];
}

const Container = styled.div`
   ${tw`
      grid grid-cols-4 gap-6
      overflow-hidden
      px-6 py-24
      w-[170vw]
   `}

   .item-2,
   .item-4 {
      translate: 0 25%;
   }
   .item-1,
   .item-3 {
      translate: 0 -25%;
   }
`;

let itemCount = 0;

const Index = ({ items }: Props) => {
   const [item, setItem] = useState<any>(dummy);

   useEffect(() => {
      gsap.registerPlugin(Draggable);

      gsap.to('#cardsContainer', {
         x: '50vw',
         xPercent: -50,
         y: '50vh',
         yPercent: -50,
      });
      Draggable.create('#cardsContainer', { bounds: '#productsWrapper' });
   }, []);

   const openDetails = (item: Product_T | Room) => {
      setItem(item);
      gsap.to('#itemWrapper', { duration: 0.3, display: 'grid', y: '-100vh', ease: 'power4.out' });
   };
   const closeDetails = () => {
      gsap.to('#itemWrapper', {
         duration: 0.3,
         y: '0',
         ease: 'power3.in',
         onComplete: () => {
            gsap.to('#itemWrapper', { display: 'none' });
         },
      });
   };

   return (
      <TransitionScreen>
         <Layout footerLess>
            <div id="productsWrapper" tw="h-screen overflow-hidden w-screen">
               <Container id="cardsContainer">
                  {[...items, ...items].map((item, i) => {
                     itemCount = itemCount >= 4 ? 1 : itemCount + 1;
                     return <Product item={item} key={i} pos={itemCount} openFunc={openDetails} />;
                  })}
               </Container>
               <ItemDetailed item={item} closeFunc={closeDetails} />
            </div>
         </Layout>
      </TransitionScreen>
   );
};

export const getStaticProps: GetStaticProps = async ctx => {
   const productsRes = await fetch(process.env.NEXT_PUBLIC_API + '/api/products?populate=*');
   const products = await productsRes.json();

   const roomsRes = await fetch(process.env.NEXT_PUBLIC_API + '/api/rooms?populate=*');
   const rooms = await roomsRes.json();

   return {
      props: {
         items: [...products.data, ...rooms.data],
      },
   };
};

export default Index;
