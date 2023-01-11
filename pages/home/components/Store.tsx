import { Store as Store_T } from '../../../types/stores_api_response';
import Image from 'next/image';
import tw from 'twin.macro';
import styled from 'styled-components';
import ButtonText from '../../../components/ButtonText';

interface Props {
   store: Store_T;
}

const Container = styled.div`
   ${tw`
      grid grid-cols-2 gap-8 items-center
      mt-8
   `}

   ${tw`
      md:( w-3/4 )
   `}

   ${tw`
      lg:( w-full )
   `}

   .imageContainer {
      aspect-ratio: 1/1;

      ${tw`
         overflow-hidden
         relative
         rounded-full
         w-full 
      `}
   }

   .dataContainer {
      h3 {
         ${tw`capitalize font-medium text-2xl`}
      }
      p {
         ${tw`
            text-base
            py-4
         `}
      }
   }
`;

const Store = ({ store }: Props) => {
   return (
      store && (
         <Container>
            <div className="imageContainer">
               <Image
                  alt={store.attributes.city + ' store'}
                  src={store.attributes.media.data.attributes.url}
                  layout="fill"
                  tw="object-cover"
               />
            </div>
            <div className="dataContainer">
               <h3>{store.attributes.city.toLocaleLowerCase()}</h3>
               <p>
                  SØLVE Store,
                  <br />
                  {store.attributes.location}
               </p>
               <ButtonText arrowPos="after">GET DIRECTIONS</ButtonText>
            </div>
         </Container>
      )
   );
};

export default Store;
