export const mapRange = (v: number, min: number, max: number, newMin: number, newMax: number) => {
   if (v <= min) {
      return newMin;
   }

   if (v >= max) {
      return newMax;
   }

   v -= min;
   max -= min;

   const percentage = (v / max) * 100;
   const newStep = (newMax - newMin) / 100;

   return percentage * newStep + newMin;
};
