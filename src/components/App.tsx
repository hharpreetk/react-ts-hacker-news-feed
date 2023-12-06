import { useEffect, useState } from "react";
import { useSemiPersistentState } from "../hooks/useSemiPersistentState";
import { useSearchSuggestions } from "../hooks/useSearchSuggestions";
import { useStories } from "../contexts/StoriesContext";
import { getStoriesUrl } from "../api/api";
import { useFetchStories } from "../hooks/useFetchStories";
import {
  AppShell,
  ThemeIcon,
  ActionIcon,
  Pagination,
  Grid,
  Group,
  Text,
  Anchor,
  Flex,
  Loader,
  rem,
  useMantineTheme,
} from "@mantine/core";
import classes from "../styles/Custom.module.css";
import { useHeadroom } from "@mantine/hooks";
import Search from "./Search";
import TagsFilter from "./TagsFilter";
import SortFilter from "./SortFilter";
import DateFilter from "./DateFilter";
import StoriesList from "./StoriesList";
import { SORT_OPTIONS, TAG_OPTIONS, DATE_OPTIONS } from "../constants/options";
import {
  SORT_RESOURCE_FILTERS,
  DATE_NUMERIC_FILTERS,
} from "../constants/mappings";
import { IconSquareLetterH, IconPencilCog } from "@tabler/icons-react";

const App = () => {
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

  // Update the URL when the selected tags change
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

  const handleSearchInput = (searchInput: string): void => {
    setSearchTerm(searchInput);
  };

  // Set Url when search is confirmed by the user
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
    // Check if the search term is not empty and doesn't already exist in the suggestions array
    if (searchTerm && !suggestions.includes(searchTerm)) {
      setSuggestions([searchTerm, ...suggestions].slice(0, 5)); // Limit the number of suggestions to the last 5
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

  // Collaspe the header when user scrolls
  const pinned = useHeadroom({ fixedAt: 120 });

  // Get theme object from
  const theme = useMantineTheme();

  return (
    <AppShell
      padding="md"
      header={{ height: 65, collapsed: !pinned, offset: false }}
      footer={{ height: { base: 80, xs: 60 } }}
      pos="relative"
    >
      <AppShell.Header>
        <Grid px="lg" py={14} align="center" justify="space-between">
          <ThemeIcon variant="transparent" size={37}>
            <IconSquareLetterH size={37} />
          </ThemeIcon>
          <Grid.Col span="auto" maw="90%">
            <Search
              searchTerm={searchTerm}
              onSearchInput={handleSearchInput}
              onSearchSubmit={handleSearchSubmit}
              suggestions={suggestions}
            />
          </Grid.Col>
          <ActionIcon variant="default" size="lg" aria-label="Edit Preferences">
            <IconPencilCog size={18} stroke={1.5} />
          </ActionIcon>
        </Grid>
      </AppShell.Header>
      <AppShell.Main
        maw={`calc(${rem(800)} + 2*var(--mantine-spacing-md))`}
        m="auto"
        pt={`calc(${rem(65)} + var(--mantine-spacing-md))`}
      >
        <TagsFilter selectedTag={selectedTag} onTagChange={handleTagChange} />
        <Group gap="sm">
          <SortFilter
            selectedSort={selectedSort}
            onSortSelect={handleSortSelect}
          />
          <DateFilter
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
          />
        </Group>
        {isError ? (
          <p>Something went wrong...</p>
        ) : isLoading ? (
          <Loader type="dots" mx="auto" my="lg" />
        ) : data.length === 0 ? (
          <NoResults />
        ) : (
          <>
            <StoriesList list={data} />
            <Pagination.Root
              total={totalPages}
              value={activePage + 1}
              onChange={handleActivePage}
              size="sm"
              styles={{
                control: {
                  height: "calc(var(--pagination-control-size)*1.35)",
                  minWidth: "calc(var(--pagination-control-size)*1.35)",
                },
              }}
              classNames={{ control: classes.control }}
              py="sm"
              siblings={0}
            >
              <Group gap={5} justify="center">
                <Pagination.Previous />
                <Pagination.Items />
                <Pagination.Next />
              </Group>
            </Pagination.Root>
          </>
        )}
      </AppShell.Main>
      <AppShell.Footer pos="absolute" bottom={0} p="lg">
        <Flex
          c="dimmed"
          direction={{ base: "column-reverse", xs: "row" }}
          justify={{ base: "center", xs: "space-between" }}
          gap="xs"
          align="center"
          wrap="wrap"
        >
          <Text size="xs">© Search Hacker News, 2023.</Text>
          <Text size="xs">
            Powered by{" "}
            <Anchor
              href="https://hn.algolia.com/api"
              target="_blank"
              c={theme.primaryColor}
            >
              HN Search API
            </Anchor>
          </Text>
        </Flex>
      </AppShell.Footer>
    </AppShell>
  );
};

const NoResults = () => <p>No Results Found</p>;

export default App;
