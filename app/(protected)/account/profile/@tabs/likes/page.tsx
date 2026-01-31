import PhotoGrid from '@/components/ui/photoGrid';
import { auth } from '@/auth';
import { getAllCollectionsByUser } from '@/actions/handleCollection';
import { getLikedByUserPhotos } from '@/actions/handleLike';
import { redirect } from 'next/navigation';

export default async function Page() {
  const session = await auth();

  if (!session) {
    redirect('/modal/auth/login');
  }

  const userId = session.user.id;
  if (!userId) return null;

  const collections = await getAllCollectionsByUser(userId);
  const initialData = await getLikedByUserPhotos(userId);

  return (
    <PhotoGrid
      collections={collections ?? []}
      initialData={initialData ?? []}
      query={userId}
      session={session}
      fetchFunction={getLikedByUserPhotos}
    />
  );
}
