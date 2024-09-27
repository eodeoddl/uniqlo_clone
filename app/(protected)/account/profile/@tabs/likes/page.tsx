import { getAllCollectionsByUser } from '@/actions/handleCollection';
import { auth } from '@/auth';
import PhotoGrid from '@/components/ui/photoGrid';

export default async function Page() {
  const session = await auth();

  if (!session) return null;

  console.log('like page session ', session);

  const collections = await getAllCollectionsByUser(session?.user.id!);
  return (
    <div>
      likes Page
      {/* <PhotoGrid collections={collections} initialData={} query={session.} session={} fetchFunction={} /> */}
    </div>
  );
}
