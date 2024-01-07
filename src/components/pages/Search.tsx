import AppShell from "../shared/AppShell";
import StoryListView from "../search/StoryListView";
import StoryFilters from "../search/StoryFilters";

const Search: React.FC = () => {
  return (
    <AppShell>
      <StoryFilters />
      <StoryListView />
    </AppShell>
  );
};

export default Search;
