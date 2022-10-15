import styled, { keyframes } from 'styled-components';
import tw from 'twin.macro';
import { Button, ChildrenString } from '../types/component_types';

interface Props extends ChildrenString, ArrowProps, Button {}

interface ArrowProps {
   arrowPos: 'after' | 'before';
}

const arrowMovement = keyframes`
   0%{
      translate: 0 0;
   }

   50%{
      translate: 100% 0;
   }

   50.1%{
      translate: -100% 0;
   }

   100%{
      translate: 0 0;
   }
`;

const Button_S = styled.button`
   ${tw`
      grid grid-cols-[max-content 1fr]
      items-center gap-x-2
   `}

   &:hover {
      svg {
         animation: 0.4s ${arrowMovement} linear;
      }
   }

   svg {
      ${tw`
         relative
      `}
   }
`;

const StyledSvg = tw.svg`
   
`;

const Arrow = ({ arrowPos }: ArrowProps) => {
   return (
      <StyledSvg
         className={arrowPos === 'before' ? 'order-[-1]' : ''}
         width="32"
         height="6"
         viewBox="0 0 32 6"
         fill="none"
         xmlns="http://www.w3.org/2000/svg">
         <rect y="2.5" width="30" height="1" fill="currentColor"></rect>
         <path d="M28 0.5L30.5 3L28 5.5" stroke="currentColor"></path>
      </StyledSvg>
   );
};

const ButtonText = ({ children, arrowPos }: Props) => {
   return (
      <Button_S>
         {children.toUpperCase()}
         <div className="arrowContainer" tw="relative overflow-hidden">
            <Arrow arrowPos={arrowPos} />
         </div>
      </Button_S>
   );
};

export default ButtonText;
