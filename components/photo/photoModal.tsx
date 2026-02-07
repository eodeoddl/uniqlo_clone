'use client';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { ChevronDown, Plus, X } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { DownloadButton } from '@/components/photo/photoGrid';
import Image from 'next/image';
import { ImageType } from '@/types';
import LikeButton from './likeButton';
import SearchButton from '@/components/search/searchButton';
import { useAuthCheck } from '@/lib/useAuthCheck';
import { useLikesStore } from '@/store/likeStore';

type Props = { photo: ImageType; tagsAndTopics: string[] };

export default function PhotoModal({ photo, tagsAndTopics }: Props) {
  const authCheck = useAuthCheck();
  const likes = useLikesStore((s) => s.state);
  const toggleLike = useLikesStore((s) => s.toggleLike);

  return (
    <AlertDialog defaultOpen>
      <AlertDialogContent
        useRouterModal
        className='w-full sm:w-10/12 lg:w-7/12 max-h-[90vh] p-0 overflow-visible'
      >
        {/* 접근성 전용 */}
        <AlertDialogDescription className='sr-only'>
          이미지 상세보기 모달
        </AlertDialogDescription>

        {/* 스크롤 영역 */}
        <div className='w-full max-h-[90vh] overflow-y-auto overflow-x-hidden px-4 sm:px-8 py-4'>
          <div className='flex flex-col gap-5'>
            {/* 타이틀 & 버튼 */}
            <AlertDialogTitle className='flex flex-col sm:flex-row gap-3 items-start sm:items-center'>
              <span className='font-semibold text-lg sm:text-2xl flex-1 break-words'>
                {photo.alt_description || 'None-titled'}
              </span>

              <div className='flex items-center gap-2 flex-wrap sm:ml-auto shrink-0'>
                <LikeButton
                  liked={likes.get(photo.id)?.liked_by_user ?? false}
                  onToggle={(e) => authCheck(e, () => toggleLike(photo.id))}
                />

                <button title='이 이미지를 컬렉션에 추가'>
                  <Plus size={28} className='image-cover-icon border' />
                </button>

                <Popover>
                  <PopoverTrigger asChild>
                    <button className='flex items-center image-cover-icon border px-2 whitespace-nowrap'>
                      다운로드 <ChevronDown size={18} />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent
                    align='end'
                    className='flex flex-col w-56 gap-2 font-bold p-2'
                  >
                    <DownloadButton
                      downloadUrl={photo.urls.regular}
                      filename={`${photo.id}_regular`}
                    >
                      Regular
                    </DownloadButton>
                    <DownloadButton
                      downloadUrl={photo.urls.small}
                      filename={`${photo.id}_small`}
                    >
                      Small
                    </DownloadButton>
                    <DownloadButton
                      downloadUrl={photo.urls.full}
                      filename={`${photo.id}_full`}
                    >
                      원본
                    </DownloadButton>
                  </PopoverContent>
                </Popover>
              </div>
            </AlertDialogTitle>

            {/* 이미지 */}
            <div
              className='relative w-full max-h-[55vh]'
              style={{ aspectRatio: `${photo.width}/${photo.height}` }}
            >
              <Image
                src={photo.urls.regular}
                alt={photo.alt_description || '제목없음'}
                fill
                className='object-contain'
              />
            </div>

            {/* 태그칩 */}
            <div className='w-full'>
              <SearchButton tagsAndTopics={tagsAndTopics} />
            </div>

            {/* 닫기 버튼 */}
            <AlertDialogCancel className='border-0 w-fit hover:bg-transparent mx-auto'>
              <X size={24} />
            </AlertDialogCancel>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
