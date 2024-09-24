'use client';

import { cn } from '@/lib/utils';
import { CollectionWithPhotos } from '@/types';
import { ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { Photo } from '@prisma/client';
import Link from 'next/link';

export default function UserCollections({
  collections,
}: {
  collections: CollectionWithPhotos[];
}) {
  return (
    <div className='flex flex-wrap flex-col sm:flex-row gap-5 justify-around rounded-md mx-auto w-[95%]'>
      {collections.map((collection) => {
        const latest3Items: (Photo | null)[] = collection.photos.slice(-3);
        if (latest3Items.length < 3) {
          Array.from({ length: 3 - latest3Items.length }, () =>
            latest3Items.push(null)
          );
        }
        return (
          <div key={collection.id} className='min-w-[30%]'>
            <Link
              className='relative group grid grid-cols-[3fr_1.5fr] grid-rows-2 gap-1 h-[300px]'
              href={`/collection/${collection.id}`}
            >
              {latest3Items.map((item, i) => (
                <div
                  key={item?.id || i}
                  className={cn('relative', {
                    'row-span-2': i === 0,
                    'row-span-1': i !== 0,
                  })}
                >
                  {item ? (
                    <Image
                      alt={item.alternative_slugs?.ko!}
                      src={item.urls.regular}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  ) : (
                    <div className='bg-gray-200 w-full h-full flex justify-center items-center'>
                      <ImageIcon className='text-gray-300 w-10 h-10' />
                    </div>
                  )}
                </div>
              ))}
              <div className='absolute inset-0 bg-transparent group-hover:bg-white group-hover:opacity-30'></div>
            </Link>
            <div className='col-span-2'>
              <h2 className='font-bold text-2xl'>{collection.title}</h2>
              <span className='text-gray-400'>
                {collection.photos.length}개의 사진
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
