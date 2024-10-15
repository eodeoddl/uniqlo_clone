import { tabs } from '@/lib/constance';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef } from 'react';

export default function CarouselNav() {
  const pathname = usePathname();
  const currentTab = pathname.split('/')[1] || tabs[0].en;
  const underlineRef = useRef<HTMLDivElement>(null);
  const tabsRefs = useRef<null | Map<string, HTMLAnchorElement>>(null);
  const getTabs = () => {
    if (!tabsRefs.current) tabsRefs.current = new Map();
    return tabsRefs.current;
  };

  const updateIndicatorStyle = useCallback(() => {
    if (!tabsRefs.current || !underlineRef.current) return;
    const currentTabElement = tabsRefs.current.get(currentTab);

    if (currentTabElement) {
      underlineRef.current.style.left = currentTabElement.offsetLeft + 'px';
      underlineRef.current.style.width = currentTabElement.offsetWidth + 'px';
    }
  }, [currentTab]);

  useEffect(() => {
    updateIndicatorStyle();
  }, [updateIndicatorStyle]);

  useEffect(() => {
    window.addEventListener('resize', updateIndicatorStyle);
    return () => {
      window.removeEventListener('resize', updateIndicatorStyle);
    };
  }, [updateIndicatorStyle]);

  return (
    <div className='flex absolute w-full left-0 top-full justify-around mt-4 sm:mt-0 sm:justify-start sm:w-fit sm:top-1/2 sm:-translate-y-1/2 sm:left-1/2 sm:-translate-x-2/4 z-50 gap-6 pb-2 bg-transparent h-full'>
      {tabs.map(({ ko, en }, i) => (
        <Link
          href={`/${en}`}
          ref={(el) => {
            const tabs = getTabs();
            el ? tabs.set(en, el) : tabs.delete(en);
          }}
          key={en}
          className={cn(
            'text-xl sm:text-2xl xl:text-3xl text-white drop-shadow-[1px_1px_1px_black]',
            {
              'font-bold': en === currentTab,
            }
          )}
        >
          {ko}
        </Link>
      ))}
      <div
        ref={underlineRef}
        className='absolute bottom-0 h-0.5 bg-white drop-shadow-[1px_1px_2px_black] transition-all rounded-lg'
      ></div>
    </div>
  );
}
