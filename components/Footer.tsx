import tw from 'twin.macro';
import Link from 'next/link';
import styled from 'styled-components';

const Footer_S = styled.div`
   ${tw`
      flex justify-around flex-wrap 
      gap-7
      p-14 pb-7
      text-center
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
`;

const Footer = () => {
   return (
      <Footer_S>
         <ul>
            <li>
               <h3>SØLVE</h3>
            </li>
            <li>
               <Link href="">HOME</Link>
            </li>
            <li>
               <Link href="">ROOMS</Link>
            </li>
            <li>
               <Link href="">JOURNAL</Link>
            </li>
            <li>
               <Link href="">CONTACT</Link>
            </li>
         </ul>
         <ul>
            <li>
               <h3>SHOP</h3>
            </li>
            <li>
               <Link href="">ALL PRODUCTS</Link>
            </li>
            <li>
               <Link href="">LOOKBOOK</Link>
            </li>
            <li>
               <Link href="">FAQ</Link>
            </li>
         </ul>
         <ul>
            <li>
               <h3>SOCIAL</h3>
            </li>
            <li>
               <Link href="">INSTAGRAM</Link>
            </li>
            <li>
               <Link href="">FACEBOOK</Link>
            </li>
            <li>
               <Link href="">TWITTER</Link>
            </li>
         </ul>
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
      </Footer_S>
   );
};

export default Footer;
