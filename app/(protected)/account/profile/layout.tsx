import TabGroup from '@/components/ui/tab';
import { Folders, Heart, Images } from 'lucide-react';

export default async function Layout({ tabs }: { tabs: React.ReactNode }) {
  return (
    <div className='w-11/12 max-w-[1200px] mx-auto pt-10'>
      <TabGroup
        basePath='/account/profile'
        tabItems={[
          { icons: <Images />, text: '사진', path: '' },
          { icons: <Folders />, text: '컬렉션', path: 'collections' },
          { icons: <Heart />, text: '좋아요', path: 'likes' },
        ]}
      />
      {/* <Link
        href='/account/profile'
        className='text-2xl font-semibold inline-flex items-center gap-2 mx-2'
      >
        <Images />
        사진
      </Link>
      <Link
        href='/account/profile/collections'
        className='text-2xl font-semibold inline-flex items-center gap-2 mx-2'
      >
        <Folders />
        컬렉션
      </Link>
      <Link
        href='/account/profile/likes'
        className='text-2xl font-semibold inline-flex items-center gap-2 mx-2'
      >
        <Heart />
        좋아요
      </Link> */}
      {tabs}
    </div>
  );
}
