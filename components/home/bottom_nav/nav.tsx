'use client';
import { Home, Search, User } from 'lucide-react';
import { useState } from 'react';

export default function BottomNavigation() {
  const [searchActive, setSearchActive] = useState(false);

  return (
    <nav className='fixed bottom-0 left-1/2 -translate-x-1/2 mb-8 w-[40%] max-w-md flex items-center justify-between '>
      <div className='flex justify-center items-center rounded-full bg-white drop-shadow-[1px_1px_20px_#0000001a] backdrop-blur-md'>
        <Home
          size={56}
          strokeWidth={2}
          absoluteStrokeWidth={true}
          className='p-2'
        />
      </div>
      <div className='flex justify-center items-center rounded-full bg-white drop-shadow-[1px_1px_20px_#0000001a] backdrop-blur-md'>
        <Search
          size={56}
          strokeWidth={2}
          absoluteStrokeWidth={true}
          className='p-2'
        />
      </div>
      <div className='flex justify-center items-center rounded-full bg-white drop-shadow-[1px_1px_20px_#0000001a] backdrop-blur-md'>
        <User
          size={56}
          strokeWidth={2}
          absoluteStrokeWidth={true}
          className='p-2'
        />
      </div>
    </nav>
  );
}
