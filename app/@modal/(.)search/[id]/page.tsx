import SearchButton from '@/components/search/searchButton';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { DownloadButton } from '@/components/ui/photoGrid';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { fetchById, getTagsAndTopicsByPhotoId } from '@/data/photo';
import { ChevronDown, Heart, Plus, X } from 'lucide-react';
import Image from 'next/image';

export default async function Modal({ params }: { params: { id: string } }) {
  const photo = await fetchById(params.id);
  const tagsAndTopics = await getTagsAndTopicsByPhotoId(params.id);

  return (
    <AlertDialog defaultOpen>
      <AlertDialogContent
        useRouterModal
        className='w-full sm:w-10/12 max-h-[90vh] overflow-hidden p-0'
      >
        <ScrollArea className='w-full max-h-[90vh] p-4 sm:p-8'>
          <div className='grid gap-2'>
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
            <AlertDialogDescription
              className='relative w-full'
              style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
            >
              <Image
                src={photo.urls.regular}
                alt={photo.alt_description || '제목없음'}
                fill
                style={{ objectFit: 'contain' }}
                sizes='(max-width: 400px) 200px, (max-width: 1080px) 500px, 1080px'
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
