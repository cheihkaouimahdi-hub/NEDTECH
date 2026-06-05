import { useMemo, useCallback, useRef } from 'react';
import { debounce } from '../utils/debounce';

export function useDebounce<T extends (...args: Parameters<T>) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  const fnRef = useRef(fn);
  fnRef.current = fn;

  const debouncedFn = useMemo(
    () => debounce((...args: Parameters<T>) => fnRef.current(...args), delay),
    [delay]
  );

  return useCallback(
    (...args: Parameters<T>) => debouncedFn(...args),
    [debouncedFn]
  );
}
