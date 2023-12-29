type SearchState = {
  searchTerm: string;
  selectedContent: string | null;
  selectedSort: string | null;
  selectedDate: string | null;
  activePage: number;
  suggestions: string[];
  handleSearchInput: (searchInput: string) => void;
  handleSearchSubmit: () => void;
  handleContentChange: (selectedOption: string) => void;
  handleSortSelect: (selectedOption: string | null) => void;
  handleDateSelect: (selectedOption: string | null) => void;
  handleActivePage: (selectedPage: number) => void;
};

export { SearchState };
