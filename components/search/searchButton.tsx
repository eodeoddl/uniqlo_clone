'use client';

import Link from 'next/link';

export default function SearchButton({
  tagsAndTopics,
}: {
  tagsAndTopics: string[];
}) {
  return (
    <div className='w-full'>
      <span className='text-2xl block mb-2'># 연관 검색어</span>
      <div className='flex flex-wrap gap-2 max-w-full'>
        {tagsAndTopics.map((name) => (
          <Link
            href={`/search?query=${name}`}
            key={name}
            className='text-lg p-1 rounded bg-gray-100 text-gray-800 hover:underline transition duration-150 whitespace-nowrap'
          >
            {name}
          </Link>
        ))}
      </div>
    </div>
  );
}
