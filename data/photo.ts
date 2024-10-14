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
  const { userId, slug } = query;

  const res = await db.photo.findMany({
    where: {
      OR: [
        {
          tags: {
            some: {
              tag: {
                title: {
                  contains: slug,
                  mode: 'insensitive',
                },
              },
            },
          },
        },
        {
          topics: {
            some: {
              topic: {
                slug: {
                  contains: slug,
                  mode: 'insensitive',
                },
              },
            },
          },
        },
      ],
    },
    include: {
      userLikes: {
        where: {
          userId: userId, // 사용자가 좋아요한 항목 표시
        },
      },
    },
    skip,
    take,
  });

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
