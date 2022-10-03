import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import tw from 'twin.macro';
import CommonButton from '../../../components/CommonButton';
import { Product } from '../../../types/products_api_response';
import { Room } from '../../../types/rooms_api_response';

interface Props {
   item: Product | Room | null;
   closeFunc: () => void;
}

const Container = styled.div`
   ${tw`
      absolute
      bg-background
      hidden grid-cols-1 justify-items-center
      p-6
      top-full
      w-screen min-h-screen
   `}

   .closeButton {
      ${tw`
         absolute
         justify-self-start
         mt-20 ml-6
         text-lg
         w-8
      `}
   }

   h1 {
      ${tw`
         mb-6 mt-12
         text-4xl 
      `}
   }

   .imageContainer {
      ${tw`
         aspect-ratio[2/3]
         overflow-hidden
         relative
         rounded-full
         w-full
      `}
   }

   .textContainer {
      p {
         ${tw`
            my-6
            text-center
         `}
      }
   }

   button:not(.closeButton) {
      ${tw`
         mb-6 
      `}
   }
`;

const ItemDetailed = ({ item, closeFunc }: Props) => {
   const room = item as Room;
   const product = item as Product;

   const isRoom = (item as Product).attributes.name ? false : true;
   const name = isRoom ? room?.attributes.place : product.attributes.name;

   return (
      item && (
         <Container id="itemWrapper">
            <button className="closeButton" onClick={closeFunc}>
               <ArrowSvg />
            </button>
            <h1>{name}</h1>
            <div className="imageContainer">
               <Image
                  src={process.env.NEXT_PUBLIC_API + item.attributes.image.data.attributes.url}
                  alt={name}
                  layout="fill"
               />
            </div>
            <div className="textContainer">
               <p>{isRoom ? room.attributes.description : product.attributes.description_small}</p>
            </div>
            <Link href={isRoom ? 'rooms/' + name.toLowerCase() : 'shop/' + name.toLowerCase()}>
               <CommonButton type="primary">GO TO PRODUCT</CommonButton>
            </Link>
         </Container>
      )
   );
};

const ArrowSvg = () => (
   <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
      <path
         fill="none"
         stroke="currentColor"
         strokeLinecap="round"
         strokeLinejoin="round"
         strokeWidth="2"
         d="m11 5l-7 7l7 7m-7-7h16"
      />
   </svg>
);

export default ItemDetailed;
