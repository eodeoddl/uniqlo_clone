'use client';

import { useRouter } from 'next/navigation';

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: 'modal' | 'redirect';
  asChild?: boolean;
}

export default function LoginButton({
  children,
  mode = 'redirect',
}: LoginButtonProps) {
  const router = useRouter();
  const onClick = () => router.push('/auth/login');

  if (mode === 'modal') {
    return <span>TODO : Implement Modal</span>;
  }

  return (
    <span onClick={onClick} className='cursor-pointer inline-block'>
      {children}
    </span>
  );
}
