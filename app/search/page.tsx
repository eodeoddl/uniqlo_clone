import { getAllCollectionsByUser } from '@/actions/handleCollection';
import { auth } from '@/auth';
import BottomNavigation from '@/components/home/bottom_nav/nav';
import PhotoGrid from '@/components/ui/photoGrid';
import { fetchBySearch } from '@/data/photo';
import { keywords } from '@/lib/constance';
import { CollectionWithPhotos, ImageType } from '@/types';

export default async function Page({
  searchParams,
}: {
  searchParams?: { query?: string };
  children: React.ReactNode;
}) {
  const session = await auth();
  const query = searchParams?.query || '';
  const keyword = keywords.find(({ en }) => query === en);
  const images = (await fetchBySearch(query)) as ImageType[];
  const collections: CollectionWithPhotos[] = await getAllCollectionsByUser(
    session?.user.id!
  );

  if (!keyword) {
    return <div>Keyword not found</div>;
  }

  const { ko, desc } = keyword;

  return (
    <div className='w-11/12 max-w-[1200px] mx-auto pt-10'>
      <h1 className='font-bold text-5xl my-5'>{ko}</h1>
      <p className='text-2xl mb-5'>{desc}</p>
      <PhotoGrid
        collections={collections}
        fetchFunction={fetchBySearch}
        initialData={images}
        query={query}
        session={session}
      />
      <BottomNavigation session={session} />
    </div>
  );
}
