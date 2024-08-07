import Search from '@/components/search/search';
import { fetchBySearch } from '@/data/photo';
import { keywords } from '@/lib/constance';
import { ImageType } from '@/types';

export default async function Page({
  searchParams,
  children,
}: {
  searchParams?: { query?: string };
  children: React.ReactNode;
}) {
  const query = searchParams?.query || '';
  const keyword = keywords.find(({ en }) => query === en);
  const images = (await fetchBySearch(query)) as ImageType[];

  if (!keyword) {
    return <div>Keyword not found</div>;
  }

  const { ko, desc } = keyword;

  return (
    <>
      <Search title={ko} desc={desc} query={query} initialData={images} />
      {children}
    </>
  );
}
