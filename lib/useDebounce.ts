import { useEffect, useRef } from 'react';

export const useDebounce = <T extends unknown[]>(
  callback: (...params: T) => void,
  delay = 1000
) => {
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastArgs = useRef<T | null>(null);
  const lastCallTime = useRef<number>(Date.now()); // 마지막 호출 시간을 기록

  const debounceFn = (...args: T) => {
    const now = Date.now();
    const timeSinceLastCall = now - lastCallTime.current;

    // 기존 타임아웃을 취소하고 새로운 타임아웃 설정
    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    // 마지막 호출 시간과 인자 저장
    lastArgs.current = args;
    lastCallTime.current = now;

    // 남은 대기 시간을 계산하고 그 시간만큼 대기 후 실행
    timeout.current = setTimeout(() => {
      callback(...(lastArgs.current || args));
      lastCallTime.current = Date.now();
      timeout.current = null; // 타이머 초기화
    }, delay - timeSinceLastCall);
  };

  // 컴포넌트가 언마운트될 때 타임아웃 정리
  useEffect(() => {
    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, []);

  return debounceFn;
};
