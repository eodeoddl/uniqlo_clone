import TabGroup from '@/components/ui/tab';
import { Folders, Heart, Images } from 'lucide-react';

export default async function Layout({ tabs }: { tabs: React.ReactNode }) {
  return (
    <div className='w-11/12 max-w-[1200px] mx-auto py-16'>
      <TabGroup
        basePath='/account/profile'
        tabItems={[
          {
            icon: <Images />,
            text: '사진',
            path: '',
          },
          {
            icon: <Folders />,
            text: '컬렉션',
            path: 'collections',
          },
          {
            icon: <Heart />,
            text: '좋아요',
            path: 'likes',
          },
        ]}
      />
      {tabs}
    </div>
  );
}
