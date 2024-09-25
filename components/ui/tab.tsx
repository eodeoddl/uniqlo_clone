'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';

type TabProps = {
  tabItems: {
    icons?: React.ReactNode;
    text: string;
    path: string;
  }[];
  basePath: string;
};

export default function TabGroup({ tabItems, basePath }: TabProps) {
  const segment = useSelectedLayoutSegment();
  console.log('segment => ', segment);
  return tabItems.map(({ path, icons, text }) => (
    <Link
      key={path}
      href={path ? basePath + '/' + path : basePath}
      className={cn('text-2xl mx-2', {
        'inline-flex items-center gap-2': !!icons,
        'font-bold': segment === path,
      })}
    >
      {icons && icons}
      {text}
    </Link>
  ));
}
