'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import BottomNavigation from '../home/bottom_nav/nav';
import Image from 'next/image';
import { fetchBySearch } from '@/data/photo';
import { CollectionWithPhotos, ImageType } from '@/types';
import { Download, Heart, Plus } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import DownloadButton from './downloadButton';
import { Session } from 'next-auth';
import {
  calculateColumns,
  cn,
  findIndexOfShortestArray,
  splitDataIntoColumns,
} from '@/lib/utils';
import clickLike from '@/actions/handleLike';
import useStateManager from '@/lib/useStateManager';
import { AlertDialog, AlertDialogContent } from '../ui/alert-dialog';
import CollectionsModal from '../collections/collections-modal';

interface SearchProps {
  title: string;
  desc: string;
  query: string;
  initialData: ImageType[];
  session: Session | null;
  collections: CollectionWithPhotos[];
}

export default function Search({
  title,
  desc,
  query,
  initialData,
  session,
  collections,
}: SearchProps) {
  const { state, handleStateChange, handlePushState, getUpdateQueue } =
    useStateManager<ImageType>(initialData);
  const [columns, setColumns] = useState<ImageType[][]>([]);
  const [open, setOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<ImageType | null>(null);
  const skipRef = useRef(1);
  const [hasMore, setHasMore] = useState(true);
  const loader = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  // 무한스크롤 데이터 페칭
  const fetchMoreData = useCallback(async () => {
    const newData = (await fetchBySearch(
      query,
      skipRef.current * 10,
      10
    )) as ImageType[];

    if (newData.length === 0) {
      setHasMore(false);
    } else {
      handlePushState(newData);
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
  }, [handlePushState, query]);

  // 사용자 로그인 체크 헬퍼함수
  const handleAuthCheck = (
    e: React.MouseEvent<HTMLButtonElement>,
    callback: () => void
  ) => {
    e.stopPropagation();
    e.preventDefault();

    if (!session) router.push('/auth/login');
    else callback();
  };

  // Like UI 업데이트 값계산
  const getLikedByUser = (item: ImageType) => {
    return state.get(item.id)?.liked_by_user ?? item.liked_by_user;
  };

  // Collection 추가 버튼
  const handleCollectionButton = (item: ImageType) => {
    setSelectedPhoto(item);
    setOpen((prev) => !prev);
  };

  // Like상태 서버측 업데이트
  useEffect(() => {
    if (!session) return;
    const idsToUpdate = getUpdateQueue();
    idsToUpdate.forEach((id) => clickLike(id, session.user.id!));
  }, [getUpdateQueue, session, state]);

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

  // 무한스크롤 구현
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
          <div key={colIndex} className='flex flex-col gap-4'>
            {column.map((item) => (
              <div
                key={item.id}
                className='relative group cursor-zoom-in rounded-lg overflow-hidden'
                style={{ aspectRatio: `${item.width} / ${item.height}` }}
              >
                <Link href={`${pathname}/${item.id}`}>
                  <Image
                    src={item.urls.regular}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes='(max-width: 400px) 200px,
                       (max-width: 1080px) 500px,
                       1080px'
                    alt={item.id}
                  />
                </Link>
                <div
                  className={cn(
                    columns.length === 1
                      ? ''
                      : 'absolute inset-0 bg-[rgba(0,0,0,0.1)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none'
                  )}
                >
                  <div className='absolute top-4 right-4 flex gap-2.5 pointer-events-auto'>
                    <button
                      title='이 이미지에 좋아요 표시'
                      onClick={(e) =>
                        handleAuthCheck(e, () =>
                          handleStateChange(item.id, {
                            liked_by_user: !getLikedByUser(item),
                          })
                        )
                      }
                    >
                      <Heart
                        size='32'
                        fill={getLikedByUser(item) ? 'red' : 'none'}
                        className='image-cover-icon'
                      />
                    </button>
                    <button
                      title='이 이미지를 컬렉션에 추가'
                      onClick={(e) =>
                        handleAuthCheck(e, () => handleCollectionButton(item))
                      }
                    >
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
              </div>
            ))}
          </div>
        ))}
      </div>
      <div ref={loader}></div>
      <BottomNavigation session={session} />
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className='grid grid-cols-1 sm:gap-0 sm:grid-cols-[1fr_2fr] overflow-hidden h-screen w-full sm:w-10/12 lg:w-1/2 sm:h-[60vh] lg:h-[70vh] p-0'>
          <CollectionsModal
            session={session}
            selectedPhoto={selectedPhoto}
            collections={collections}
            onClose={() => setOpen(false)}
          />
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
