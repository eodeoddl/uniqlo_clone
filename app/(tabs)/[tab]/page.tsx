const tabs = ['women', 'men', 'kids', 'baby'] as const;

export function generateStaticParams() {
  return tabs.map((tab) => ({ tab }));
}

export async function generateMetadata({
  params,
}: {
  params: { tab: (typeof tabs)[number] };
}) {
  const { tab } = params;

  const titles: Record<(typeof tabs)[number], string> = {
    women: '여성 의류',
    men: '남성 의류',
    kids: '키즈 의류',
    baby: '베이비 의류',
  };
  const descriptions: Record<(typeof tabs)[number], string> = {
    women:
      '여성 아우터, 티셔츠, 블라우스, 팬츠, 원피스, 홈웨어, 이너웨어 등 다양한 제품을 만나보세요.',
    men: '남성 아우터, 정장, 셔츠, 티셔츠, 청바지, 이너웨어 등 다양한 제품을 만나보세요.',
    kids: '활동적인 아이를 위한 맨투맨, 팬츠 등 운동복과 여아를 위한 주니어 브라 등 다양한 제품을 만나보세요.',
    baby: '신생아 필수템 바디수트와 턱받이. 어린이집 상하복 추천템 티셔츠와 레깅스까지 아이의 시선에서 만듭니다.',
  };
  return {
    title: titles[tab],
    description: descriptions[tab],
  };
}

export default function Page({ params }: { params: { tab: string } }) {
  console.log(params);
  return null;
}
