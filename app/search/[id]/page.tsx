import { ChevronDown, Heart, Plus } from 'lucide-react';
import { fetchById, getTagsAndTopicsByPhotoId } from '@/data/photo';
import { auth } from '@/auth';
import BottomNavigation from '@/components/home/bottom_nav/nav';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { DownloadButton } from '@/components/ui/photoGrid';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import SearchButton from '@/components/search/searchButton';

export default async function Page({ params }: { params: { id: string } }) {
  const photo = await fetchById(params.id);
  const session = await auth();
  const tagsAndTopics = await getTagsAndTopicsByPhotoId(params.id);

  return (
    <div className='mx-auto w-11/12 grid grid-rows-[auto_1fr_auto] gap-10 py-16'>
      <div className='flex flex-col sm:flex-row'>
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
      </div>
      <div
        className='relative w-full mx-auto lg:w-8/12'
        style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
      >
        <Image
          src={photo.urls.regular}
          alt={photo.alt_description || '제목없음'}
          fill
          style={{ objectFit: 'cover' }}
          sizes='(max-width: 400px) 200px, (max-width: 1080px) 500px, 1080px'
        />
      </div>
      <div className='grid grid-rows-auto'>
        <span className='text-2xl'># 연관 검색어</span>
        <div>
          <SearchButton tagsAndTopics={tagsAndTopics} />
        </div>
      </div>
      <BottomNavigation session={session} />
    </div>
  );
}
