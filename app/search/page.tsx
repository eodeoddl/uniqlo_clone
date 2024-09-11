import { getAllCollectionsByUser } from '@/actions/handleCollection';
import { auth } from '@/auth';
import Search from '@/components/search/search';
import { fetchBySearch } from '@/data/photo';
import { keywords } from '@/lib/constance';
import { CollectionWithPhotos, ImageType } from '@/types';

export default async function Page({
  searchParams,
  children,
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
    <>
      <Search
        title={ko}
        desc={desc}
        query={query}
        initialData={images}
        session={session}
        collections={collections}
      />
      {children}
    </>
  );
}
