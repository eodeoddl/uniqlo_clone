import type { Metadata } from 'next';
import { Poor_Story } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import React from 'react';

const poor_story = Poor_Story({ subsets: ['latin'], weight: ['400'] });

export const metadata: Metadata = {
  title: 'NextJs Project',
  description: 'Next Js!',
};

export default function RootLayout({
  modal,
  children,
}: Readonly<{
  modal: React.ReactNode;
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={cn(poor_story.className, 'antialiased')}>
        {children}
        {modal}
        <div id='modal-root'></div>
      </body>
    </html>
  );
}
