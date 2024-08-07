import { Photo } from '@prisma/client';

type PhotoJsonField = Record<string, string>;

export type ImageType = Omit<Photo, 'urls' | 'links'> & {
  urls: PhotoJsonField;
  links: PhotoJsonField;
};

export type ImageGroupType = {
  name: string;
  images: ImageType[];
};
