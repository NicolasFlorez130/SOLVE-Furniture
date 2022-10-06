import gsap from 'gsap';
import Draggable from 'gsap/Draggable';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { GetStaticProps } from 'next';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
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
      grid grid-cols-6 gap-6
      overflow-hidden
      px-6 py-24
      w-[170vw]
   `}

   ${tw`
      xs:(
         w-[120vw]    
      )
   `}

   ${tw`
      lg:(
         w-screen 
      )
   `}

   .item-2,
   .item-4,
   .item-6 {
      translate: 0 25%;
   }
   .item-1,
   .item-3,
   .item-5 {
      translate: 0 -25%;
   }
`;

let itemCount = 0;

const Index = ({ items }: Props) => {
   const [item, setItem] = useState<any>(dummy);

   const open = useRef(0);

   useEffect(() => {
      gsap.registerPlugin(Draggable);

      gsap.to('#cardsContainer', {
         x: '50vw',
         xPercent: -50,
         y: '50vh',
         yPercent: -50,
      });
      Draggable.create('#cardsContainer', { bounds: '#productsWrapper', dragClickables: true });
   }, []);

   const openDetails = (item: Product_T | Room) => {
      !open.current && setItem(item);
      gsap.to('#productsWrapper', {
         duration: 0.3,
         filter: 'grayscale(100%) blur(4px)',
         ease: 'none',
      });
      gsap.to('#itemWrapper', { duration: 0.3, display: 'grid', y: '-100vh', ease: 'power4.out' });
      open.current = 1;
   };
   const closeDetails = () => {
      gsap.to('#productsWrapper', { duration: 0.3, filter: 'grayscale(0) blur(0)', ease: 'none' });
      gsap.to('#itemWrapper', {
         duration: 0.3,
         y: '0',
         ease: 'power3.in',
         onComplete: () => {
            gsap.to('#itemWrapper', { display: 'none' });
            open.current = 0;
         },
      });
   };

   return (
      <TransitionScreen>
         <Layout footerLess>
            <div tw="grid">
               <div id="productsWrapper" tw="h-screen overflow-hidden w-screen">
                  <Container id="cardsContainer">
                     {[...items, ...items].map((item, i) => {
                        itemCount = itemCount >= 6 ? 1 : itemCount + 1;
                        return (
                           <Product item={item} key={i} pos={itemCount} openFunc={openDetails} />
                        );
                     })}
                  </Container>
               </div>
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
