import { db } from '@/lib/db';

export const getUserByEmail = async (email?: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } });
    return user;
  } catch (e) {
    return null;
  }
};

export const getUserById = async (id: string | undefined) => {
  try {
    const user = await db.user.findUnique({ where: { id } });
    return user;
  } catch (e) {
    return null;
  }
};

export const getEmailVerified = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } });
    return user?.emailVerified;
  } catch (e) {
    return null;
  }
};
