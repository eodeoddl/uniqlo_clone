import BottomNavigation from '@/components/home/bottom_nav/nav';
import ImageCarousel from '@/components/home/ImageCarousel';
import TopNavigation from '@/components/home/top_nav/navi';

const fetchImages = async (count: number, page: number) => {
  const res = await fetch(
    `https://api.unsplash.com/photos?page=${page}&per_page=${count}`,
    {
      method: 'GET',
      headers: {
        'Accept-Version': 'v1',
        Authorization: 'Client-ID vR6XIkM8AMjF3q-aEtKZd07s1STgb0hzwMtiNhkhtHI',
      },
    }
  );
  return await res.json();
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const imageGroups = await Promise.all([
    fetchImages(5, 1),
    fetchImages(4, 2),
    fetchImages(3, 3),
    fetchImages(5, 4),
  ]);
  return (
    <div className='relative w-screen h-screen'>
      <TopNavigation />
      <ImageCarousel imageGroups={imageGroups} />
      <BottomNavigation />
      {children}
    </div>
  );
}
