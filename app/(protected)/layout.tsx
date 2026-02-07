import BottomNavigation from '@/components/home/bottom_nav/nav';

export const dynamic = 'force-dynamic';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <BottomNavigation />
    </>
  );
}
