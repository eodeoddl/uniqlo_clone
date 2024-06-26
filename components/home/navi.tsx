'use client';
import { Home, Search, User } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Navigation() {
  const router = useRouter();
  const contents = [
    {
      content: <Home key='home' size={36} />,
      onClick: () => {
        router.push('/');
      },
    },
    {
      content: <Search key='search' size={36} />,
      onClick: () => {},
    },
    {
      content: <User key='user' size={36} />,
      onClick: () => {
        router.push('/auth/login');
      },
    },
  ];
  return (
    <nav className='fixed left-0 bottom-0 w-full bg-transparent py-10'>
      <ul className='flex justify-center items-center gap-10'>
        {contents.map(({ content, onClick }, i) => (
          <li
            key={i}
            className='flex items-center justify-center p-2.5 rounded-full shadow-all cursor-pointer'
            onClick={onClick}
          >
            {content}
          </li>
        ))}
      </ul>
    </nav>
  );
}
