import { ReactNode, createContext, useContext } from "react";
import useSearchState from "../hooks/useSearchState";
import { SearchState } from "../types/search";

interface SearchContextProps {
  children: ReactNode;
}

const SearchContext = createContext<SearchState | undefined>(undefined);

export const SearchProvider: React.FC<SearchContextProps> = ({ children }) => {
  const searchState = useSearchState();

  return (
    <SearchContext.Provider value={searchState}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};
