import { CarouselResponsiveOptions } from 'primeng/carousel';
import { WidthBreakpoint } from '../../../shared/types';

export const CAROUSEL_RESPONSIVE_OPTIONS: CarouselResponsiveOptions[] = [
  {
    breakpoint: WidthBreakpoint.SMALL,
    numVisible: 1,
    numScroll: 1,
  },
  {
    breakpoint: WidthBreakpoint.LARGE,
    numVisible: 2,
    numScroll: 1,
  },
  {
    breakpoint: WidthBreakpoint.XX_LARGE,
    numVisible: 3,
    numScroll: 1,
  },
  {
    breakpoint: '9999px', // > XX_LARGE
    numVisible: 4,
    numScroll: 1,
  },
];
