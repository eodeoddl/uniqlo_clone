import UserCollections from '@/components/account/collections';
import { auth } from '@/auth';
import { getAllCollectionsByUser } from '@/actions/handleCollection';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const session = await auth();
  if (!session) {
    redirect('/modal/auth/login'); // 여기를 모달 로그인 라우트로
  }
  const collections = await getAllCollectionsByUser(session?.user.id!);
  return <UserCollections collections={collections} />;
}
