import { getAllCollectionsByUser } from '@/actions/handleCollection';
import { getLikedByUserPhotos } from '@/actions/handleLike';
import { auth } from '@/auth';
import PhotoGrid from '@/components/ui/photoGrid';

export default async function Page() {
  const session = await auth();

  if (!session) return null;

  const collections = await getAllCollectionsByUser(session.user.id!);
  const initialData = await getLikedByUserPhotos(session.user.id!);

  return (
    <PhotoGrid
      collections={collections}
      initialData={initialData}
      query={session.user.id!}
      session={session}
      fetchFunction={getLikedByUserPhotos}
    />
  );
}
