import tw from 'twin.macro';
import { ChildrenString } from '../types/types';

const Button_S = tw.button`
   bg-transparent
   border border-texts
   px-6
   rounded-full
`;

const ButtonCircle = ({ children }: ChildrenString) => {
   return <Button_S className="aspect-square">{children}</Button_S>;
};

export default ButtonCircle;
