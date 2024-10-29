'use client';

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '../ui/carousel';
import { ImageGroupType, ImageType } from '@/types';
import React, { TouchEvent, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useThrottle } from '@/lib/useThrottle';

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

  let startX = 0;
  let startY = 0;

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    const diffX = endX - startX;
    const diffY = endY - startY;
    const threshold = 50;

    // 세로 이동보다 가로 이동이 크고 threshold 값을 초과한 경우만 처리
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > threshold) {
      const currentIndex = imageGroup.findIndex(
        ({ name }) => name === currentTab
      );
      const newIndex = diffX > 0 ? currentIndex - 1 : currentIndex + 1;

      if (newIndex >= 0 && newIndex < imageGroup.length) {
        const newTab = imageGroup[newIndex].name;
        router.replace(`/${newTab}`);
      }
    }
  };

  return (
    <Carousel
      setApi={setCarouselpi}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
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
