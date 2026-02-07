'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export const useAuthCheck = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const authCheck = (
    e: React.MouseEvent<HTMLElement>,
    callback: () => void,
  ) => {
    e.stopPropagation();
    e.preventDefault();
    if (!session) router.push('/auth/login');
    else callback();
  };

  return authCheck;
};
