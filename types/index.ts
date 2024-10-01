import { Collection, Photo } from '@prisma/client';

export type PhotoJsonField = Record<string, string>;

export type ImageType = Omit<Photo, 'urls' | 'links'> & {
  urls: PhotoJsonField;
  links: PhotoJsonField;
};

export type ImageGroupType = {
  name: string;
  images: ImageType[];
};

export type CollectionWithPhotos = Collection & {
  photos: Photo[];
};

export type PhotoGridFetchFunction<T = any> = (
  query: T,
  skip?: number,
  take?: number
) => Promise<ImageType[]>;
