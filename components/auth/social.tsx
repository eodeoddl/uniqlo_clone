'use client';

import Image from 'next/image';

import GitHubIcon from '../ui/github.svg';
import GoogleIcon from '../ui/google.svg';
import { Button } from '../ui/button';

export default function Social() {
  return (
    <div className='flex items-cneter w-full gap-x-2'>
      <Button size='lg' variant='outline' className='space-x-2'>
        <Image src={GitHubIcon} width={24} height={24} alt='github-logo' />
        <span>GitHub 계정으로 로그인</span>
      </Button>
      <Button size='lg' variant='outline' className='space-x-2'>
        <Image src={GoogleIcon} width={24} height={24} alt='Google-logo' />
        <span>Google 계정으로 로그인</span>
      </Button>
    </div>
  );
}
