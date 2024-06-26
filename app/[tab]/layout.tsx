import Test from '@/components/home/test';
import React from 'react';

const tabs = ['women', 'men', 'kids', 'baby'];

export async function generateStaticParams() {
  return tabs.map((tab) => ({ tab }));
}

function Layout({
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

export default React.memo(Layout);
