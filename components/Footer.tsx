import tw from 'twin.macro';
import Link from 'next/link';
import styled from 'styled-components';
import { Section } from './styledComponents';

const Footer_S = styled(Section)`
   ${tw`
      p-14 pb-7
      text-center
   `}

   .top {
      ${tw`
         flex justify-around flex-wrap 
         gap-7
         mb-4
      `}

      h3 {
         ${tw`
         text-2xl
      `}
      }

      ul {
         li {
            ${tw`
            mb-4
         `}
         }
      }
   }
`;

const Footer = () => {
   return (
      <Footer_S as="footer">
         <div className="top">
            <ul>
               <li>
                  <h3>SØLVE</h3>
               </li>
               <li>
                  <Link href="/home">HOME</Link>
               </li>
               <li>
                  <Link href="/rooms">ROOMS</Link>
               </li>
            </ul>
            <ul>
               <li>
                  <h3>SHOP</h3>
               </li>
               <li>
                  <Link href="/shop">ALL PRODUCTS</Link>
               </li>
               <li>
                  <Link href="/lookbook">LOOKBOOK</Link>
               </li>
            </ul>
            <ul>
               <li>
                  <h3>SOCIAL</h3>
               </li>
               <li>
                  <Link href="#">INSTAGRAM</Link>
               </li>
               <li>
                  <Link href="#">FACEBOOK</Link>
               </li>
               <li>
                  <Link href="#">TWITTER</Link>
               </li>
            </ul>
         </div>
         <div className="bottom">
            <p>
               Designed by{' '}
               <a href="https://www.behance.net/pawelgola" target="blank">
                  <u>Powel Gola</u>
               </a>
               . Built by{' '}
               <a href="https://github.com/NicolasFlorez130" target="blank">
                  <u>Nicolas</u>
               </a>
               .
            </p>
         </div>
      </Footer_S>
   );
};

export default Footer;
