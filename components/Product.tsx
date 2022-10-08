import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import tw from 'twin.macro';
import { Product as Product_T } from '../types/products_api_response';
import { UsdFormatter } from '../utils/formatters';

interface Props {
   product: Product_T;
}

const ImageContainer = styled.div`
   ${tw` 
      overflow-hidden 
      relative 
      rounded-full 
      w-full
   `}

   img {
      transition: 0.5s;

      &:hover {
         transform: scale(1.1);
      }
   }
`;

const Product = ({ product }: Props) => {
   return (
      <Link href={'/shop/' + product.attributes.name.toLocaleLowerCase()}>
         <a data-category={product.attributes.category.data.attributes.name} className="w-full">
            <div className="product" tw="cursor-pointer">
               <ImageContainer className="aspect-[2/3]">
                  <Image
                     alt={product.attributes.name}
                     src={
                        process.env.NEXT_PUBLIC_API + product.attributes.image.data.attributes.url
                     }
                     layout="fill"
                     tw="object-contain"
                  />
               </ImageContainer>
               <div className='dataContainer'>
                  <h3 tw="font-cabinet font-medium text-xl text-center pt-4">
                     {product.attributes.name}
                  </h3>
                  <p tw="text-base font-medium text-center">
                     {UsdFormatter.format(product.attributes.price)} USD
                  </p>
               </div>
            </div>
         </a>
      </Link>
   );
};

export default Product;
