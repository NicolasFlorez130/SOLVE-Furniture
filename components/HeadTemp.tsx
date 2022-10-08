import Head from 'next/head';
import icon from '../public/favicon.ico';

interface Props {
   children: any;
}

const HeadTemp = ({ children }: Props) => {
   return <Head>{children}</Head>;
};

export default HeadTemp;
