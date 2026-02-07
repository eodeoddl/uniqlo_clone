'use client';

import { Button } from '../ui/button';
import GitHubIcon from '../ui/github.svg';
import GoogleIcon from '../ui/google.svg';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

export default function Social({ isSubmitting }: { isSubmitting: boolean }) {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || window.location.href;
  const onClick = (provider: 'github' | 'google') => {
    signIn(provider, {
      callbackUrl: callbackUrl.includes('/auth/login') ? '/' : callbackUrl,
    });
  };
  return (
    <div className='flex flex-col sm:flex-row items-cneter justify-center w-full gap-2'>
      <Button
        size='lg'
        variant='outline'
        className='space-x-2'
        onClick={() => onClick('github')}
        disabled={isSubmitting}
      >
        <Image src={GitHubIcon} width={24} height={24} alt='github-logo' />
        <span>GitHub 계정으로 로그인</span>
      </Button>
      <Button
        size='lg'
        variant='outline'
        className='space-x-2'
        onClick={() => onClick('google')}
        disabled={isSubmitting}
      >
        <Image src={GoogleIcon} width={24} height={24} alt='Google-logo' />
        <span>Google 계정으로 로그인</span>
      </Button>
    </div>
  );
}
