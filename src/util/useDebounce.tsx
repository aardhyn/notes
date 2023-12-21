import { useCallback, useEffect, useRef, useState } from "react";

export function useDebounce<T>(value: T, delay: number) {
  const [debouchedValue, setDebouncedValue] = useState<T>(value);
  const timeout = useRef<NodeJS.Timeout>();

  const clear = () => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
  };

  const setState = useCallback(
    (value: T) => {
      clear();
      timeout.current = setTimeout(() => setDebouncedValue(value), delay);
    },
    [delay]
  );

  useEffect(() => {
    setState(value);
    return clear;
  }, [value, delay, setState]);

  return debouchedValue;
}
