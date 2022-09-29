// import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import gsap from 'gsap';
import dynamic from 'next/dynamic';
const ScrollTrigger = dynamic(() => import('gsap/ScrollTrigger'), { ssr: false });
import Scrollbar from 'smooth-scrollbar';

gsap.registerPlugin(ScrollTrigger);

const smoothScrollbar = (selector, hide = '', disable = '', script = () => {}) => {
   const object = document.querySelector(selector);
   Scrollbar.init(object);
};

export default smoothScrollbar;
