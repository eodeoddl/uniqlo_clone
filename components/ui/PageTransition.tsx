// components/PageTransition.tsx
'use client';

import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
  useContext,
  useRef,
} from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

// PageTransitionContext 정의
type PageTransitionContextType = {
  startTransition: (callback: () => void) => void;
};

export const PageTransitionContext = createContext<PageTransitionContextType>({
  startTransition: () => {},
});

// PageTransition 컴포넌트
const PageTransition: React.FC<{
  children: ReactNode;
  onEnter?: string;
  onExit?: string;
  className?: string;
  shouldAnimate?: boolean;
}> = ({ children, className, onEnter, onExit, shouldAnimate = true }) => {
  const [isTransitionEnd, setIsTransitionEnd] = useState(false);
  const [onComplete, setOnComplete] = useState<() => void>(() => {});
  const [isMounted, setIsMounted] = useState(false);
  const animationRef = useRef<HTMLDivElement>(null);

  const startTransition = useCallback(
    (callback: () => void) => {
      if (shouldAnimate) {
        setIsMounted(false);
        setOnComplete(() => callback);
      } else {
        callback();
      }
    },
    [shouldAnimate]
  );

  useEffect(() => {
    if (!isMounted && isTransitionEnd) {
      onComplete();
    }
  }, [isMounted, isTransitionEnd, onComplete]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  console.log(isMounted);
  return (
    <PageTransitionContext.Provider value={{ startTransition }}>
      <div
        ref={animationRef}
        className={cn(
          'transition-all relative overflow-hidden',
          isMounted ? onEnter : onExit,
          className
        )}
        onTransitionEnd={() => setIsTransitionEnd(true)}
      >
        {children}
      </div>
    </PageTransitionContext.Provider>
  );
};

export default PageTransition;

// NaviButton 컴포넌트
type NaviButtonProps = {
  label: string;
  href: string;
  className: string;
};

export const NaviButton: React.FC<NaviButtonProps> = ({
  label,
  href,
  className,
}) => {
  const { startTransition } = useContext(PageTransitionContext);
  const router = useRouter();

  const handleClick = () => {
    startTransition(() => router.push(href));
  };

  return (
    <button onClick={handleClick} className={className}>
      {label}
    </button>
  );
};

// PageContent 컴포넌트
type PageContentProps = {
  children: ReactNode;
};

export const PageContent: React.FC<PageContentProps> = ({ children }) => {
  return <div className='page-content'>{children}</div>;
};
