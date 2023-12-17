import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useLocation } from "react-router-dom";

type ValueTypes = number | string | null;

type UseQueryParamsStateReturnType<T> = [T, Dispatch<SetStateAction<T>>];

export const useQueryParamsState = <T extends ValueTypes>(
  param: string,
  initialState: T = null as T
): UseQueryParamsStateReturnType<T> => {
  const location = useLocation();

  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialState;
    const { search } = window.location;
    const searchParams = new URLSearchParams(search);
    return searchParams.has(param)
      ? (searchParams.get(param) as T)
      : initialState;
  });

  useEffect(() => {
    if (location.pathname === "/") {
      const currentSearchParams = new URLSearchParams(window.location.search);
      if (value !== null && value !== "") {
        currentSearchParams.set(param, String(value));
      } else {
        currentSearchParams.delete(param);
      }

      const newUrl = [window.location.pathname, currentSearchParams.toString()]
        .filter(Boolean)
        .join("?");

      window.history.replaceState(window.history.state, "", newUrl);
    }
  }, [param, value]);
  return [value, setValue];
};
