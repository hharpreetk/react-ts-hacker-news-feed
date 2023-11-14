import { useEffect, useState } from "react";

const useSearchSuggestions = (
  key: string,
  initialState: string[],
): [string[], (newSuggestions: string[]) => void] => {
  const storedSuggestions = localStorage.getItem(key);

  // If storedSuggestions is not null, parse it as JSON; otherwise, use the provided initial state
  const initialSuggestions = storedSuggestions
    ? JSON.parse(storedSuggestions)
    : initialState;

  const [suggestions, setSuggestions] = useState<string[]>(initialSuggestions);

  // Update local storage when suggestions change
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(suggestions));
  }, [suggestions]);

  return [suggestions, setSuggestions];
};

export { useSearchSuggestions };
