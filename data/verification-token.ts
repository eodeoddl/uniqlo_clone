import { db } from '@/lib/db';

export const getVerification = async (token?: string) => {
  try {
    const verification = await db.verification.findUnique({ where: { token } });
    return verification;
  } catch (error) {
    return null;
  }
};

export const deleteVerification = async (token: string) => {
  try {
    console.log('on delete token ', token);
    await db.verification.delete({ where: { token } });
  } catch (error) {
    console.log('on delete error ', error);
    throw error;
  }
};
