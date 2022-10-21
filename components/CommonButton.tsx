import tw from 'twin.macro';
import styled from 'styled-components';
import { Button, ChildrenString } from '../types/component_types';
import { forwardRef } from 'react';

interface Props extends ChildrenString, Button {
   type: 'default' | 'primary' | 'inverse';
}

interface ButtonProps {
   colorScheme: string;
}

const ButtonContainer = styled.button<ButtonProps>`
   ${tw`
      overflow-hidden
      relative
      rounded-full 
      w-max
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
      height: min-content;
      transition: 0.3s;

      ${tw`
         border
         flex-none
         origin-bottom
         px-8 py-4
         rounded-full 
         text-center
         whitespace-nowrap
      `}
   }

   .topButton {
      ${({ colorScheme }) => {
         switch (colorScheme) {
            case 'default':
               return tw`bg-transparent border-texts text-texts`;
            case 'primary':
               return tw`bg-texts border-texts text-titles`;
            default:
               return tw`bg-transparent border-titles text-titles`;
         }
      }}
   }

   .botButton {
      transform: rotateX(-90deg);

      ${tw`
         absolute
         top-0
      `}

      ${({ colorScheme }) => {
         switch (colorScheme) {
            case 'default':
               return tw`bg-texts border-texts text-background`;
            case 'primary':
               return tw`bg-titles border-texts text-texts`;
            default:
               return tw`bg-background border-background text-texts`;
         }
      }}
   }
`;

const CommonButton = ({ children, type, onClick }: Props) => {
   return (
      <ButtonContainer className="commonButton" colorScheme={type} onClick={onClick}>
         <div className="button topButton">{children.toUpperCase()}</div>
         <div className="button botButton">{children.toUpperCase()}</div>
      </ButtonContainer>
   );
};

export default CommonButton;
