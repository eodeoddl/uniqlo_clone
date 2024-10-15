import { getAllCollectionsByUser } from '@/actions/handleCollection';
import { auth } from '@/auth';
import BottomNavigation from '@/components/home/bottom_nav/nav';
import FormError from '@/components/ui/form-error';
import PhotoGrid from '@/components/ui/photoGrid';
import { fetchBySearch } from '@/data/photo';
import { keywords } from '@/lib/constance';
import { cn } from '@/lib/utils';

export default async function Page({
  searchParams,
}: {
  searchParams?: { query?: string };
}) {
  const session = await auth();
  const slug = searchParams?.query?.toString() || '';
  const keyword = keywords.find(({ en }) => slug === en);
  const collections = await getAllCollectionsByUser(session?.user.id!);

  const query = {
    userId: session?.user.id!,
    slug,
  };
  const initialData = await fetchBySearch(query);

  return (
    <div className='w-11/12 max-w-[1200px] mx-auto pt-10'>
      {keyword ? (
        <>
          <h1 className='font-bold text-5xl my-5'>{keyword.ko}</h1>
          <p className='text-2xl mb-5'>{keyword.desc}</p>
        </>
      ) : (
        <h1
          className={cn('font-bold text-4xl my-5', {
            'mx-auto w-fit': !initialData.length,
          })}
        >
          {slug} 검색결과
        </h1>
      )}
      {initialData.length ? (
        <PhotoGrid
          collections={collections}
          fetchFunction={fetchBySearch}
          initialData={initialData}
          query={query}
          session={session}
        />
      ) : (
        <FormError
          message='검색결과가 존재하지 않습니다.'
          className='mx-auto w-fit'
        />
      )}
      <BottomNavigation session={session} />
    </div>
  );
}
