'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '../ui/carousel';
import { useThrottle } from '@/lib/useThrottle';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { ImageGroupType, ImageType } from '@/types';

interface ImageCarouselProps {
  imageGroup: ImageGroupType[];
}

export default function ImageCarousel({ imageGroup }: ImageCarouselProps) {
  const pathname = usePathname();
  const [carouselApi, setCarouselpi] = useState<CarouselApi>();
  const currentTab = pathname.split('/')[1] || imageGroup[0].name;
  const router = useRouter();

  useEffect(() => {
    const index = imageGroup.findIndex(({ name }) => name === currentTab);
    if (carouselApi && index !== -1) {
      carouselApi.scrollTo(index);
    }
  }, [carouselApi, currentTab, imageGroup]);

  const handleTouchEnd = (direction: 'next' | 'prev') => {
    const currentIndex = imageGroup.findIndex(
      ({ name }) => name === currentTab
    );
    let newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;

    // 경로 업데이트
    if (newIndex >= 0 && newIndex < imageGroup.length) {
      const newTab = imageGroup[newIndex].name;
      router.push(`/${newTab}`);
    }
  };

  return (
    <Carousel
      setApi={setCarouselpi}
      opts={{ skipSnaps: false }}
      onTouchEnd={(e) => {
        if (e.changedTouches[0].clientX < window.innerWidth / 2) {
          handleTouchEnd('next');
        } else {
          handleTouchEnd('prev');
        }
      }}
    >
      <CarouselContent className='h-screen'>
        {imageGroup.map(({ name, images }) => (
          <CarouselItem
            key={name}
            className='flex-none w-full h-full flex items-center justify-center'
          >
            <VerticalCarousel images={images} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

const VerticalCarousel = ({ images }: { images: ImageType[] }) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleOnWheel = useThrottle(
    (event: React.WheelEvent<HTMLDivElement>) => {
      const threshold = 2;
      if (carouselApi) {
        if (Math.abs(event.deltaY) > threshold) {
          event.deltaY > 0
            ? carouselApi.scrollNext()
            : carouselApi.scrollPrev();
        }
      }
    },
    1000
  );

  useEffect(() => {
    if (carouselApi) {
      const onSelect = () => setCurrentIndex(carouselApi.selectedScrollSnap());
      carouselApi.on('select', onSelect);
      return () => {
        carouselApi.off('select', onSelect);
      };
    }
  }, [carouselApi]);

  return (
    <Carousel
      orientation='vertical'
      opts={{ loop: true }}
      setApi={setCarouselApi}
      onWheel={handleOnWheel}
      className='relative w-full h-screen'
    >
      <CarouselContent className='h-screen'>
        {images.map((image, i) => (
          <CarouselItem
            key={i}
            className='flex-none w-full h-full flex items-center justify-center'
          >
            <div className='w-full h-full relative'>
              <Image
                src={image.urls.raw}
                alt={image.description || 'Image'}
                sizes='(max-width: 400px) 400px,
                       (max-width: 1080px) 1080px,
                       2000px'
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className='absolute top-1/2 right-0 transform -translate-y-1/2 flex flex-col items-center gap-2 p-4'>
        {images.map((_, index) => (
          <button
            key={index}
            className={cn(
              'transition-all duration-300 rounded-full bg-white drop-shadow-[1px_1px_2px_#00000080]',
              {
                'w-3 h-12': currentIndex === index,
                'w-3 h-3': currentIndex !== index,
              }
            )}
            onClick={() => carouselApi?.scrollTo(index)}
          />
        ))}
      </div>
    </Carousel>
  );
};
