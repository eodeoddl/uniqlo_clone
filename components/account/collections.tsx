import { cn } from '@/lib/utils';
import { CollectionWithPhotos } from '@/types';
import { randomUUID } from 'crypto';
import { ImageIcon } from 'lucide-react';
import Image from 'next/image';

export default function UserCollections({
  collections,
}: {
  collections: CollectionWithPhotos[];
}) {
  return (
    <div className='flex flex-wrap gap-3.5 justify-around rounded-md'>
      {collections.map((collection) => {
        const latest3Items = collection.photos.slice(-3);
        if (latest3Items.length < 3) {
          while (latest3Items.length < 3) {
            latest3Items.push({ id: randomUUID() });
          }
        }
        return (
          <div
            key={collection.id}
            className='grid grid-cols-[3fr_1.5fr] min-w-[30%] h-[300px] gap-1'
          >
            {latest3Items.map((item, i) => (
              <div
                key={item.id}
                className={cn('relative', { 'row-span-2': i === 0 })}
              >
                {item.urls ? (
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
          </div>
        );
      })}
    </div>
  );
}
