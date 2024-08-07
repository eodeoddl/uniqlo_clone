'use server';
import { db } from '@/lib/db';

export const fetchBySearch = async (
  query: string,
  skip: number = 0,
  take: number = 10
) => {
  const res = await db.photo.findMany({
    where: {
      topics: {
        some: {
          topic: {
            slug: query,
          },
        },
      },
    },
    skip,
    take,
  });
  return res;
};

export const fetchById = async (id: string) => {
  const res = await db.photo.findUnique({
    where: {
      id,
    },
  });
  if (!res) throw new Error('Id is not exist');
  return res;
};
