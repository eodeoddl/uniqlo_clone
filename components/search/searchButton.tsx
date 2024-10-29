'use client';

import Link from 'next/link';

export default function SearchButton({
  tagsAndTopics,
}: {
  tagsAndTopics: string[];
}) {
  return (
    <div className='grid grid-rows-auto gap-1.5'>
      <span className='text-2xl'># 연관 검색어</span>
      <div>
        {tagsAndTopics.map((name) => (
          <Link
            href={`/search?query=${name}`}
            className='mx-2 my-1 text-lg p-1 rounded bg-gray-100 text-gray-800 hover:underline transition duration-150'
            key={name}
          >
            {name}
          </Link>
        ))}
      </div>
    </div>
  );
}
