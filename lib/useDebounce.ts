import { useRef, useEffect } from 'react';

// Debounce 함수와 AbortController를 사용하여 이전 API 요청을 취소하는 방식
export const useDebounce = <T extends unknown[]>(
  callback: (...params: [...T, AbortController]) => void,
  delay = 500
) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const debouncedFn = (...args: T) => {
    // 1. 기존 타이머가 있으면 취소
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // 2. 기존 AbortController 요청이 있으면 취소
    if (abortControllerRef.current) {
      abortControllerRef.current.abort(); // 이전 API 요청 취소
    }

    // 3. 새로운 AbortController 생성
    abortControllerRef.current = new AbortController();

    // 4. 새로운 타이머 설정
    timeoutRef.current = setTimeout(() => {
      if (abortControllerRef.current) {
        callback(...args, abortControllerRef.current); // AbortController를 콜백에 전달
      }
    }, delay);
  };

  useEffect(() => {
    // 컴포넌트가 언마운트될 때 타이머 및 AbortController 정리
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return debouncedFn;
};
