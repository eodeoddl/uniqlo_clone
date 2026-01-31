'use client';

import { Home, Search, User, X } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import KeyWordCarousel from './keywordCarousel';
import SearchInput from './searchInput';
import { cn } from '@/lib/utils';

export default function BottomNavigation() {
  const [searchActive, setSearchActive] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const { push } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.toString();
  const { data: session, status } = useSession();

  // if (status === 'loading') return null;

  const handleUserIconClick = () => {
    if (!session) push('/auth/login');
    else setPopoverOpen(true);
  };

  useEffect(() => {
    if (status === 'loading') return;
    setSearchActive(false);
  }, [pathname, searchQuery, status]);

  return (
    <div
      className={cn({
        'fixed left-0 bottom-0 bg-white w-full flex flex-col gap-3 pt-4':
          searchActive,
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
          },
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
            <PopoverContent
              sideOffset={8}
              className='flex flex-col items-start gap-3'
            >
              <button onClick={() => push('/account/profile')}>
                프로필 보기
              </button>
              <button onClick={() => push('/account/settings')}>
                계정 설정
              </button>
              <button onClick={() => signOut()}>
                <span className='font-bold mr-2'>{session?.user.name}님</span>
                로그아웃
              </button>
            </PopoverContent>
          )}
        </Popover>
      </nav>
    </div>
  );
}
