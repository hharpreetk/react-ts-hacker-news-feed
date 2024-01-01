import AppShell from "../shared/AppShell";
import StoryView from "../search/StoryView";
import StoryFilters from "../search/StoryFilters";

const Search: React.FC = () => {
  return (
    <AppShell>
      <StoryFilters />
      <StoryView />
    </AppShell>
  );
};

export default Search;
