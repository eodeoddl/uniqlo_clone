import { useEffect, useRef } from 'react';

export const useThrottle = <T extends unknown[]>(
  callback: (...params: T) => void,
  time = 1000
) => {
  const timeout = useRef<ReturnType<typeof setTimeout>>();

  const throttleFn = (...args: T) => {
    // 등록된 실행 함수가 있으면 callback 실행을 하지않음.
    // timeout 등록이 안되어있으면 callback을 실행.
    if (timeout.current) return;
    timeout.current = setTimeout(() => {
      callback(...args);
      timeout.current = undefined;
    }, time);
  };

  useEffect(() => {
    return () => {
      if (timeout.current) clearTimeout(timeout.current);
    };
  }, []);

  return throttleFn;
};
