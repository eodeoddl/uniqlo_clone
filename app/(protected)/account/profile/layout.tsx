import Link from 'next/link';

export default async function Layout({ tabs }: { tabs: React.ReactNode }) {
  return (
    <>
      <Link href='/account/profile'>사진</Link>
      <Link href='/account/profile/collections'>컬렉션</Link>
      <Link href='/account/profile/likes'>좋아요</Link>
      {tabs}
    </>
  );
}
