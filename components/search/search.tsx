'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import BottomNavigation from '../home/bottom_nav/nav';
import Image from 'next/image';
import { fetchBySearch } from '@/data/photo';
import { ImageType } from '@/types';
import { Download, Heart, Plus } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import DownloadButton from './downloadButton';

interface SearchProps {
  title: string;
  desc: string;
  query: string;
  initialData: ImageType[];
}

const calculateColumns = (width: number): number => {
  if (width < 640) return 1;
  if (width < 768) return 2;
  return 3;
};

const splitDataIntoColumns = (data: ImageType[], numColumns: number) => {
  const columns: ImageType[][] = Array.from({ length: numColumns }, () => []);
  data.forEach((item, index) => {
    columns[index % numColumns].push(item);
  });
  return columns;
};

const findIndexOfShortestArray = (array: ImageType[][]) => {
  if (array.length === 0) return -1;

  let minLength = array[0].length;
  let minIndex = 0;

  for (let i = 1; i < array.length; i++) {
    if (array[i].length < minLength) {
      minLength = array[i].length;
      minIndex = i;
    }
  }

  return minIndex;
};

export default function Search({
  title,
  desc,
  query,
  initialData,
}: SearchProps) {
  const [columns, setColumns] = useState<ImageType[][]>([]);
  const skipRef = useRef(1);
  const [hasMore, setHasMore] = useState(true);
  const loader = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // 초기 columns 상태 설정 및 initialData 변경 시 skipRef 초기화
  useEffect(() => {
    const numColumns = calculateColumns(window.innerWidth);
    setColumns(splitDataIntoColumns(initialData, numColumns));
    skipRef.current = 1;
    setHasMore(true);
  }, [initialData]);

  // 반응형 쿼리에 맞춰서 데이터 다시 설정
  useEffect(() => {
    const handleResize = () => {
      const numColumns = calculateColumns(window.innerWidth);
      setColumns(splitDataIntoColumns(columns.flat(), numColumns));
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [columns]);

  const fetchMoreData = useCallback(async () => {
    const newData = (await fetchBySearch(
      query,
      skipRef.current * 10,
      10
    )) as ImageType[];
    if (newData.length === 0) {
      setHasMore(false);
    } else {
      setColumns((prevColumns) => {
        const updatedColumns = [...prevColumns];
        let startIndex = findIndexOfShortestArray(updatedColumns);
        while (newData.length > 0) {
          for (
            let i = startIndex;
            i < updatedColumns.length && newData.length > 0;
            i++
          ) {
            const item = newData.shift();
            if (item) {
              updatedColumns[i].push(item);
            }
          }
          startIndex = 0; // 배열의 끝에 도달했으면 다시 처음으로 돌아가게 설정
        }
        return updatedColumns;
      });
      skipRef.current += 1;
    }
  }, [query]);

  useEffect(() => {
    const currentLoader = loader.current;
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

    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [fetchMoreData, hasMore]);

  return (
    <div className='h-screen w-11/12 max-w-[1200px] mx-auto pt-10 space-y-7'>
      <h1 className='font-bold text-5xl'>{title}</h1>
      <p className='text-2xl'>{desc}</p>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pb-10'>
        {columns.map((column, colIndex) => (
          <div key={colIndex} className='flex flex-col gap-4 relative'>
            {column.map((item) => (
              <Link
                key={item.id}
                href={`${pathname}/${item.id}`}
                className='relative w-full rounded-lg overflow-hidden cursor-zoom-in group'
                style={{ aspectRatio: `${item.width} / ${item.height}` }}
              >
                <Image
                  src={item.urls.regular}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes='(max-width: 400px) 100px,
                       (max-width: 1080px) 200px,
                       300px'
                  alt={item.id}
                />
                <div className='absolute inset-0 bg-[rgba(0,0,0,0.1)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 '>
                  <div className='absolute top-4 right-4 flex gap-2.5'>
                    <button title='이 이미지에 좋아요 표시'>
                      <Heart size='32' className='image-cover-icon' />
                    </button>
                    <button title='이 이미지를 컬렉션에 추가'>
                      <Plus size='32' className='image-cover-icon' />
                    </button>
                  </div>
                  <DownloadButton
                    downloadUrl={item.urls.regular}
                    filename={item.id}
                    className='absolute bottom-4 right-4'
                  >
                    <Download size='32' className='image-cover-icon' />
                  </DownloadButton>
                </div>
              </Link>
            ))}
          </div>
        ))}
      </div>
      <div ref={loader}></div>
      <BottomNavigation />
    </div>
  );
}
