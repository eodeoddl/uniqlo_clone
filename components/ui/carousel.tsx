'use client';

import * as React from 'react';
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from 'embla-carousel-react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useThrottle } from '@/lib/useThrottle';

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: 'horizontal' | 'vertical';
  setApi?: (api: CarouselApi) => void;
  enableWheel?: boolean;
};

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  onDotButtonClick: (index: number) => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  // currentSnap: number;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);

  if (!context) {
    throw new Error('useCarousel must be used within a <Carousel />');
  }

  return context;
}

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      orientation = 'horizontal',
      opts,
      setApi,
      plugins,
      className,
      children,
      enableWheel = false,
      ...props
    },
    ref
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === 'horizontal' ? 'x' : 'y',
      },
      plugins
    );
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);
    // const [currentSnap, setCurrentSnap] = React.useState(0);

    const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) {
        return;
      }
      // setCurrentSnap(api.selectedScrollSnap());
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    }, []);

    const onDotButtonClick = React.useCallback(
      (index: number) => {
        if (!api) return;
        api.scrollTo(index);
      },
      [api]
    );

    const handleOnWheel = useThrottle(
      (event: React.WheelEvent<HTMLDivElement>) => {
        const threshold = 2;
        if (Math.abs(event.deltaY) > threshold) {
          event.deltaY > 0 ? scrollNext() : scrollPrev();
        }
      }
    );

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev();
    }, [api]);

    const scrollNext = React.useCallback(() => {
      api?.scrollNext();
    }, [api]);

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'ArrowLeft') {
          event.preventDefault();
          scrollPrev();
        } else if (event.key === 'ArrowRight') {
          event.preventDefault();
          scrollNext();
        }
      },
      [scrollPrev, scrollNext]
    );

    React.useEffect(() => {
      if (!api || !setApi) {
        return;
      }

      setApi(api);
    }, [api, setApi]);

    React.useEffect(() => {
      if (!api) {
        return;
      }

      onSelect(api);
      api.on('reInit', onSelect);
      api.on('select', onSelect);

      return () => {
        api?.off('select', onSelect);
      };
    }, [api, onSelect]);

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          opts,
          orientation:
            orientation || (opts?.axis === 'y' ? 'vertical' : 'horizontal'),
          scrollPrev,
          scrollNext,
          onDotButtonClick,
          canScrollPrev,
          canScrollNext,
          // currentSnap,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          onWheelCapture={enableWheel ? handleOnWheel : undefined}
          className={cn('relative', className)}
          role='region'
          aria-roledescription='carousel'
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  }
);
Carousel.displayName = 'Carousel';

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div ref={carouselRef} className='overflow-hidden'>
      <div
        ref={ref}
        className={cn(
          'flex',
          orientation === 'horizontal' ? '-ml-4' : '-mt-4 flex-col',
          className
        )}
        {...props}
      />
    </div>
  );
});
CarouselContent.displayName = 'CarouselContent';

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel();

  return (
    <div
      ref={ref}
      role='group'
      aria-roledescription='slide'
      className={cn(
        'min-w-0 shrink-0 grow-0 basis-full',
        orientation === 'horizontal' ? 'pl-4' : 'pt-4',
        className
      )}
      {...props}
    />
  );
});
CarouselItem.displayName = 'CarouselItem';

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = 'outline', size = 'icon', ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        'absolute  h-8 w-8 rounded-full',
        orientation === 'horizontal'
          ? '-left-12 top-1/2 -translate-y-1/2'
          : '-top-12 left-1/2 -translate-x-1/2 rotate-90',
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft className='h-4 w-4' />
      <span className='sr-only'>Previous slide</span>
    </Button>
  );
});
CarouselPrevious.displayName = 'CarouselPrevious';

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = 'outline', size = 'icon', ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel();

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        'absolute h-8 w-8 rounded-full',
        orientation === 'horizontal'
          ? '-right-12 top-1/2 -translate-y-1/2'
          : '-bottom-12 left-1/2 -translate-x-1/2 rotate-90',
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight className='h-4 w-4' />
      <span className='sr-only'>Next slide</span>
    </Button>
  );
});
CarouselNext.displayName = 'CarouselNext';

// type DotButtonProps = {
//   buttonCount: number;
//   position: 'top' | 'bottom' | 'left' | 'right';
//   children?: React.ReactNode;
// };

// const CarouselDotButton = React.forwardRef<
//   HTMLDivElement,
//   React.HTMLAttributes<HTMLDivElement> & DotButtonProps
// >(({ className, buttonCount, position, children, ...props }, ref) => {
//   const { orientation, currentSnap, onDotButtonClick } = useCarousel();

//   return (
//     <div
//       ref={ref}
//       className={cn(
//         'absolute flex gap-3 p-3 justify-center',
//         {
//           'left-0 top-0 w-full': position === 'top',
//           'left-0 top-0 h-screen': position === 'left',
//           'left-0 bottom-0 w-full': position === 'bottom',
//           'right-0 top-0 h-screen': position === 'right',
//           'flex-col': orientation === 'vertical',
//         },
//         className
//       )}
//       {...props}
//     >
//       {Array.from({ length: buttonCount }).map((_, i) => (
//         <button
//           key={i}
//           className={cn(
//             'rounded-full transition-all duration-300',
//             {
//               'w-3 h-3': currentSnap !== i,
//               'w-8': currentSnap === i && orientation === 'horizontal',
//               'h-8': currentSnap === i && orientation === 'vertical',
//             },
//             currentSnap !== i ? 'bg-gray-200' : 'bg-blue-500'
//           )}
//           onClick={() => onDotButtonClick(i)}
//         />
//       ))}
//     </div>
//   );
// });

// CarouselDotButton.displayName = 'CarouselDotButton';

// type ButtonContainerProps = {
//   position?: 'top' | 'bottom' | 'left' | 'right';
//   contents: Array<React.ReactNode>;
//   currentTab: string;
// };

// const CarouselButtonContainer = React.forwardRef<
//   HTMLDivElement,
//   React.HtmlHTMLAttributes<HTMLDivElement> & ButtonContainerProps
// >(({ className, position, contents, currentTab, ...props }, ref) => {
//   const { orientation, currentSnap, onDotButtonClick } = useCarousel();
//   const [indicatorStyle, setIndicatorStyle] = React.useState({
//     left: '0px',
//     width: '0px',
//   });
//   const buttonRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
//   const router = useRouter();

//   const updateIndicatorStyle = React.useCallback(() => {
//     const currentIndex = contents.findIndex((node) => node === currentTab);
//     if (currentIndex !== -1 && buttonRefs.current[currentIndex]) {
//       const currentButton = buttonRefs.current[currentIndex];
//       setIndicatorStyle({
//         left: `${currentButton!.offsetLeft}px`,
//         width: `${currentButton!.offsetWidth}px`,
//       });
//     }
//     // if (buttonRefs.current[currentIndex]) {
//     //   const currentButton = buttonRefs.current[currentIndex];
//     //   setIndicatorStyle({
//     //     left: `${currentButton!.offsetLeft}px`,
//     //     width: `${currentButton!.offsetWidth}px`,
//     //   });
//     // }
//     // if (buttonRefs.current[currentSnap]) {
//     //   const currentButton = buttonRefs.current[currentSnap];
//     //   setIndicatorStyle({
//     //     left: `${currentButton!.offsetLeft}px`,
//     //     width: `${currentButton!.offsetWidth}px`,
//     //   });
//     // }
//   }, [contents, currentTab]);

//   React.useEffect(() => {
//     updateIndicatorStyle();
//   }, [updateIndicatorStyle, currentTab]);

//   React.useEffect(() => {
//     const handleResize = () => updateIndicatorStyle();
//     window.addEventListener('resize', handleResize);
//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, [updateIndicatorStyle]);

//   return (
//     <div
//       ref={ref}
//       className={cn(
//         'flex gap-3 justify-center',
//         {
//           absolute: position !== undefined,
//           'left-0 top-0 w-full': position === 'top',
//           'left-0 top-0 h-screen': position === 'left',
//           'left-0 bottom-0 w-full': position === 'bottom',
//           'right-0 top-0 h-screen': position === 'right',
//           'flex-col': orientation === 'vertical',
//         },
//         className
//       )}
//       {...props}
//     >
//       <div
//         className='absolute rounded-sm bottom-0 left-0 h-1 bg-blue-500 transition-all duration-300'
//         style={indicatorStyle}
//       />
//       {contents.map((node, i) => (
//         <button
//           key={i}
//           ref={(el) => {
//             buttonRefs.current[i] = el;
//           }}
//           onClick={() => {
//             onDotButtonClick(i);
//             setIndicatorStyle({
//               left: `${buttonRefs.current[i]?.offsetLeft}px`,
//               width: `${buttonRefs.current[i]?.offsetWidth}px`,
//             });
//             router.push(`/${node}`);
//           }}
//           className={cn(
//             currentSnap === i
//               ? 'text-blue-500 font-bold'
//               : 'text-white font-normal',
//             'text-2xl relative'
//           )}
//         >
//           {node}
//         </button>
//       ))}
//     </div>
//   );
// });

// CarouselButtonContainer.displayName = 'CarouselButtonContainer';

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  // CarouselDotButton,
  // CarouselButtonContainer,
};
