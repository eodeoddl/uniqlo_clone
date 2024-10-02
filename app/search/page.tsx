import { getAllCollectionsByUser } from '@/actions/handleCollection';
import { auth } from '@/auth';
import BottomNavigation from '@/components/home/bottom_nav/nav';
import PhotoGrid from '@/components/ui/photoGrid';
import { fetchBySearch } from '@/data/photo';
import { keywords } from '@/lib/constance';
import { CollectionWithPhotos } from '@/types';

export default async function Page({
  searchParams,
}: {
  searchParams?: { query?: string };
  // children: React.ReactNode;
}) {
  const session = await auth();
  const slug = searchParams?.query || '';
  const keyword = keywords.find(({ en }) => slug === en);
  const collections: CollectionWithPhotos[] = await getAllCollectionsByUser(
    session?.user.id!
  );

  const query = {
    userId: session?.user.id!,
    slug,
  };
  const initialData = await fetchBySearch(query);

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
        initialData={initialData}
        query={query}
        session={session}
      />
      <BottomNavigation session={session} />
    </div>
  );
}
