export interface ChildrenAny {
   children: any;
}

export interface ChildrenString {
   children: string;
}

export interface Button {
   onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
