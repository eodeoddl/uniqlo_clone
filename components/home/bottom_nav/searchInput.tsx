'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { Search } from 'lucide-react';

export default function SearchInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const [inputValue, setInputValue] = useState(
    searchParams.get('query')?.toString() || '',
  );

  const handleSubmit = () => {
    const params = new URLSearchParams();
    inputValue ? params.set('query', inputValue) : params.delete('query');
    replace(`/search?${params.toString()}`);
  };

  useEffect(() => {
    const query = searchParams.get('query')?.toString() || '';
    setInputValue(query);
  }, [searchParams]);

  return (
    <div className='flex items-center w-3/4 md:w-1/2 lg:w-96 h-10 rounded-lg border-2 p-2 mx-auto focus-within:border-blue-500'>
      <Search
        size={20}
        className='w-[10%] h-full cursor-pointer'
        onClick={() => handleSubmit()}
      />
      <input
        type='text'
        className='w-[90%] outline-none bg-transparent'
        placeholder='키워드로 검색'
        ref={inputRef}
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
      />
    </div>
  );
}
