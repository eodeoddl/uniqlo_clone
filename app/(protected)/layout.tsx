import { auth } from '@/auth';
import BottomNavigation from '@/components/home/bottom_nav/nav';
import { redirect } from 'next/navigation';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) redirect('/auth/login');
  return (
    <>
      {children}
      <BottomNavigation session={session} />
    </>
  );
}
