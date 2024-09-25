import {
  getAllCollectionsByUser,
  getCollectionById,
  getCollectionPhotos,
} from '@/actions/handleCollection';
import { auth } from '@/auth';
import BottomNavigation from '@/components/home/bottom_nav/nav';
import PhotoGrid from '@/components/ui/photoGrid';
import { ImageType } from '@/types';
import { CircleUserRound } from 'lucide-react';

export default async function Page({ params }: { params: { id: string } }) {
  const session = await auth();
  const currentCollection = await getCollectionById(params.id);
  const collectionPhotos = await getCollectionPhotos(params.id);
  const userCollections = await getAllCollectionsByUser(session?.user.id!); // 로그인 하지 않았을 경우를 생각해서 수정필요

  if (!collectionPhotos || !currentCollection)
    return <div>존재하지 않는 컬렉션 입니다.</div>;

  return (
    <div className='w-11/12 max-w-[1200px] mx-auto pt-10'>
      <h2 className='text-3xl sm:text-5xl font-bold'>
        {currentCollection.title}
      </h2>
      <div className='flex gap-3.5 items-center mb-10 mt-3'>
        {/* {currentCollection.user?.image ?  : <CircleUserRound />} */}
        <CircleUserRound strokeWidth={1} size={32} color='#3e9392' />
        <span className='text-xl sm:text-2xl'>
          {currentCollection.user.name}
        </span>
      </div>
      <span className='text-xl'>{collectionPhotos.length}개의 이미지</span>
      <PhotoGrid
        query={params.id}
        collections={userCollections}
        fetchFunction={getCollectionPhotos}
        session={session}
        initialData={collectionPhotos as ImageType[]}
      />
      <BottomNavigation session={session} />
    </div>
  );
}
