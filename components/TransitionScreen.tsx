import gsap from 'gsap';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import tw from 'twin.macro';
import { alert } from '../utils/keys';

interface Props {
   children: any;
}

const _transitionScreen = ({ children }: Props) => {
   const router = useRouter();
   const svg = useRef(null);
   const path = useRef(null);

   const initialPaths = {
      first: 'M-23.14,-17.26 C222.35,-12.32 238.71,-14.30 515.24,-12.32 L500.00,0.00 L0.00,0.00 Z',
      second: 'M-13.54,160.37 C227.42,71.55 245.48,73.52 518.06,162.34 L500.00,0.00 L0.00,0.00 Z',
      third: 'M-13.54,160.37 C207.67,161.35 234.76,162.34 518.06,162.34 L500.00,0.00 L0.00,0.00 Z',
   };

   useEffect(() => {
      // function lowerVeil(animate: boolean) {
      //    gsap
      //       .timeline()
      //       .to(svg.current, {
      //          display: 'block',
      //       })
      //       .to(path.current, {
      //          duration: 0.1,
      //          attr: { d: initialPaths.second },
      //          ease: 'power3.in',
      //       })
      //       .to(path.current, {
      //          duration: 0.25,
      //          attr: { d: initialPaths.third },
      //          ease: 'power2.out',
      //       });
      // }

      let animation: any;

      const raiseVeil = () => {
         animation = gsap
            .timeline({ delay: 0.5 })
            .fromTo(
               path.current,
               {
                  attr: { d: initialPaths.third },
               },
               {
                  duration: 0.2,
                  attr: { d: initialPaths.second },
                  ease: 'power3.in',
               }
            )
            .to(path.current, {
               duration: 0.5,
               attr: { d: initialPaths.first },
               ease: 'power2.out',
            })
            .to(svg.current, {
               display: 'none',
            });
      };

      raiseVeil();

      router.events.on('routeChangeComplete', raiseVeil);

      return () => {
         router.events.off('routeChangeComplete', raiseVeil);
         animation.revert();
      };

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);
   return (
      <div>
         <svg
            ref={svg}
            id="transitionSvg"
            tw="h-full text-texts z-30 absolute w-full"
            viewBox="0 0 500 150"
            preserveAspectRatio="none">
            <path fill="currentColor" ref={path} d={initialPaths.third}></path>
         </svg>
         {children}
      </div>
   );
};

export { _transitionScreen as TransitionScreen };
