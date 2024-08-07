'use client';
import { ShoppingCart, Heart } from 'lucide-react';
import CarouselNav from '../carouselNav';
import Link from 'next/link';
import Image from 'next/image';

export default function TopNavigation() {
  return (
    <>
      {/* Background gradient */}
      <div className='h-[24vh] absolute top-0 left-0 w-full bg-navi-gradient sm:h-[150px]'></div>
      <header className='fixed top-0 left-0 w-full z-50 flex px-4 mt-4 lg:px-40'>
        {/* left nav */}
        <nav className='mr-auto'>
          <Link href='/'>
            <Image src='/logo.svg' alt='UNIQLO 홈' width={40} height={40} />
          </Link>
        </nav>
        {/* right nav */}
        <nav className='flex ml-auto gap-5 items-center'>
          <Link href='/cart'>
            <ShoppingCart
              className='drop-shadow-[1px_1px_1px_black]'
              size={28}
              strokeWidth={1.5}
              stroke='white'
              absoluteStrokeWidth={true}
            />
          </Link>
          <Link href='/'>
            <Heart
              className='drop-shadow-[1px_1px_1px_black]'
              size={28}
              strokeWidth={1.5}
              stroke='white'
              absoluteStrokeWidth={true}
            />
          </Link>
        </nav>
        <CarouselNav />
      </header>
    </>
  );
}
