'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type TabProps = {
  tabItems: {
    icon: React.ReactNode;
    text: string;
    path: string;
  }[];
  basePath: string;
  className?: string;
};

export default function TabGroup({ tabItems, basePath, className }: TabProps) {
  const pathname = usePathname();
  return tabItems.map(({ path, icon, text }) => {
    const href = path ? basePath + '/' + path : basePath;
    const isActive = href === pathname;
    return (
      <Link
        key={path}
        href={href}
        className={cn(
          'text-2xl mx-2 font-normal text-gray-400 mb-5',
          className,
          {
            'inline-flex items-center gap-2': !!icon,
            'font-bold text-black': isActive,
          }
        )}
      >
        <span
          className={cn({
            'text-black': isActive,
            'text-gray-400': !isActive,
          })}
        >
          {icon}
        </span>
        {text}
      </Link>
    );
  });
}
