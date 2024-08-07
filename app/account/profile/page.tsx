import { auth } from '@/auth';
import Profile from '@/components/account/profile';
import { redirect } from 'next/navigation';

export default async function Page() {
  const session = await auth();
  if (!session?.user) return redirect('/auth/login');
  return <Profile />;
}
