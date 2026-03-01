'use client';

import React from 'react';
import { Session } from 'next-auth';
import { useRouter } from 'next/navigation';

export const useAuthCheck = (session: Session | null) => {
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
