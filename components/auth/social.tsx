'use client';

import Image from 'next/image';
import { signIn } from 'next-auth/react';

import GitHubIcon from '../ui/github.svg';
import GoogleIcon from '../ui/google.svg';
import { Button } from '../ui/button';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';

export default function Social() {
  const onClick = (provider: 'github' | 'google') => {
    signIn(provider, { callbackUrl: DEFAULT_LOGIN_REDIRECT });
  };
  return (
    <div className='flex flex-col sm:flex-row items-cneter justify-center w-full gap-2'>
      <Button
        size='lg'
        variant='outline'
        className='space-x-2'
        onClick={() => onClick('github')}
      >
        <Image src={GitHubIcon} width={24} height={24} alt='github-logo' />
        <span>GitHub 계정으로 로그인</span>
      </Button>
      <Button
        size='lg'
        variant='outline'
        className='space-x-2'
        onClick={() => onClick('google')}
      >
        <Image src={GoogleIcon} width={24} height={24} alt='Google-logo' />
        <span>Google 계정으로 로그인</span>
      </Button>
    </div>
  );
}
