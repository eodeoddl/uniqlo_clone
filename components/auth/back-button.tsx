'use client';

import Link from 'next/link';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

// interface BackButtonProps {
//   href?: string;
//   label?: string;
// }
interface BackButtonProps {
  href: string;
  label: string;
}

export default function BackButton({ href, label }: BackButtonProps) {
  // const router = useRouter();
  return (
    <Button variant='link' className='font-normal'>
      <Link href={href}>{label}</Link>
    </Button>
  );
}
