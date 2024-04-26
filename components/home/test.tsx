// 'use client';
import { cn } from '@/lib/utils';
import {
  Carousel,
  CarouselContent,
  CarouselDotButton,
  CarouselItem,
} from '../ui/carousel';

export default function Test() {
  return (
    <Carousel orientation='vertical' opts={{ dragFree: true }}>
      <CarouselContent className='h-screen m-0'>
        {Array.from({ length: 5 }).map((_, i) => (
          <CarouselItem
            key={i}
            className={cn(
              i % 2 ? 'bg-slate-700' : 'bg-slate-500',
              'flex items-center justify-center text-5xl font-semibold'
            )}
          >
            {i + 1}
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselDotButton buttonCount={5} />
    </Carousel>
  );
}
