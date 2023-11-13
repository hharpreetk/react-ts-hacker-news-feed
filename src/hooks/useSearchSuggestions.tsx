import { useEffect, useState } from "react";

// Custom hook for managing search suggestions in local storage
const useSearchSuggestions = (key: string, initialState: string[]) => {
  // Retrieve the stored suggestions from local storage using the specified key
  const storedSuggestions = localStorage.getItem(key);

  // If storedSuggestions is not null, parse it as JSON; otherwise, use the provided initial state
  const initialSuggestions = storedSuggestions
    ? JSON.parse(storedSuggestions)
    : initialState;

  // Initialize the 'suggestions' state using the parsed suggestions or the provided initial state
  const [suggestions, setSuggestions] = useState<string[]>(initialSuggestions);

  // Update local storage when suggestions change
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(suggestions));
  }, [suggestions]);

  // Return current suggestions array and a function to set hew suggestions
  return [suggestions, setSuggestions];
};

export { useSearchSuggestions };
