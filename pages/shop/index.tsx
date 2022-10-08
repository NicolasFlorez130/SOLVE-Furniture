import tw from 'twin.macro';
import Layout from '../../components/Layout';
import { GetStaticProps } from 'next';
import { HEADERS } from '../../utils/globals';
import { Category } from '../../types/categories_api_responses';
import styled from 'styled-components';
import { Product as Product_T } from '../../types/products_api_response';
import { Section } from '../../components/styledComponents';
import Product from '../../components/Product';
import Help from '../../components/Help';
import { useEffect, useRef, useState } from 'react';
import { setScrollSmooth } from '../../hooks/ScrollSmooth';
import { TransitionScreen } from '../../components/TransitionScreen';
import Flip from 'gsap/Flip';
import gsap from 'gsap';
import Head from 'next/head';

interface Props {
   categories: Category[];
   products: Product_T[];
}

const NavList = styled.nav`
   ${tw`
      border-texts border-opacity-20 
      py-8
   `}

   ul {
      ${tw`flex gap-8 justify-center`}

      li {
         cursor: pointer;
      }
   }
`;

const Index = ({ categories, products }: Props) => {
   useEffect(() => {
      gsap.registerPlugin(Flip);

      setScrollSmooth('#shopWrapper', '', 'x');
   }, []);

   const changeCategory = (category: string) => {
      const selector = '#shopWrapper .product:not(.header .product)';

      const productsState = Flip.getState(selector);
      const containerState = Flip.getState('#productsContainer');

      const prods = document.querySelectorAll(selector) as NodeListOf<HTMLElement>;

      prods.forEach(product => {
         product.classList.remove('hidden');
         category.toLowerCase() === 'all' ||
            (product.dataset.category?.toLowerCase() != category.toLowerCase() &&
               product.classList.add('hidden'));
      });

      Flip.from(containerState, { duration: 0.2 });

      Flip.from(productsState, {
         duration: 0.2,
         absolute: true,
         onEnter: el =>
            gsap.fromTo(el, { opacity: 0, scale: 0.5 }, { duration: 0.2, opacity: 1, scale: 1 }),
         onLeave: el =>
            gsap.fromTo(
               el,
               { width: `${productsState.elementStates.at(0)?.bounds.width}px` },
               { duration: 0.2, opacity: 0, scale: 0.5 }
            ),
      });
   };

   const PageHead = () => (
      <Head>
         <base href="/" />
         <title>Products shop</title>
         <meta
            name="description"
            content="Come to see all the products SØLVE have to you."
            key="desc"
         />
         <meta property="og:title" content="SØLVE Shop" />
         <meta property="og:description" content="Here you can see all SØLVE products." />
         <meta property="og:image" content="/thumbnail.webp" />
      </Head>
   );

   return (
      <>
         <PageHead />
         <TransitionScreen>
            <div id="shopWrapper" tw="h-screen">
               <Layout>
                  <h1 tw="text-8xl text-center pb-14 pt-28">SHOP</h1>
                  <NavList className="border-y">
                     <ul>
                        <li>
                           <button onClick={() => changeCategory('all')}>ALL</button>
                        </li>
                        {categories.map(category => {
                           return (
                              <li key={category.id}>
                                 <button onClick={() => changeCategory(category.attributes.name)}>
                                    {category.attributes.name}
                                 </button>
                              </li>
                           );
                        })}
                     </ul>
                  </NavList>
                  <Section
                     id="productsContainer"
                     tw="grid grid-cols-2 gap-8 justify-items-center relative md:( grid-cols-3 gap-14 )">
                     {products.map(product => (
                        <Product product={product} key={product.id} />
                     ))}
                  </Section>
                  <Help />
               </Layout>
            </div>
         </TransitionScreen>
      </>
   );
};

export const getStaticProps: GetStaticProps = async ctx => {
   const categoriesRes = await fetch(process.env.NEXT_PUBLIC_API + '/api/categories', HEADERS);
   const categoriesData = await categoriesRes.json();

   const productsRes = await fetch(
      process.env.NEXT_PUBLIC_API + '/api/products/?populate=*',
      HEADERS
   );
   const productsData = await productsRes.json();

   return {
      props: {
         categories: categoriesData.data,
         products: productsData.data,
      },
   };
};

export default Index;
