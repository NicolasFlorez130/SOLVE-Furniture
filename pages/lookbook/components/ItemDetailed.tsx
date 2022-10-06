import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import tw from 'twin.macro';
import ButtonText from '../../../components/ButtonText';
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
      hidden
      overflow-scroll
      p-6 pb-12
      top-full
      w-screen h-screen
   `}

   ${tw`
      xs:(
         justify-self-center
         w-2/3    
      )
   `}

   ${tw`
      md:(
         w-3/5
      )
   `}

   ${tw`
      lg:(
         w-1/3
      )
   `}

   .subCont {
      ${tw`
         grid grid-cols-1 justify-items-center
         // min-h-screen
         w-full
      `}

      .closeButton {
         ${tw`
         mt-14
         text-lg
      `}
      }

      h1 {
         ${tw`
            my-6
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
            <div className="subCont">
               <button className="closeButton" onClick={closeFunc}>
                  CLOSE
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
                  <p>
                     {isRoom ? room.attributes.description : product.attributes.description_small}
                  </p>
               </div>
               <Link href={isRoom ? 'rooms/' + name.toLowerCase() : 'shop/' + name.toLowerCase()}>
                  <CommonButton type="primary">GO TO PRODUCT</CommonButton>
               </Link>
            </div>
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
