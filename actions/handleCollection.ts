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

  // CollectionOnPhotos[] -> Photo[] 변환 작업
  return collections.map((collection) => ({
    ...collection,
    photos: collection.photos.map((collectionPhoto) => collectionPhoto.photo), // CollectionOnPhotos[]에서 Photo[]로 변환
  }));
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

export async function createNewCollection(
  userId: string,
  photoId: string,
  title: string,
  description?: string
) {
  const newCollection = await db.collection.create({
    data: {
      title,
      description,
      userId,
      photos: {
        create: {
          photoId,
        },
      },
    },
    include: {
      photos: {
        include: {
          photo: true, // photo 데이터와 함께 포함
        },
      },
    },
  });

  return {
    ...newCollection,
    photos: newCollection.photos.map(
      (collectionPhoto) => collectionPhoto.photo
    ),
  };
}

export async function getCollectionById(collectionId: string) {
  try {
    const collection = await db.collection.findUnique({
      where: {
        id: collectionId,
      },
      include: {
        photos: {
          include: {
            photo: true, // 사진 정보도 포함하여 가져옴
          },
        },
        user: true, // 컬렉션의 사용자 정보도 포함
      },
    });

    if (!collection) return null;
    return {
      ...collection,
      photos: collection.photos.map(
        (collectiononPhoto) => collectiononPhoto.photo
      ),
    };
  } catch (error) {
    console.error('Error fetching collection by id:', error);
    return null;
  }
}
