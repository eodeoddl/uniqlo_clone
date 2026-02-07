'use client';

import { ImageType } from '@/types';
import { create } from 'zustand';
import { handlePhotoLike } from '@/actions/handleLike';

interface LikesStore {
  state: Map<string, ImageType>;
  updateQueue: Set<string>;

  pushItems: (items: ImageType[]) => void;
  toggleLike: (id: string) => void;
}

let timer: NodeJS.Timeout | null = null;

export const useLikesStore = create<LikesStore>((set, get) => ({
  state: new Map(),
  updateQueue: new Set(),

  // 초기 + 무한스크롤 데이터 merge
  pushItems: (items) => {
    set((store) => {
      const map = new Map(store.state);
      items.forEach((item) => map.set(item.id, item));
      return { state: map };
    });
  },

  // ❤️ 토글 + debounce + batch
  toggleLike: (id) => {
    set((store) => {
      const map = new Map(store.state);
      const item = map.get(id);

      if (!item) return store;

      map.set(id, {
        ...item,
        liked_by_user: !item.liked_by_user,
      });

      const queue = new Set(store.updateQueue);
      queue.add(id);

      return { state: map, updateQueue: queue };
    });

    // 🔥 debounce
    if (timer) clearTimeout(timer);

    timer = setTimeout(async () => {
      const ids = Array.from(get().updateQueue);

      if (ids.length) {
        await handlePhotoLike(ids);
        set({ updateQueue: new Set() });
      }
    }, 500);
  },
}));
