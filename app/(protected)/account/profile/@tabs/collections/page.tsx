import { getAllCollectionsByUser } from '@/actions/handleCollection';
import { auth } from '@/auth';
import UserCollections from '@/components/account/collections';

export default async function Page() {
  const session = await auth();
  const collections = await getAllCollectionsByUser(session?.user.id!);
  return <UserCollections collections={collections} />;
}
