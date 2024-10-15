import React from 'react';
import Test from '@/components/home/test';

const tabs = ['women', 'men', 'kids', 'baby'];

export async function generateStaticParams() {
  return tabs.map((tab) => ({ tab }));
}

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { tab: string };
}) {
  console.log('layout component re-rendered!', params);
  return (
    <>
      <Test />
      {children}
    </>
  );
}
