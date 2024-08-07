import { Search } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useRef } from 'react';

export default function SearchInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams();
    term ? params.set('query', term) : params.delete('query');
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className='flex items-center w-3/4 md:w-1/2 lg:w-96 h-10 rounded-lg border-2 p-2 mx-auto focus-within:border-blue-500'>
      <Search
        size={20}
        className='w-[10%] h-full cursor-pointer'
        onClick={() => inputRef.current?.focus()}
      />
      <input
        type='text'
        className='w-[90%] outline-none bg-transparent'
        placeholder='키워드로 검색'
        ref={inputRef}
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get('query')?.toString()}
      />
    </div>
  );
}
