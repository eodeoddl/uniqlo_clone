import { useState, useEffect, useRef, useCallback } from 'react';

interface InfiniteScrollOptions<T> {
  fetchFunction: (skip: number, limit: number) => Promise<T[]>;
  initialData: T[];
  limit?: number;
}

export default function useInfiniteScroll<T>({
  fetchFunction,
  initialData,
  limit = 10,
}: InfiniteScrollOptions<T>) {
  const [data, setData] = useState<T[]>(initialData);
  const [hasMore, setHasMore] = useState(true);
  const skipRef = useRef(initialData.length / limit);
  const loaderRef = useRef<HTMLDivElement>(null);

  const fetchMoreData = useCallback(async () => {
    const newData = await fetchFunction(skipRef.current * limit, limit);
    if (newData.length === 0) {
      setHasMore(false);
    } else {
      setData((prevData) => [...prevData, ...newData]);
      skipRef.current += 1;
    }
  }, [fetchFunction, limit]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchMoreData();
        }
      },
      {
        root: null,
        rootMargin: '500px',
        threshold: 1.0,
      }
    );

    const currentLoader = loaderRef.current;
    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [fetchMoreData, hasMore]);

  return {
    data,
    hasMore,
    loaderRef,
  };
}
