import { getCollectionById } from '@/actions/handleCollection';

export default async function Page({ params }: { params: { id: string } }) {
  const collection = await getCollectionById(params.id);
  console.log('collection => ', collection);
  if (!collection) return <div>존재하지 않는 컬렉션 입니다.</div>;
  return <div>collections detail page {params.id}</div>;
}
