import styled from 'styled-components';
import tw from 'twin.macro';
import ButtonText from './ButtonText';
import { Section } from './styledComponents';

const Container = styled(Section)`
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

const Help = () => {
   return (
      <Container className="border-y">
         <h2>Help?</h2>
         <div>
            <div className="helps">
               <h3>Local Stores</h3>
               <p>
                  Proin fermentum leo vel orci porta non pulvinar. Diam phasellus vestibulum lorem
                  sed risus ultricies.
               </p>
               <ButtonText arrowPos="after">FIND A STORE</ButtonText>
            </div>
            <div className="helps">
               <h3>Questions</h3>
               <p>
                  Proin fermentum leo vel orci porta non pulvinar. Diam phasellus vestibulum lorem
                  sed risus ultricies.
               </p>
               <ButtonText arrowPos="after">READ THE FAQ</ButtonText>
            </div>
         </div>
      </Container>
   );
};

export default Help;
