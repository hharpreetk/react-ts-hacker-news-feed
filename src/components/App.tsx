import { useEffect, useState } from "react";
import { sortBy } from "lodash";
import { Stories } from "../types/types";
import { useSemiPersistentState } from "../hooks/useSemiPersistentState";
import { useSearchSuggestions } from "../hooks/useSearchSuggestions";
import { useStories } from "../contexts/StoriesContext";
import { getRelevantStoriesUrl } from "../api/api";
import { useFetchStories } from "../hooks/useFetchStories";
import Search from "./StoriesSearch";
import StoriesSorter from "./StoriesSorter";
import StoriesList from "./StoriesList";

const SORTS: Record<
  string,
  { name: string; sortFunction: (list: Stories) => Stories }
> = {
  POINTS: {
    name: "Popularity",
    sortFunction: (list) => sortBy(list, "points"),
  },
  DATE_CREATED: {
    name: "Date",
    sortFunction: (list) => sortBy(list, "created_at"),
  },
  NUM_COMMENTS: {
    name: "Comments",
    sortFunction: (list) => sortBy(list, "num_comments"),
  },
  TITLE: { name: "Title", sortFunction: (list) => sortBy(list, "title") },
  AUTHOR: { name: "Author", sortFunction: (list) => sortBy(list, "author") },
};

const App = () => {
  const stories = useStories();

  const [searchTerm, setSearchTerm] = useSemiPersistentState("search", "React");

  const [url, setUrl] = useState<string>(
    getRelevantStoriesUrl(searchTerm, "story", "created_at_i>0", 0)
  );

  // State to store an array of urls representing last five searches
  const [suggestions, setSuggestions] = useSearchSuggestions(
    "searchSuggestions",
    []
  );

  const [sort, setSort] = useState<{ sortKey: string; isReverse: boolean }>({
    sortKey: "POINTS",
    isReverse: true,
  });

  const fetchStories = useFetchStories(url);

  // Fetch stories when the url changes
  useEffect(() => {
    fetchStories();
  }, [url]);

  const handleSortCriteriaSelect = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSort({ ...sort, sortKey: event.target.value });
  };

  const handleSortOrderChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSort({
      ...sort,
      isReverse: event.target.value === "DESCENDING",
    });
  };

  const getSortedList = (
    list: Stories,
    sortKey: string,
    isReverse: boolean
  ) => {
    const { sortFunction } = SORTS[sortKey];
    const sorted = sortFunction(list);
    return isReverse ? sorted.reverse() : sorted;
  };

  const { data, isLoading, isError } = stories;

  const handleSearchInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSearchTerm(event.target.value);
  };

  // Set Url when search is confirmed by the user
  const handleSearchSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ): void => {
    event.preventDefault();
    setUrl(getRelevantStoriesUrl(searchTerm, "story", "created_at_i>0", 0));
    setSearchSuggestion(searchTerm);
  };

  const setSearchSuggestion = (searchTerm: string) => {
    // Check if the search term doesn't already exist in the suggestions array
    if (!suggestions.includes(searchTerm)) {
      setSuggestions([searchTerm, ...suggestions].slice(0, 5)); // Limit the number of suggestions to last 5
    }
  };

  const { sortKey, isReverse } = sort;

  const sortedList = getSortedList(data, sortKey, isReverse);

  return (
    <div className="App">
      <h1>Hacker Stories</h1>
      <Search
        searchTerm={searchTerm}
        onSearchInput={handleSearchInput}
        onSearchSubmit={handleSearchSubmit}
        suggestions={suggestions}
      />
      <StoriesSorter
        sorts={SORTS}
        sort={sort}
        onSortCriteriaSelect={handleSortCriteriaSelect}
        onSortOrderChange={handleSortOrderChange}
      />
      {isError ? (
        <p>Something went wrong...</p>
      ) : isLoading ? (
        <LoadingIndicator />
      ) : data.length === 0 ? (
        <NoResults />
      ) : (
        <StoriesList list={sortedList} />
      )}
    </div>
  );
};

const LoadingIndicator = () => <p>Loading...</p>;

const NoResults = () => <p>No Results Found</p>;

export default App;
