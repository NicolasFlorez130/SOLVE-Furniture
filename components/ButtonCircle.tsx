import styled from 'styled-components';
import tw from 'twin.macro';
import { Button, ChildrenString } from '../types/component_types';

interface Props extends ChildrenString, Button {}

const ButtonContainer = styled.button`
   ${tw`
      overflow-hidden 
      relative
      rounded-full
   `}

   &:hover {
      .topButton {
         transform: rotateX(45deg);
      }

      .botButton {
         transform: rotateX(0deg);
      }
   }

   .button {
      aspect-ratio: 1/1;
      transition: 0.3s;

      ${tw`
         border
         flex items-center
         px-6
         relative
         rounded-full
      `};
   }

   .topButton {
      ${tw`
         bg-transparent border-texts
      `}
   }

   .botButton {
      transform: rotateX(-90deg);

      ${tw`
         absolute 
         bg-texts border-texts text-background
         top-0 left-0 
         origin-bottom
      `}
   }
`;

const Button_S = tw.button`
   
`;

const ButtonCircle = ({ children }: Props) => {
   return (
      <ButtonContainer>
         <div className="button topButton">{children}</div>
         <div className="button botButton">{children}</div>
      </ButtonContainer>
   );
};

export default ButtonCircle;
