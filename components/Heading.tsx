import styled from 'styled-components';
import tw from 'twin.macro';

interface Props {
   type: 'h1_xl' | 'h1_l' | 'h1_m' | 'h1_s' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
   children: string;
   align?: string;
}

interface h1Props {
   size: string;
   align: string;
}

const H1 = styled.h1<h1Props>`
   ${({ size, align }) => {
      switch (size) {
         case 'h1_xl':
            return tw`text-8xl ${align}`;
         case 'h1_l':
            return tw`text-7xl ${align}`;
         case 'h1_m':
            return tw`text-6xl ${align}`;
         case 'h1_s':
            return tw`text-5xl ${align}`;
         case 'h1':
            return tw`text-4xl ${align}`;
      }
   }}
`;

const Heading = ({ children, type, align = '' }: Props) => {
   if (type.includes('_')) {
      return (
         <H1 tw="font-new-york" align='' size={type}>
            {children}
         </H1>
      );
   } else {
      switch (type) {
         case 'h2':
            return <h2 tw={'font-new-york text-3xl ' + align}>{children}</h2>;
         case 'h3':
            return <h3 tw={'font-new-york text-2xl ' + align}>{children}</h3>;
         case 'h4':
            return <h4 tw={'font-new-york text-xl ' + align}>{children}</h4>;
         case 'h5':
            return <h5 tw={'font-cabinet text-lg ' + align}>{children}</h5>;
         case 'h6':
            return <h6 tw={'font-cabinet text-base ' + align}>{children}</h6>;
         default:
            return null;
      }
   }
};

export default Heading;
