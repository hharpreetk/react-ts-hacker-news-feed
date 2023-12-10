import { useEffect, useState } from "react";
import { useSemiPersistentState } from "../hooks/useSemiPersistentState";
import { useSearchSuggestions } from "../hooks/useSearchSuggestions";
import { useStories } from "../contexts/StoriesContext";
import { getStoriesUrl } from "../api/api";
import { useFetchStories } from "../hooks/useFetchStories";
import { AppShell, rem } from "@mantine/core";
import {
  COMMON_SORT_OPTIONS,
  CONTENT_OPTIONS,
  DATE_OPTIONS,
  JOB_SORT_OPTIONS,
} from "../constants/options";
import { useHeadroom } from "@mantine/hooks";
import AppHeader from "./AppHeader";
import StoryView from "./StoryView";
import StoryFilters from "./StoryFilters";
import AppFooter from "./AppFooter";

const App = () => {
  // State variables
  const stories = useStories();

  const [searchTerm, setSearchTerm] = useSemiPersistentState("search", "");

  const [selectedContent, setSelectedContent] = useState<string>(
    CONTENT_OPTIONS[0].value
  );

  const [selectedSort, setSelectedSort] = useState<string | null>(
    COMMON_SORT_OPTIONS[0].value // Select first option by default
  );

  const [selectedDate, setSelectedDate] = useState<string | null>(
    DATE_OPTIONS[0].value
  );

  const [activePage, setActivePage] = useState(0);

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

  const { data, isLoading, isError, error, totalPages } = stories;

  // Collaspe the header when user scrolls
  const pinned = useHeadroom({ fixedAt: 120 });

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

  return (
    <AppShell
      padding="md"
      header={{ height: 65, collapsed: !pinned, offset: false }}
      footer={{ height: { base: 80, xs: 60 } }}
      pos="relative"
    >
      <AppShell.Header>
        <AppHeader
          searchTerm={searchTerm}
          handleSearchInput={handleSearchInput}
          handleSearchSubmit={handleSearchSubmit}
          suggestions={suggestions}
        />
      </AppShell.Header>
      <AppShell.Main
        maw={`calc(${rem(800)} + 2*var(--mantine-spacing-md))`}
        m="auto"
        pt={`calc(${rem(65)} + var(--mantine-spacing-md))`}
      >
        <StoryFilters
          selectedContent={selectedContent}
          handleContentChange={handleContentChange}
          selectedSort={selectedSort}
          handleSortSelect={handleSortSelect}
          selectedDate={selectedDate}
          handleDateSelect={handleDateSelect}
        />
        <StoryView
          data={data}
          isLoading={isLoading}
          isError={isError}
          error={error}
          totalPages={totalPages}
          activePage={activePage}
          handleActivePage={handleActivePage}
        />
      </AppShell.Main>
      <AppShell.Footer pos="absolute" bottom={0} p="lg">
        <AppFooter />
      </AppShell.Footer>
    </AppShell>
  );
};

export default App;
