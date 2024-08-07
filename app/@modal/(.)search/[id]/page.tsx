import DownloadButton from '@/components/search/downloadButton';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
} from '@/components/ui/alert-dialog';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { fetchById } from '@/data/photo';
import { ImageType } from '@/types';
import { AlertDialogTitle } from '@radix-ui/react-alert-dialog';
import { ChevronDown, Heart, Plus, X } from 'lucide-react';
import Image from 'next/image';

export default async function Modal({ params }: { params: { id: string } }) {
  const photo = (await fetchById(params.id)) as ImageType;

  return (
    <AlertDialog defaultOpen>
      <AlertDialogContent useRouterModal className='w-full sm:w-10/12'>
        <AlertDialogTitle className='flex flex-col sm:flex-row gap-2'>
          <span className='font-semibold text-xl sm:text-2xl'>
            {photo.alt_description || 'None-titled'}
          </span>
          <div className='flex items-center gap-1.5 ml-0 sm:ml-auto'>
            <button title='이 이미지에 좋아요 표시'>
              <Heart size='32' className='image-cover-icon border' />
            </button>
            <button title='이 이미지를 컬렉션에 추가'>
              <Plus size='32' className='image-cover-icon border' />
            </button>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  title='이 이미지를 다운로드'
                  className='flex items-center image-cover-icon border '
                >
                  <span className='whitespace-nowrap'>다운로드</span>
                  <ChevronDown size='20' />
                </button>
              </PopoverTrigger>
              <PopoverContent
                align='end'
                className='flex flex-col w-60 gap-3 font-bold p-0 py-3'
              >
                <DownloadButton
                  className='hover:bg-slate-300'
                  downloadUrl={photo.urls.regular}
                  filename={`${photo.id}_regular`}
                >
                  Regular
                </DownloadButton>
                <DownloadButton
                  className='hover:bg-slate-300'
                  downloadUrl={photo.urls.small}
                  filename={`${photo.id}_small`}
                >
                  Small
                </DownloadButton>
                <DownloadButton
                  className='hover:bg-slate-300'
                  downloadUrl={photo.urls.full}
                  filename={`${photo.id}_full`}
                >
                  원본
                </DownloadButton>
              </PopoverContent>
            </Popover>
          </div>
        </AlertDialogTitle>
        <AlertDialogDescription className='relative h-[70vh]'>
          <Image
            src={photo.urls.regular}
            alt={photo.alt_description || '제목없음'}
            fill
            style={{ objectFit: 'contain' }}
          />
        </AlertDialogDescription>
        <AlertDialogCancel className='mx-auto border-0 w-fit hover:bg-transparent'>
          <X size='36' />
        </AlertDialogCancel>
      </AlertDialogContent>
    </AlertDialog>
  );
}
