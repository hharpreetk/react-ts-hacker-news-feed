import { useEffect, useState } from "react";
import { useSemiPersistentState } from "../hooks/useSemiPersistentState";
import { useSearchSuggestions } from "../hooks/useSearchSuggestions";
import { useStories } from "../contexts/StoriesContext";
import { getStoriesUrl } from "../api/api";
import { useFetchStories } from "../hooks/useFetchStories";
import { AppShell, rem } from "@mantine/core";
import { SORT_OPTIONS, TAG_OPTIONS, DATE_OPTIONS } from "../constants/options";
import {
  SORT_RESOURCE_FILTERS,
  DATE_NUMERIC_FILTERS,
} from "../constants/mappings";
import { useHeadroom } from "@mantine/hooks";
import AppHeader from "./AppHeader";
import StoryView from "./StoryView";
import StoryFilters from "./StoryFilters";
import AppFooter from "./AppFooter";

const App = () => {
  // State variables
  const stories = useStories();

  const [searchTerm, setSearchTerm] = useSemiPersistentState("search", "");

  const [selectedTag, setSelectedTag] = useState<string>(TAG_OPTIONS[0].value);

  const [selectedSort, setSelectedSort] = useState<string | null>(
    SORT_OPTIONS[0].value // Select first option by default
  );

  const [selectedDate, setSelectedDate] = useState<string | null>(
    DATE_OPTIONS[0].value
  );

  const [activePage, setPage] = useState(0);

  const dateFilter = selectedDate ? DATE_NUMERIC_FILTERS[selectedDate] : "";

  const sortResource = selectedSort ? SORT_RESOURCE_FILTERS[selectedSort] : "";

  const [url, setUrl] = useState<string>(
    getStoriesUrl(sortResource, searchTerm, selectedTag, dateFilter, activePage)
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
        sortResource,
        searchTerm,
        selectedTag,
        dateFilter,
        activePage
      )
    );
  }, [selectedTag, selectedSort, selectedDate, activePage]);

  const { data, isLoading, isError, totalPages } = stories;

  // Collaspe the header when user scrolls
  const pinned = useHeadroom({ fixedAt: 120 });

  // Event Handlers

  const handleSearchInput = (searchInput: string): void => {
    setSearchTerm(searchInput);
  };

  const handleSearchSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ): void => {
    event.preventDefault();
    setUrl(
      getStoriesUrl(
        sortResource,
        searchTerm,
        selectedTag,
        dateFilter,
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

  const handleTagChange = (selectedOptions: string) => {
    setSelectedTag(selectedOptions);
  };

  const handleSortSelect = (selectedOption: string | null) => {
    setSelectedSort(selectedOption);
  };

  const handleDateSelect = (selectedOption: string | null) => {
    setSelectedDate(selectedOption);
  };

  const handleActivePage = (selectedPage: number) => {
    setPage(selectedPage - 1);
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
          selectedTag={selectedTag}
          handleTagChange={handleTagChange}
          selectedSort={selectedSort}
          handleSortSelect={handleSortSelect}
          selectedDate={selectedDate}
          handleDateSelect={handleDateSelect}
        />
        <StoryView
          data={data}
          isLoading={isLoading}
          isError={isError}
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
