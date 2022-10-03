import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import tw from 'twin.macro';
import { Product } from '../../../types/products_api_response';
import { Room } from '../../../types/rooms_api_response';

interface Props {
   item: Product | Room;
   pos: number;
   openFunc: (item: Room | Product) => void;
}

const Container = styled.div`
   ${tw`
      aspect-ratio[2/3]
      flex justify-center items-center
      overflow-hidden
      relative
      rounded-full
      h-full
   `}

   h3 {
      ${tw`
         opacity-0
         relative
         text-4xl text-titles
         z-20
      `}

      transition: 0.5s
   }

   img {
      transition: 0.5s;
   }

   &:hover {
      h3 {
         opacity: 100;
      }

      img {
         scale: 1.1;
         filter: blur(0.2rem);
      }
   }
`;

const ItemCard = ({ item, pos, openFunc }: Props) => {
   const isRoom = (item as Product).attributes.name ? false : true;
   const room = item as Room;
   const product = item as Product;

   const name = isRoom ? room.attributes.place : product.attributes.name;
   const route = (isRoom ? '/rooms/' : '/shop/') + name.toLowerCase();

   return (
      <Container className={'item-' + pos} onClick={() => openFunc(item)}>
         <h3>OPEN</h3>
         <Image
            src={process.env.NEXT_PUBLIC_API + item.attributes.image.data.attributes.url}
            alt={name + ' image'}
            layout="fill"
            objectFit="cover"
         />
      </Container>
   );
};

export default ItemCard;
