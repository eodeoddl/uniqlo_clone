import Link from 'next/link';
const tabs = ['women', 'men', 'kids', 'baby'];

export default function TabList() {
  return (
    <div className='fixed top-0 left-0 z-50'>
      {tabs.map((tab) => (
        <Link key={tab} href={`/${tab}`}>{`/${tab}`}</Link>
      ))}
    </div>
  );
}
