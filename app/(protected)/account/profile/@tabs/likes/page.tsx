import PhotoGrid from '@/components/photo/photoGrid';
import { auth } from '@/auth';
import { getAllCollectionsByUser } from '@/actions/handleCollection';
import { getLikedByUserPhotos } from '@/actions/handleLike';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const session = await auth();

  if (!session) redirect('/auth/login');

  const userId = session.user.id;

  const collections = await getAllCollectionsByUser(userId);
  const initialData = await getLikedByUserPhotos(userId);

  return (
    <PhotoGrid
      collections={collections ?? []}
      initialData={initialData ?? []}
      query={userId}
      fetchFunction={getLikedByUserPhotos}
    />
  );
}
