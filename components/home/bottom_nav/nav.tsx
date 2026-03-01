import BottomNavigationClient from './nav_client';
import { auth } from '@/auth';

export default async function BottomNavigation() {
  const session = await auth();

  return <BottomNavigationClient session={session} />;
}
