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
import { ScrollArea } from '@/components/ui/scroll-area';
import SearchButton from '@/components/search/searchButton';
import { useAuthCheck } from '@/lib/useAuthCheck';
import { useLikesStore } from '@/store/likeStore';

type Props = {
  photo: ImageType;
  tagsAndTopics: string[];
};

export default function PhotoModal({ photo, tagsAndTopics }: Props) {
  const authCheck = useAuthCheck();
  const likes = useLikesStore((state) => state.state);
  const toggleLike = useLikesStore((s) => s.toggleLike);

  return (
    <AlertDialog defaultOpen>
      <AlertDialogContent
        useRouterModal
        className='w-full sm:w-10/12 lg:w-7/12 max-h-[90vh] overflow-hidden p-0'
      >
        <ScrollArea className='w-full max-h-[90vh] p-4 sm:p-8'>
          <div className='grid gap-2'>
            <AlertDialogTitle className='flex flex-col sm:flex-row gap-3 items-start sm:items-center'>
              <span className='font-semibold text-xl sm:text-2xl flex-1 min-w-0 break-words'>
                {photo.alt_description || 'None-titled'}
              </span>
              <div className='flex items-center gap-2 flex-wrap flex-shrink-0 sm:ml-auto'>
                <LikeButton
                  liked={likes.get(photo.id)?.liked_by_user ?? false}
                  onToggle={(e) => authCheck(e, () => toggleLike(photo.id))}
                />
                <button title='이 이미지를 컬렉션에 추가'>
                  <Plus size='32' className='image-cover-icon border' />
                </button>
                <Popover>
                  <PopoverTrigger asChild>
                    <button className='flex items-center image-cover-icon border'>
                      다운로드
                      <ChevronDown size='20' />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent
                    align='end'
                    className='flex flex-col w-60 gap-3 font-bold p-0 py-3'
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

            <AlertDialogDescription
              className='relative w-full max-h-[60vh] sm:max-h-[70vh]'
              style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
            >
              <Image
                src={photo.urls.regular}
                alt={photo.alt_description || '제목없음'}
                fill
                style={{ objectFit: 'contain' }}
              />
            </AlertDialogDescription>

            <div className='flex flex-wrap'>
              <SearchButton tagsAndTopics={tagsAndTopics} />
            </div>

            <AlertDialogCancel
              className='border-0 w-fit hover:bg-transparent mx-auto'
              useRouterModal
            >
              <X size='24' />
            </AlertDialogCancel>
          </div>
        </ScrollArea>
      </AlertDialogContent>
    </AlertDialog>
  );
}
