'use server';
import { db } from '@/lib/db';
import { ImageType, PhotoGridFetchFunction } from '@/types';

export const fetchBySearch: PhotoGridFetchFunction<{
  userId: string;
  slug: string;
}> = async (
  query: {
    userId: string;
    slug: string;
  },
  skip: number = 0,
  take: number = 10
) => {
  const res = await db.photo.findMany({
    where: {
      topics: {
        some: {
          topic: {
            slug: query.slug,
          },
        },
      },
    },
    include: {
      userLikes: {
        where: {
          userId: query.userId,
        },
      },
    },
    skip,
    take,
  });

  console.log('skip take => ', skip, take);

  return res.map((photo) => ({
    ...photo,
    liked_by_user: photo.userLikes.length > 0,
  })) as ImageType[];
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
