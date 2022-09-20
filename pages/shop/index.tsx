import tw from 'twin.macro';
import Layout from '../_layout';
import { GetStaticProps } from 'next';
import { STRAPI_URL } from '../../globalVariables';
import { Category } from '../../types/categories_api_responses';
import styled from 'styled-components';
import { Product as Product_T } from '../../types/products_api_response';
import { Section } from '../../components/styledComponents';
import Product from '../../components/Product';
import ButtonText from '../../components/ButtonText';

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

const Help = styled(Section)`
   ${tw`
      border-texts border-opacity-20
   `}

   h2 {
      ${tw`
         text-5xl text-center
         py-10
      `}
   }

   & > div {
      ${tw`
         grid grid-cols-2 gap-8 
         text-center
      `}

      div {
         ${tw`
            flex flex-col items-center
         `}

         p {
            margin: 1rem 0;
         }

         h3 {
            ${tw`text-2xl`}
         }
      }
   }
`;

const index = ({ categories, products }: Props) => {
   return (
      <Layout>
         <h1 tw="text-8xl text-center pb-14 pt-28">SHOP</h1>
         <NavList className="border-y">
            <ul>
               {categories.map(category => {
                  return <ul key={category.id}>{category.attributes.name}</ul>;
               })}
            </ul>
         </NavList>
         <Section tw="grid grid-cols-2 gap-8 justify-items-center">
            {products.map(product => (
               <Product product={product} key={product.id} />
            ))}
         </Section>
         <Help className="border-y">
            <h2>Help?</h2>
            <div>
               <div className="helps">
                  <h3>Local Stores</h3>
                  <p>
                     Proin fermentum leo vel orci porta non pulvinar. Diam phasellus vestibulum
                     lorem sed risus ultricies.
                  </p>
                  <ButtonText arrowPos="after">FIND A STORE</ButtonText>
               </div>
               <div className="helps">
                  <h3>Questions</h3>
                  <p>
                     Proin fermentum leo vel orci porta non pulvinar. Diam phasellus vestibulum
                     lorem sed risus ultricies.
                  </p>
                  <ButtonText arrowPos="after">READ THE FAQ</ButtonText>
               </div>
            </div>
         </Help>
      </Layout>
   );
};

export const getStaticProps: GetStaticProps = async ctx => {
   const categoriesRes = await fetch(STRAPI_URL + '/api/categories');
   const categoriesData = await categoriesRes.json();

   const productsRes = await fetch(STRAPI_URL + '/api/products/?populate=*');
   const productsData = await productsRes.json();

   return {
      props: {
         categories: categoriesData.data,
         products: productsData.data,
      },
   };
};

export default index;
