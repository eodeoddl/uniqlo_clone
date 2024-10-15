'use client';

import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

export default function SearchButton({
  tagsAndTopics,
  className,
}: {
  tagsAndTopics: string[];
  className?: string;
}) {
  const { push } = useRouter();
  const handleSearch = (keyword: string) => {
    push(`/search?query=${keyword}`);
  };
  return (
    <>
      {tagsAndTopics.map((name) => (
        <Button
          className={cn('mx-3 mt-3 text-lg', className)}
          key={name}
          onClick={() => handleSearch(name)}
        >
          {name}
        </Button>
      ))}
    </>
  );
}
