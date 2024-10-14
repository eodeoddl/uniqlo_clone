import { getAllCollectionsByUser } from '@/actions/handleCollection';
import { auth } from '@/auth';
import BottomNavigation from '@/components/home/bottom_nav/nav';
import PhotoGrid from '@/components/ui/photoGrid';
import { fetchBySearch } from '@/data/photo';
import { keywords } from '@/lib/constance';

export default async function Page({
  searchParams,
}: {
  searchParams?: { query?: string };
}) {
  const session = await auth();
  const slug = searchParams?.query || '';
  const keyword = keywords.find(({ en }) => slug === en);
  const collections = await getAllCollectionsByUser(session?.user.id!);

  const query = {
    userId: session?.user.id!,
    slug,
  };
  const initialData = await fetchBySearch(query);

  if (!initialData.length) {
    return <div>Keyword not found</div>;
  }

  return (
    <div className='w-11/12 max-w-[1200px] mx-auto pt-10'>
      {keyword ? (
        <>
          <h1 className='font-bold text-5xl my-5'>{keyword.ko}</h1>
          <p className='text-2xl mb-5'>{keyword.desc}</p>
        </>
      ) : (
        <h1 className='font-bold text-5xl my-5'>{slug} 검색결과</h1>
      )}
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
