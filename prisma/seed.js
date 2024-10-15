const { PrismaClient } = require('@prisma/client');
const fetch = require('node-fetch');
require('dotenv').config();

const db = new PrismaClient();

const seedPhotos = async (topic) => {
  const perPage = 30;
  const page = 1;

  const res = await fetch(
    `https://api.unsplash.com/topics/${topic}/photos?page=${page}&per_page=${perPage}&order_by=popular`,
    {
      method: 'GET',
      headers: {
        'Accept-Version': 'v1',
        Authorization: `${process.env.UNSPLASH_ACCESS_KEY}`,
      },
    }
  );

  const photos = await res.json();

  for (const photo of photos) {
    const {
      id,
      width,
      height,
      color,
      blur_hash: blurHash,
      likes,
      liked_by_user: likedByUser,
      description,
      urls,
      links,
    } = photo;

    const existingPhoto = await db.photo.findUnique({ where: { id } });

    if (existingPhoto) continue;

    await db.photo.create({
      data: {
        id,
        topic,
        width,
        height,
        color,
        blurHash,
        likes,
        likedByUser,
        description,
        urls: {
          create: {
            raw: urls.raw,
            full: urls.full,
            regular: urls.regular,
            small: urls.small,
            thumb: urls.thumb,
          },
        },
        links: {
          create: {
            self: links.self,
            html: links.html,
            download: links.download,
            download_location: links.download_location,
          },
        },
      },
    });
  }
};

const seedPhotos1 = async (topic) => {
  const perPage = 30;
  const page = 1;

  const res = await fetch(
    `https://api.unsplash.com/topics/${topic}/photos?page=${page}&per_page=${perPage}&order_by=popular`,
    {
      method: 'GET',
      headers: {
        'Accept-Version': 'v1',
        Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
      },
    }
  );

  const photos = await res.json();

  for (const photo of photos) {
    const existingPhoto = await db.photo.findUnique({
      where: { id: photo.id },
    });
    if (existingPhoto) continue;

    const data = await fetch(photo.links.self, {
      method: 'GET',
      headers: {
        'Accept-Version': 'v1',
        Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
      },
    });

    const photoDetail = await data.json();

    const {
      id,
      slug,
      alternative_slugs,
      width,
      height,
      description,
      alt_description,
      urls,
      links,
      likes,
      liked_by_user,
      tags,
      tags_preview,
      views,
      downloads,
      topics,
    } = photoDetail;

    const filteredTags = tags.filter((tag) => tag.type === 'search');
    const filteredTagsPreview = tags_preview.filter(
      (tag) => tag.type === 'search'
    );

    await db.photo.create({
      data: {
        id,
        slug,
        alternative_slugs,
        width,
        height,
        description,
        alt_description,
        urls,
        links,
        likes,
        liked_by_user,
        views,
        downloads,
        tags: {
          create: filteredTags.map((tag) => ({
            tag: {
              connectOrCreate: {
                where: { title: tag.title },
                create: { id: tag.title, type: tag.type, title: tag.title },
              },
            },
          })),
        },
        tags_preview: {
          create: filteredTagsPreview.map((tag) => ({
            type: tag.type,
            title: tag.title,
          })),
        },
        topics: {
          create: topics.map((topic) => ({
            topic: {
              connectOrCreate: {
                where: { id: topic.id },
                create: { id: topic.id, title: topic.title, slug: topic.slug },
              },
            },
          })),
        },
      },
    });
  }
};

const seed = async () => {
  try {
    await Promise.all(
      ['fashion-beauty', 'animals', 'golden-hour', 'experimental'].map(
        (topic) => seedPhotos1(topic)
      )
    );
    console.log('Seeding completed successfully.');
  } catch (error) {
    console.error(
      'An error occurred while attempting to seed the database:',
      error
    );
  } finally {
    await db.$disconnect();
  }
};

seed();
