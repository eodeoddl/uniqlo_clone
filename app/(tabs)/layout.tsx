import BottomNavigation from '@/components/home/bottom_nav/nav';
import ImageCarousel from '@/components/home/ImageCarousel';
import { ImageType } from '@/types';
import TopNavigation from '@/components/home/top_nav/navi';
import { auth } from '@/auth';
import { db } from '@/lib/db';
import { tabs } from '@/lib/constance';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const imageGroup = await Promise.all(
    tabs.map(async ({ en }) => {
      const images = (await db.photo.findMany({
        where: {
          topics: {
            some: {
              topic: {
                slug: en,
              },
            },
          },
        },
        take: 10,
      })) as ImageType[];
      return { name: en, images };
    })
  );

  const session = await auth();

  return (
    <div className='relative w-screen h-screen'>
      <TopNavigation />
      <ImageCarousel imageGroup={imageGroup} />
      <BottomNavigation session={session} />
      {children}
    </div>
  );
}
