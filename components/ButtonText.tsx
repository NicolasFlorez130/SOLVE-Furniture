import tw from 'twin.macro';
import { ChildrenString } from './../types/types.d';

interface Props extends ChildrenString {
   arrowPos: 'after' | 'before';
}

interface ArrowProps {
   pos: 'after' | 'before';
}

const Button_S = tw.button`
   grid grid-template-areas['el el']
   items-center gap-x-2
`;

const Arrow = ({ pos }: ArrowProps) => {
   return (
      <svg
         className={pos === 'before' ? 'order-[-1]' : ''}
         width="32"
         height="6"
         viewBox="0 0 32 6"
         fill="none"
         xmlns="http://www.w3.org/2000/svg">
         <rect y="2.5" width="30" height="1" fill="currentColor"></rect>
         <path d="M28 0.5L30.5 3L28 5.5" stroke="currentColor"></path>
      </svg>
   );
};

const ButtonText = ({ children, arrowPos }: Props) => {
   return (
      <Button_S>
         {children.toUpperCase()}
         <Arrow pos={arrowPos} />
      </Button_S>
   );
};

export default ButtonText;
