import Header from '../components/Header';
import Footer from '../components/Footer';
import { useEffect, useState } from 'react';

interface Layout {
   children: any;
   inHome?: boolean;
   footerLess?: boolean;
}

const Layout = ({ children, inHome = false, footerLess = false }: Layout) => {
   const [visibility, setVisibility] = useState('');

   // setVisibility('h-screen overflow-hidden')

   return (
      <div className={visibility}>
         <Header inHome={inHome} />
         {children}
         {!footerLess && <Footer />}
      </div>
   );
};

export default Layout;
