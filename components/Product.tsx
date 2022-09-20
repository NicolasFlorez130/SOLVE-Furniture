import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import tw from 'twin.macro';
import { STRAPI_URL } from '../globalVariables';
import { Product as Product_T } from '../types/products_api_response';

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
   const usdFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

   return (
      <Link href={'/' + product.attributes.name.toLocaleLowerCase()}>
         <div tw="cursor-pointer w-full">
            <ImageContainer className="aspect-[2/3]">
               <Image
                  alt={product.attributes.name}
                  src={STRAPI_URL + product.attributes.image.data.attributes.url}
                  layout="fill"
                  tw="object-contain"
               />
            </ImageContainer>
            <h5 tw="text-xl font-medium text-center pt-4">{product.attributes.name}</h5>
            <p tw="text-base font-medium text-center">
               {usdFormatter.format(product.attributes.price)} USD
            </p>
         </div>
      </Link>
   );
};

export default Product;
