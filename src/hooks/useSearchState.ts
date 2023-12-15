import { useState, useEffect } from "react";
import { useSearchSuggestions } from "../hooks/useSearchSuggestions";
import { getStoriesUrl } from "../api/api";
import { useFetchStories } from "../hooks/useFetchStories";
import {
  COMMON_SORT_OPTIONS,
  CONTENT_OPTIONS,
  DATE_OPTIONS,
  JOB_SORT_OPTIONS,
} from "../constants/options";
import { SearchState } from "../types/search";

const useSearchState = (): SearchState => {
  // State variables

  const [searchTerm, setSearchTerm] = useState<string>("");

  const [selectedContent, setSelectedContent] = useState<string>(
    CONTENT_OPTIONS[0].value
  );

  const [selectedSort, setSelectedSort] = useState<string | null>(
    selectedContent === "job"
      ? JOB_SORT_OPTIONS[0].value
      : COMMON_SORT_OPTIONS[0].value
  );

  const [selectedDate, setSelectedDate] = useState<string | null>(
    DATE_OPTIONS[0].value
  );

  const [activePage, setActivePage] = useState<number>(0);

  const [url, setUrl] = useState<string>(
    getStoriesUrl(
      selectedSort,
      searchTerm,
      selectedContent,
      selectedDate,
      activePage
    )
  );

  // State to store an array of urls representing last five searches
  const [suggestions, setSuggestions] = useSearchSuggestions(
    "searchSuggestions",
    []
  );

  const fetchStories = useFetchStories(url);

  // Fetch stories when the url changes
  useEffect(() => {
    fetchStories();
  }, [url]);

  // Update the URL when dependencies change
  useEffect(() => {
    setUrl(
      getStoriesUrl(
        selectedSort,
        searchTerm,
        selectedContent,
        selectedDate,
        activePage
      )
    );
  }, [selectedContent, selectedSort, selectedDate, activePage]);

  // Event Handlers

  const handleSearchInput = (searchInput: string): void => {
    setSearchTerm(searchInput);
    // If the search input is empty, reset the URL and fetch default stories
    if (!searchInput.trim()) {
      setUrl(
        getStoriesUrl(
          selectedSort,
          "", // empty search query
          selectedContent,
          selectedDate,
          0 // reset to the first page
        )
      );
    }
  };

  const handleSearchSubmit = (): void => {
    setUrl(
      getStoriesUrl(
        selectedSort,
        searchTerm,
        selectedContent,
        selectedDate,
        activePage
      )
    );
    setSearchSuggestion(searchTerm);
  };

  const setSearchSuggestion = (searchTerm: string) => {
    if (searchTerm && !suggestions.includes(searchTerm)) {
      setSuggestions([searchTerm, ...suggestions].slice(0, 5));
    }
  };

  const handleContentChange = (selectedOption: string) => {
    // Reset the page to first page every time user switches between content
    setActivePage(0);

    setSelectedContent(selectedOption);

    // If the selected content is "job," update the selectedSort state to "date"
    if (selectedOption === "job") {
      setSelectedSort(JOB_SORT_OPTIONS[0].value);
    } else {
      setSelectedSort(COMMON_SORT_OPTIONS[0].value);
    }
  };

  const handleSortSelect = (selectedOption: string | null) => {
    setSelectedSort(selectedOption);
  };

  const handleDateSelect = (selectedOption: string | null) => {
    setSelectedDate(selectedOption);
  };

  const handleActivePage = (selectedPage: number) => {
    setActivePage(selectedPage - 1);
  };

  return {
    searchTerm,
    selectedContent,
    selectedSort,
    selectedDate,
    activePage,
    suggestions,
    handleSearchInput,
    handleSearchSubmit,
    handleContentChange,
    handleSortSelect,
    handleDateSelect,
    handleActivePage,
  };
};

export default useSearchState;
