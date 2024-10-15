'use client';

import Link from 'next/link';
import { Button } from '../ui/button';
interface BackButtonProps {
  href: string;
  label: string;
  disabled: boolean;
  replace?: boolean;
}

export default function BackButton({
  href,
  label,
  disabled,
  replace,
}: BackButtonProps) {
  return (
    <Button variant='link' className='font-normal' disabled={disabled}>
      <Link href={href} replace={replace}>
        {label}
      </Link>
    </Button>
  );
}
