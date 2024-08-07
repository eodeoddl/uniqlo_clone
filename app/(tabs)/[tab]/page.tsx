import { tabs } from '@/lib/constance';

export function generateStaticParams() {
  return tabs.map(({ en }) => ({ tab: en }));
}

export async function generateMetadata({
  params,
}: {
  params: { tab: string };
}) {
  const { tab } = params;

  const titles: Record<string, string> = {
    'fashion-beauty': '패션',
    animals: '동물',
    'golden-hour': '아름다운 순간',
    experimental: '실험적인',
  };
  const descriptions: Record<string, string> = {
    'fashion-beauty': '패션',
    animals: '동물',
    'golden-hour': '아름다운 순간',
    experimental: '실험적인',
  };
  return {
    title: titles[tab],
    description: descriptions[tab],
  };
}

export default function Page() {
  return null;
}
