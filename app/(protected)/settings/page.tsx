import { auth } from '@/auth';

export default async function Page() {
  const session = auth();
  return <span>settings page!</span>;
}
