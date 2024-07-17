import type { Metadata } from 'next';
import { Poor_Story } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import React from 'react';

const poor_story = Poor_Story({ subsets: ['latin'], weight: ['400'] });

export const metadata: Metadata = {
  title: '유니클로 클론 페이지',
  description: 'Next Js를 이용해 유니클로 페이지 클론하기!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={cn(poor_story.className, 'antialiased')}>
        {children}
      </body>
    </html>
  );
}
