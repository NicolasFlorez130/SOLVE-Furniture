import tw from 'twin.macro';
import styled from 'styled-components';
import { Button, ChildrenString } from '../types/component_types';

interface Props extends ChildrenString, Button {
   type: 'default' | 'primary' | 'inverse';
}

interface ButtonProps {
   colorScheme: string;
}

const Button_S = styled.button<ButtonProps>`
   ${tw`
      border
      px-8 py-4
      rounded-full 
      whitespace-nowrap
   `}

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
`;

const CommonButton = ({ children, type, onClick }: Props) => {
   return (
      <Button_S onClick={onClick} colorScheme={type}>
         {children.toUpperCase()}
      </Button_S>
   );
};

export default CommonButton;