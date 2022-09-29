import tw from 'twin.macro';
import { Button, ChildrenString } from '../types/component_types';

interface Props extends ChildrenString, Button {}

const Button_S = tw.button`
   bg-transparent
   border border-texts
   px-6
   rounded-full
`;

const ButtonCircle = ({ children }: Props) => {
   return <Button_S className="aspect-square">{children}</Button_S>;
};

export default ButtonCircle;
