import { ChildrenString } from '../types/component_types';

interface Props extends ChildrenString {
   size: '' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
}

const Label = ({ children, size }: Props) => {
   return <div className={`font-new-york text-${size}xl`}>{children}</div>;
};

export default Label;
