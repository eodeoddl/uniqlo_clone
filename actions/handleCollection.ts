'use server';

import { db } from '@/lib/db';

export async function getAllCollectionsByUser(userId: string) {
  const collections = await db.collection.findMany({
    where: {
      userId: userId, // 특정 사용자의 ID를 기준으로 필터링
    },
    include: {
      photos: {
        include: {
          photo: true, // 각 컬렉션에 포함된 사진 정보도 함께 가져오기
        },
      },
    },
  });

  return collections;
}

async function getLatestThreePhotosInCollection(collectionId: string) {
  const latestPhotos = await db.collectionOnPhotos.findMany({
    where: { collectionId },
    orderBy: { id: 'desc' }, // 최근에 추가된 순서대로 정렬
    take: 3, // 상위 3개 항목만 가져오기
    include: {
      photo: true, // 관련된 사진 정보를 함께 가져오기
    },
  });

  return latestPhotos;
}

export async function toggleCollection(collectionId: string, photoId: string) {
  // 1. 해당 컬렉션에 사진이 이미 포함되어 있는지 확인
  const existingEntry = await db.collectionOnPhotos.findFirst({
    where: {
      collectionId,
      photoId,
    },
  });

  // 2. 포함되어 있다면 컬렉션에서 제거
  if (existingEntry) {
    await db.collectionOnPhotos.delete({
      where: {
        id: existingEntry.id,
      },
    });
    return { action: 'removed', collectionId, photoId };
  }

  // 3. 포함되어 있지 않다면 컬렉션에 추가
  await db.collectionOnPhotos.create({
    data: {
      collectionId,
      photoId,
    },
  });

  return { action: 'added', collectionId, photoId };
}
