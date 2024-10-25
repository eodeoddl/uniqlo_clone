'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function SearchButton({
  tagsAndTopics,
  className,
}: {
  tagsAndTopics: string[];
  className?: string;
}) {
  return (
    <>
      {tagsAndTopics.map((name) => (
        <Link
          href={`/search?query=${name}`}
          className={cn(
            'mx-2 my-1 text-lg p-1 rounded bg-gray-100 text-gray-800 hover:underline transition duration-150',
            className
          )}
          key={name}
        >
          {name}
        </Link>
      ))}
    </>
  );
  // return (
  //   <>
  //     {tagsAndTopics.map((name) => (
  //       <Button
  //         className={cn('mx-3 mt-3 text-lg', className)}
  //         key={name}
  //         onClick={() => handleSearch(name)}
  //       >
  //         {name}
  //       </Button>
  //     ))}
  //   </>
  // );
}
