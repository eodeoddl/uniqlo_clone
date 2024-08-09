'use client';

import { Plus } from 'lucide-react';
import { AlertDialogDescription, AlertDialogTitle } from '../ui/alert-dialog';
import { useState } from 'react';

export default function CollectionsModal() {
  const [isCreating, setIsCreating] = useState(false);
  return (
    <div className='flex flex-col gap-3 w-full h-full p-5 pl-6 sm:font-bold '>
      <AlertDialogTitle className='sm:font-bold sm:text-3xl'>
        컬렉션에 추가
      </AlertDialogTitle>
      <AlertDialogDescription className='hidden'>
        자신만의 컬렉션을 만들어 보세요.
      </AlertDialogDescription>
      <div className='flex justify-between items-center border-dashed	border-2 border-slate-400 p-2 pl-3 rounded-lg sm:text-2xl text-slate-400 cursor-pointer'>
        새 컬렉션 생성
        <Plus />
      </div>
    </div>
  );
}
