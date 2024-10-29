import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { keywords } from '@/lib/constance';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function KeyWordCarousel() {
  const [_, setCarouselApi] = useState<CarouselApi>();
  const { push } = useRouter();
  const searchParams = useSearchParams();

  const handleClickItem = (query: string) => {
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set('query', query);
      push(`/search?${params.toString()}`);
    } else {
      params.delete('query');
    }
  };

  return (
    <Carousel setApi={setCarouselApi} className='w-2/3 sm:w-96 mx-auto'>
      <CarouselContent className='gap-4'>
        {keywords.map(({ ko, en }) => (
          <CarouselItem
            key={ko}
            className='min-w-fit basis-0 p-2 rounded-lg border cursor-pointer hover:bg-blue-500'
            onClick={() => handleClickItem(en)}
          >
            {ko}
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
