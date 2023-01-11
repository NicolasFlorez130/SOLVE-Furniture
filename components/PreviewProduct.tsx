import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import tw from 'twin.macro';
import { update } from '../contexts/cart_slice';
import { useTypedDispatch, useTypedSelector } from '../hooks/redux';
import { OrderedProduct } from '../types/custom_objects_types';
import { Product } from '../types/products_api_response';
import { UsdFormatter } from '../utils/formatters';

interface Props {
   orderedProduct: OrderedProduct;
}

const Container = styled.div`
   ${tw`
      grid grid-cols-[2fr 5fr max-content] items-center
      px-6 py-4
   `}

   ${tw` 
      xl:(
         grid-cols-[1fr 3fr max-content]
      )
   `}

   .imageContainer {
      aspect-ratio: 2/3;
      ${tw`
         overflow-hidden
         relative
         rounded-full
         w-full
      `};
   }

   .info {
      ${tw`
         px-4
      `}

      h3 {
         ${tw`
            text-lg font-cabinet font-medium
         `}
      }
      .price {
         ${tw`
            text-base
         `}
      }
   }

   .quantity {
      height: min-content;

      ${tw`
         bg-titles
         border border-texts rounded-full
         text-center 
         w-12
         overflow-hidden
      `}
   }
`;

const PreviewProduct = ({ orderedProduct }: Props) => {
   const products = useTypedSelector(store => store.cart.products);
   const prodsDispatch = useTypedDispatch();

   const editQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(e.target.value);
      if (value >= 0 && value != orderedProduct.quantity) {
         const otherProducts = products.filter(prod => prod.id != orderedProduct.id);

         const auxArray: Product[] = [];

         for (let i = 0; i < value; i++) {
            otherProducts.push({ ...orderedProduct.product });
         }
         prodsDispatch(update(otherProducts));
      }
   };

   return (
      <Container>
         <div className="imageContainer">
            <Image
               src={orderedProduct.product.attributes.image.data.attributes.url}
               alt={orderedProduct.product.attributes.name + ' preview image'}
               layout="fill"
               objectFit="contain"
            />
         </div>
         <div className="info">
            <h3>{orderedProduct.product.attributes.name.toUpperCase()}</h3>
            <p className="price">
               {UsdFormatter.format(orderedProduct.product.attributes.price)} USD
            </p>
            <Link href={'/shop/' + orderedProduct.product.attributes.name.toLowerCase()}>
               <u tw="cursor-pointer">Go to the product</u>
            </Link>
         </div>
         <input
            onBlur={editQuantity}
            className="quantity"
            type="text"
            defaultValue={orderedProduct.quantity}
            step={1}
         />
      </Container>
   );
};

export default PreviewProduct;
