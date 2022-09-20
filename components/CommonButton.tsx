import tw from 'twin.macro';
import styled from 'styled-components';
import { ChildrenString } from '../types/types';

interface Props extends ChildrenString {
   type: 'default' | 'primary' | 'inverse';
}

interface ButtonProps {
   colorScheme: string;
}

const Button_S = styled.button<ButtonProps>`
   ${tw`px-8 py-4 rounded-full border`}
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

const CommonButton = ({ children, type }: Props) => {
   return <Button_S colorScheme={type}>{children.toUpperCase()}</Button_S>;
};

export default CommonButton;
