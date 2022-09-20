import Header from '../components/Header';
import Footer from '../components/Footer';

interface Layout {
   children: any;
   inHome?: boolean;
}

const Layout = ({ children, inHome = false }: Layout) => {
   return (
      <div>
         <Header inHome={inHome} />
         {children}
         <Footer />
      </div>
   );
};

export default Layout;
