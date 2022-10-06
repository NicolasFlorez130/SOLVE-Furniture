import styled from 'styled-components';
import tw from 'twin.macro';

export const Section = styled.section`
   ${tw`
      mx-auto
      max-w-screen-xs
      px-5 py-14
   `}

   ${tw`
      md:( 
         max-w-screen-md
         px-10
      )
   `}

   ${tw`
      lg:(
         max-w-screen-lg
      )
   `}

   ${tw`
      xl:(
         max-w-screen-xl
         px-16
      )
   `}

   ${tw`
      2xl:(
         max-w-screen-2xl
      )
   `}
`;
