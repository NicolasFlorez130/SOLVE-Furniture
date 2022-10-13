import Header from './Header';
import Footer from './Footer';
import { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import tw from 'twin.macro';
import Cart from './Cart';
import gsap from 'gsap';
import { useRouter } from 'next/router';

interface Layout {
   children: any;
   inHome?: boolean;
   footerLess?: boolean;
}

const Layout = ({ children, inHome = false, footerLess = false }: Layout) => {
   const router = useRouter();

   const [visibility, setVisibility] = useState('');
   const container = useRef(null);

   const changeVisibility = useCallback((value: 'open' | 'close') => {
      setVisibility(value == 'open' ? 'h-screen overflow-hidden' : '');
   }, []);

   const toggleCart = useCallback((value: 'open' | 'close') => {
      changeVisibility(value);

      if (value === 'open') {
         gsap.to('#cartVeil', { duration: 0.2, display: 'block', opacity: 0.4 });

         gsap.fromTo(
            '.cart',
            {
               display: 'grid',
               xPercent: 100,
            },
            { xPercent: 0, duration: 0.5, ease: 'power2.in' }
         );
      } else {
         gsap.to('.cart', {
            xPercent: 100,
            duration: 0.5,
            ease: 'power2.in',
            onComplete: () => {
               gsap.to('.cart', { display: 'none' });
            },
         });

         gsap.to('#cartVeil', {
            duration: 0.2,
            opacity: 0,
            onComplete: () => {
               gsap.to('#cartVeil', { display: 'none' });
            },
         });
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   useEffect(() => {
      router.events.on('routeChangeStart', () => {
         toggleCart('close');
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return (
      <div ref={container} tw="relative overflow-x-hidden" className={visibility}>
         <Cart closeHandler={toggleCart} />
         <Header changeVisibility={changeVisibility} inHome={inHome} cartHandler={toggleCart} />
         <main>{children}</main>
         {!footerLess && <Footer />}
      </div>
   );
};

export default Layout;
