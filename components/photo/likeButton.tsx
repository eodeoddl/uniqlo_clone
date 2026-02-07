'use client';

import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

type Props = {
  liked: boolean;
  onToggle: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
};

export default function LikeButton({ liked, onToggle, className }: Props) {
  return (
    <button
      onClick={onToggle}
      className={cn('pointer-events-auto', className)}
      title='좋아요'
      type='button'
    >
      <Heart
        size={32}
        fill={liked ? 'red' : 'none'}
        className='image-cover-icon'
      />
    </button>
  );
}
