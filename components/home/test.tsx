"use client";

import React, { useEffect, useRef } from "react";

import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { usePathname } from "next/navigation";

const tabs = ["women", "men", "kids", "baby"];

export default function Test() {
  console.log("carousel re load");
  const pathname = usePathname();
  const initialIndex = tabs.indexOf(pathname.split("/")[1]);
  const [emblaRef, emblaApi] = useEmblaCarousel({ startIndex: initialIndex });
  const prevIndexRef = useRef(initialIndex);

  return (
    <div className='relative w-screen h-screen overflow-hidden'>
      <div className='fixed top-0 left-0 z-50 flex space-x-4 p-4 bg-white'>
        {tabs.map((tab) => (
          <Link key={tab} href={`/${tab}`}>
            {tab}
          </Link>
        ))}
      </div>

      <div ref={emblaRef} className='w-full h-full overflow-hidden'>
        <div className='flex h-full'>
          {tabs.map((tab, index) => (
            <div
              key={index}
              className='flex-none w-full h-full flex items-center justify-center bg-gray-200'
            >
              <div className='w-full h-full flex items-center justify-center text-5xl font-semibold'>
                {tab}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 리렌더를 막을 수 없다. 그러므로 route 변화가 감지되면 ref에 이전값을 가지고 있고, 현재값은 tab 버튼을 누른 곳으로 이동하는 코드.
// 초기 렌더링을 아이템의 순서를 ref에 저장된 이전 slide의 index를 유지한채 포커싱이 되어있는상태로 렌더링을 해야한다. 그후. useEffect로 scrollto api를 이용해서 이동시킨다.

// carousel api 말고 option 중 start index option
