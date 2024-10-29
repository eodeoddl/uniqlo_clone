'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function SearchButton({
  tagsAndTopics,
  className,
}: {
  tagsAndTopics: string[];
  className?: string;
}) {
  return (
    <div className='grid grid-rows-auto w-full'>
      <span className=''># 연관검색어</span>
      <div>
        {tagsAndTopics.map((keyword) => (
          <Link
            href={`/search?query=${keyword}`}
            className={cn('mx-3 mt-3 text-lg', className)}
            key={keyword}
          >
            {keyword}
          </Link>
        ))}
      </div>
    </div>
  );
}
