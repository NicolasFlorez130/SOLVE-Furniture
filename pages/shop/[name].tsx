import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import tw from 'twin.macro';
import CommonButton from '../../components/CommonButton';
import Product from '../../components/Product';
import { Section } from '../../components/styledComponents';
import { add } from '../../contexts/cart_slice';
import { useTypedDispatch, useTypedSelector } from '../../hooks/redux';
import { setScrollSmooth } from '../../hooks/ScrollSmooth';
import { Product as Product_T, Products } from '../../types/products_api_response';
import { UsdFormatter } from '../../utils/formatters';
import Layout from '../_layout';
import { TransitionScreen } from '../_transitionScreen';

interface Props {
   product: Product_T;
   relatedProducts: Product_T[];
}

const ArrowSvg = () => (
   <svg tw="inline w-2 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
      <path d="M342.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L274.7 256 105.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
   </svg>
);

const SubTitle = tw.h2`
   mb-6
   text-4xl
`;

const Name = ({ product, relatedProducts }: Props) => {
   const cartDispatch = useTypedDispatch();

   const Input = useRef<HTMLInputElement>(null);

   const addProduct = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      const val = Input.current?.value ? parseInt(Input.current?.value) : 0;

      const products = [];

      for (let i = 0; i < val; i++) {
         products.push(product);
      }
      cartDispatch(add(products));
   };

   const descriptionParagraph = product.attributes.description_detailed.text.split('-').at(0);
   const descriptionLi = [...product.attributes.description_detailed.text.split('-')];
   descriptionLi.shift();

   useEffect(() => {
      setScrollSmooth('#productWrapper', '', 'x');
   }, []);

   return (
      <TransitionScreen>
         <div id="productWrapper" tw="h-screen">
            <Layout>
               <Section tw="pt-28">
                  <h1 tw="text-5xl">{product.attributes.name}</h1>
                  <p tw="font-medium my-4">{UsdFormatter.format(product.attributes.price)} USD</p>
                  <p>{product.attributes.description_small}</p>
                  <form tw="flex flex-col my-8">
                     <input
                        ref={Input}
                        tw="border border-texts mb-6 py-4 px-8 rounded-full"
                        type="number"
                        defaultValue={1}
                        step={1}
                     />
                     <CommonButton onClick={addProduct} type="primary">
                        ADD TO CART
                     </CommonButton>
                  </form>
                  <ul
                     className="border-y-[.1px]"
                     tw="items-center border-texts border-opacity-30 flex gap-4 px-2 py-6">
                     <li>DETAILS</li>
                     <li>DELIVERY</li>
                     <li>RETURNS</li>
                  </ul>
               </Section>
               <div className="imageContainer aspect-[2/3]" tw="relative w-full">
                  <Image
                     src={
                        process.env.NEXT_PUBLIC_API + product.attributes.image.data.attributes.url
                     }
                     alt={product.attributes.name}
                     layout="fill"
                     objectFit="contain"
                     priority
                  />
               </div>
               <Section>
                  <SubTitle>{product.attributes.description_detailed.label}</SubTitle>
                  <p>{descriptionParagraph}</p>
                  <ul>
                     {descriptionLi?.map((li, i) => (
                        <li key={i} tw="mt-4 text-[1.2rem]">
                           <ArrowSvg /> {li}
                        </li>
                     ))}
                  </ul>
               </Section>
               <Section className="border-y" tw="border-texts border-opacity-30">
                  <SubTitle>Related products</SubTitle>
                  <div tw="grid grid-cols-2 gap-8">
                     {relatedProducts.map(prod => (
                        <Product key={prod.id} product={prod} />
                     ))}
                  </div>
               </Section>
            </Layout>
         </div>
      </TransitionScreen>
   );
};

export const getStaticPaths: GetStaticPaths = async ctx => {
   const res = await fetch(process.env.NEXT_PUBLIC_API + '/api/products?populate=*');
   const data: Products = await res.json();

   return {
      paths: data.data.map(product => ({
         params: { name: product.attributes.name.toLowerCase(), id: product.id.toString() },
      })),
      fallback: false,
   };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
   const productRes = await fetch(process.env.NEXT_PUBLIC_API + '/api/products?populate=*');
   const productData: Products = await productRes.json();

   const product = productData.data.find(
      product => product.attributes.name.toLowerCase() === params?.name
   );

   const otherProducts = productData.data.filter(prod => prod.id != product?.id);

   const relatedProducts = otherProducts.filter(
      product_ => product_.attributes.category.data.id === product?.attributes.category.data.id
   );

   return {
      props: {
         product: product,
         relatedProducts:
            relatedProducts.length >= 2
               ? relatedProducts.slice(0, 6)
               : otherProducts.sort(() => Math.random() - 0.5).slice(0, 4),
      },
   };
};

export default Name;
