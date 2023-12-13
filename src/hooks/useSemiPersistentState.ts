import { useEffect, useState } from "react";

// define generic type for the state
type StateType = string | number | null;

const useSemiPersistentState = <T extends StateType>(
  key: string,
  initialState: T
): [T, (newValue: T) => void] => {
  const storedValue = localStorage.getItem(key);
  const initial = storedValue ? JSON.parse(storedValue) : initialState;
  const [value, setValue] = useState<T>(initial);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
};

export { useSemiPersistentState };