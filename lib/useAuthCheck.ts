import { Session } from 'next-auth';
import { useRouter } from 'next/navigation';

const useAuthCheck = (callback: () => void, session: Session | null) => {
  const router = useRouter();
  const authCheck = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    e.preventDefault();
    if (!session) router.push('/auth/login');
    else callback();
  };

  return authCheck;
};

export default useAuthCheck;
