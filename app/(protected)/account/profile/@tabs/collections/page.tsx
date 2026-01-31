import UserCollections from '@/components/account/collections';
import { auth } from '@/auth';
import { getAllCollectionsByUser } from '@/actions/handleCollection';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const session = await auth();
  if (!session) {
    redirect('/modal/auth/login');
    return null;
  }
  const userId = session.user.id;
  const collections = await getAllCollectionsByUser(userId);
  return <UserCollections collections={collections} />;
}
