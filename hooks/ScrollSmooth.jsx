import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Scrollbar from 'smooth-scrollbar';

gsap.registerPlugin(ScrollTrigger);

class DisableScrollPlugin extends Scrollbar.ScrollbarPlugin {
   static pluginName = 'disableScroll';

   static defaultOptions = {
      direction: '',
   };

   transformDelta(delta) {
      if (this.options.direction) {
         delta[this.options.direction] = 0;
      }

      return { ...delta };
   }
}

Scrollbar.use(DisableScrollPlugin);

const setScrollSmooth = (selector, hide = '', disable = '', script = () => {}) => {
   const object = document.querySelector(selector);
   const wrapperScroll = Scrollbar.init(object, {
      smooth: true,
      plugins: {
         disableScroll: {
            direction: disable,
         },
      },
   });

   hide.includes('x') && wrapperScroll.track.xAxis.element.remove();
   hide.includes('y') && wrapperScroll.track.yAxis.element.remove();

   ScrollTrigger.scrollerProxy(object, {
      scrollTop(value) {
         if (arguments.length) {
            wrapperScroll.scrollTop = value;
         }
         script();
         return wrapperScroll.scrollTop;
      },
   });

   wrapperScroll.addListener(ScrollTrigger.update);

   return wrapperScroll;
};

export { setScrollSmooth };
