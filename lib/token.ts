import { v4 } from 'uuid';

export const generateToken = () => {
  const token = v4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  return { token, expires };
};
