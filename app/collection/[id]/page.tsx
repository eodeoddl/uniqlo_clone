import {
  getAllCollectionsByUser,
  getCollectionById,
  getCollectionPhotos,
} from '@/actions/handleCollection';
import { auth } from '@/auth';
import CollectionEditModal from '@/components/collections/collectionEditModal';
import BottomNavigation from '@/components/home/bottom_nav/nav';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import PhotoGrid from '@/components/ui/photoGrid';
import { CircleUserRound } from 'lucide-react';

export default async function Page({ params }: { params: { id: string } }) {
  const session = await auth();
  const { collection: currentCollection, collectionOnPhotosCount } =
    await getCollectionById(params.id);
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
      <div className='flex justify-between mb-5 text-xl'>
        <span>{collectionOnPhotosCount}개의 이미지</span>
        {session?.user.id === currentCollection.user.id && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button>컬렉션 편집</button>
            </AlertDialogTrigger>
            <AlertDialogContent className='block h-screen w-full sm:max-w-[700px] sm:w-10/12 lg:w-1/2 sm:h-[60vh] lg:h-[70vh] p-5'>
              <CollectionEditModal
                title={currentCollection.title}
                description={currentCollection.description || ''}
                collectionId={currentCollection.id}
              />
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
      <PhotoGrid
        query={params.id}
        collections={userCollections}
        fetchFunction={getCollectionPhotos}
        session={session}
        initialData={collectionPhotos}
      />
      <BottomNavigation session={session} />
    </div>
  );
}
