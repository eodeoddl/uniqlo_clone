'use client';
import { cn } from '@/lib/utils';
import { Home, Search, User, X } from 'lucide-react';
import { useState } from 'react';
import SearchInput from './searchInput';
import KeyWordCarousel from './keywordCarousel';
import { useRouter } from 'next/navigation';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { signOut } from 'next-auth/react';
import { Session } from 'next-auth';

export default function BottomNavigation({
  session,
}: {
  session: Session | null;
}) {
  const [searchActive, setSearchActive] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const { push } = useRouter();

  const handleUserIconClick = () => {
    if (!session) push('/auth/login');
    else setPopoverOpen(true);
  };

  return (
    <div
      className={cn({
        'fixed left-0 bottom-0 bg-white w-full flex flex-col gap-3 pt-4':
          searchActive === true,
      })}
    >
      {searchActive && (
        <>
          <SearchInput />
          <KeyWordCarousel />
        </>
      )}
      <nav
        className={cn(
          'mb-8 min-w-[50%] max-w-md flex items-center justify-between gap-5',
          {
            'fixed bottom-0 left-1/2 -translate-x-1/2': !searchActive,
            'relative mx-auto': searchActive,
          }
        )}
      >
        <div
          className='flex justify-center items-center rounded-full bg-white drop-shadow-[1px_1px_20px_#0000001a] backdrop-blur-md'
          onClick={() => push('/')}
        >
          <Home
            size={56}
            strokeWidth={2}
            absoluteStrokeWidth={true}
            className='p-2 cursor-pointer'
          />
        </div>
        <div
          className='flex justify-center items-center rounded-full bg-white drop-shadow-[1px_1px_20px_#0000001a] backdrop-blur-md'
          onClick={() => setSearchActive((prev) => !prev)}
        >
          {searchActive ? (
            <X
              size={56}
              strokeWidth={2}
              absoluteStrokeWidth={true}
              className='p-2 cursor-pointer'
            />
          ) : (
            <Search
              size={56}
              strokeWidth={2}
              absoluteStrokeWidth={true}
              className='p-2 cursor-pointer'
            />
          )}
        </div>
        <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
          <PopoverTrigger asChild>
            <div
              className='flex justify-center items-center rounded-full bg-white drop-shadow-[1px_1px_20px_#0000001a] backdrop-blur-md'
              onClick={handleUserIconClick}
            >
              <User
                size={56}
                strokeWidth={2}
                absoluteStrokeWidth={true}
                className='p-2 cursor-pointer'
              />
            </div>
          </PopoverTrigger>
          {session && (
            <PopoverContent sideOffset={8}>
              <div className='font-bold'>{session?.user.name}님</div>
              <button onClick={() => signOut()}>로그아웃</button>
            </PopoverContent>
          )}
        </Popover>
      </nav>
    </div>
  );
}
