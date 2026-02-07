'use client';

import { AlertDialog, AlertDialogContent } from '../ui/alert-dialog';
import {
  CollectionWithPhotos,
  ImageType,
  PhotoGridFetchFunction,
} from '@/types';
import { Download, Heart, Plus } from 'lucide-react';
import {
  calculateColumns,
  cn,
  findIndexOfShortestArray,
  splitDataIntoColumns,
} from '@/lib/utils';
import { useCallback, useEffect, useRef, useState } from 'react';

import Image from 'next/image';
import LikeButton from './likeButton';
import Link from 'next/link';
import { useAuthCheck } from '@/lib/useAuthCheck';
import { useLikesStore } from '@/store/likeStore';

interface PhotoGridProps<T = any> {
  query: T;
  initialData: ImageType[];
  collections: CollectionWithPhotos[];
  fetchFunction: PhotoGridFetchFunction<T>;
}

export default function PhotoGrid({
  query,
  initialData,
  fetchFunction,
}: PhotoGridProps) {
  const [columns, setColumns] = useState<ImageType[][]>([]);
  const [open, setOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<ImageType | null>(null);
  const skipRef = useRef(1);
  const [hasMore, setHasMore] = useState(true);
  const loader = useRef<HTMLDivElement>(null);
  const authCheck = useAuthCheck();

  const likes = useLikesStore((s) => s.state);
  const pushItems = useLikesStore((s) => s.pushItems);
  const toggleLike = useLikesStore((s) => s.toggleLike);

  useEffect(() => {
    pushItems(initialData);
  }, [initialData, pushItems]);

  // 무한 스크롤 데이터 페칭
  const fetchMoreData = useCallback(async () => {
    const newData = await fetchFunction(query, skipRef.current * 10, 10);

    if (newData.length === 0) {
      setHasMore(false);
    } else {
      pushItems(newData);
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
          startIndex = 0;
        }
        return updatedColumns;
      });
      skipRef.current += 1;
    }
  }, [fetchFunction, pushItems, query]);

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
      setColumns((prev) => splitDataIntoColumns(prev.flat(), numColumns));
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 무한 스크롤 구현
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
      },
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
    <>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pb-10'>
        {columns.map((column, colIndex) => (
          <div key={colIndex} className='flex flex-col gap-4'>
            {column.map((item) => (
              <div
                key={item.id}
                className='relative group cursor-zoom-in rounded-lg overflow-hidden'
                style={{ aspectRatio: `${item.width} / ${item.height}` }}
              >
                <Link
                  href={`/search/${item.id}`}
                  scroll={false}
                  className='relative block w-full h-full'
                >
                  <Image
                    src={item.urls.regular}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes='(max-width: 400px) 200px, (max-width: 1080px) 500px, 1080px'
                    alt={item.id}
                  />
                </Link>
                <div
                  className={cn({
                    'absolute inset-0 bg-[rgba(0,0,0,0.1)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none':
                      columns.length !== 1,
                  })}
                >
                  <div className='absolute top-4 right-4 flex gap-2.5'>
                    <LikeButton
                      liked={likes.get(item.id)?.liked_by_user ?? false}
                      onToggle={(e) => authCheck(e, () => toggleLike(item.id))}
                    />
                    <button
                      className='pointer-events-auto'
                      title='이 이미지를 컬렉션에 추가'
                      onClick={(e) =>
                        authCheck(e, () => {
                          setSelectedPhoto(item);
                          setOpen(true);
                        })
                      }
                    >
                      <Plus size='32' className='image-cover-icon' />
                    </button>
                  </div>
                  <DownloadButton
                    downloadUrl={item.urls.regular}
                    filename={item.id}
                    className='absolute bottom-4 right-4 pointer-events-auto'
                  >
                    <Download size='32' className='image-cover-icon' />
                  </DownloadButton>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div ref={loader}></div>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className='grid grid-cols-1 sm:gap-0 sm:grid-cols-[1fr_2fr] overflow-hidden h-screen w-full sm:w-10/12 lg:w-1/2 sm:h-[60vh] lg:h-[70vh] p-0'>
          {/* <CollectionCreateModal
            session={session}
            selectedPhoto={selectedPhoto}
            collections={collections}
            onClose={() => setOpen(false)}
          /> */}
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

interface ButtonProps {
  downloadUrl: string;
  filename: string;
  children?: React.ReactNode;
  className?: string;
}

export function DownloadButton(props: ButtonProps) {
  const { downloadUrl, filename, children, className } = props;
  const onClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    const image = await fetch(downloadUrl);
    const blob = await image.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    window.URL.revokeObjectURL(url);
  };
  return (
    <button
      onClick={onClick}
      className={className}
      title='이 이미지를 다운로드'
    >
      {children}
    </button>
  );
}
