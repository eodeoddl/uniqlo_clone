'use server';
import { db } from '@/lib/db';
import { ImageType } from '@/types';

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

  // const transformedRes: ImageType[] = res.map((photo) => ({
  //   ...photo,
  //   urls: photo.urls as Record<string, string>, // 타입 변환
  //   links: photo.links as Record<string, string>, // 타입 변환
  // }));

  return res as ImageType[];
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
