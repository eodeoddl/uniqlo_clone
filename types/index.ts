import { Collection, Photo } from '@prisma/client';

export type PhotoJsonField = Record<string, string>;

export type ImageType = Omit<Photo, 'urls' | 'links' | 'alternative_slugs'> & {
  urls: PhotoJsonField;
  links: PhotoJsonField;
  alternative_slugs: PhotoJsonField;
};

export type ImageGroupType = {
  name: string;
  images: ImageType[];
};

export type CollectionWithPhotos = Collection & {
  photos: ImageType[];
};

export type PhotoGridFetchFunction<T = any> = (
  query: T,
  skip?: number,
  take?: number
) => Promise<ImageType[]>;
