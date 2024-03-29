import { useState, useEffect } from "react";
import { useSearchSuggestions } from "../hooks/useSearchSuggestions";
import { getStoriesUrl } from "../api/api";
import { useFetchStories } from "../hooks/useFetchStories";
import { JOB_SORT_OPTIONS } from "../constants/options";
import { SearchState } from "../types/search";
import { useQueryParamsState } from "./useQueryParamsState";
import { useSettings } from "../contexts/SettingsContext";
import { LOCAL_STORAGE_KEYS } from "../constants/keys";

const useSearchState = (): SearchState => {
  // Use the useSettings hook to get the settings values
  const [settings] = useSettings();

  const {
    hitsPerPage,
    defaultContent,
    defaultSort,
    defaultDateRange,
    authorText,
    storyText,
  } = settings;

  const [searchTerm, setSearchTerm] = useQueryParamsState<string>("query", "");

  const [selectedContent, setSelectedContent] = useQueryParamsState<
    string | null
  >("type", defaultContent);

  const [selectedSort, setSelectedSort] = useQueryParamsState<string | null>(
    "sort",
    selectedContent === "job" ? JOB_SORT_OPTIONS[0].value : defaultSort
  );

  const [selectedDate, setSelectedDate] = useQueryParamsState<string | null>(
    "dateRange",
    defaultDateRange
  );

  const [activePage, setActivePage] = useQueryParamsState<number>("page", 0);

  const [url, setUrl] = useState<string>(
    getStoriesUrl(
      selectedSort,
      searchTerm,
      selectedContent,
      selectedDate,
      activePage,
      hitsPerPage,
      authorText,
      storyText
    )
  );

  // State to store an array of urls representing last five searches
  const [suggestions, setSuggestions] = useSearchSuggestions(
    LOCAL_STORAGE_KEYS["SEARCH_SUGGESTIONS"],
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
        activePage,
        hitsPerPage,
        authorText,
        storyText
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
          0, // reset to the first page
          hitsPerPage,
          authorText,
          storyText
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
        activePage,
        hitsPerPage,
        authorText,
        storyText
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
    if (selectedOption === "job" && selectedSort === "popularity") {
      setSelectedSort(JOB_SORT_OPTIONS[0].value);
    }
  };

  const handleSortSelect = (selectedOption: string | null) => {
    setSelectedSort(selectedOption);

    // Reset the page
    setActivePage(0);
  };

  const handleDateSelect = (selectedOption: string | null) => {
    setSelectedDate(selectedOption);

    // Reset the page
    setActivePage(0);
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
