'use server';

import { getVerification } from '@/data/verification-token';
import { VerificationError } from '@/lib/errors';

export const tokenValidation = async (token: string) => {
  const verification = await getVerification(token);
  if (!verification)
    throw new VerificationError('인증코드가 일치하지 않습니다.');

  if (verification.expires_at.getTime() <= new Date().getTime())
    throw new VerificationError(
      '기간이 만료된 인증코드입니다. 인증코드를 다시 발급 받아주세요.'
    );

  return verification;
};
