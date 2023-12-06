import { Autocomplete } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

interface StorySearchProps {
  searchTerm: string;
  onSearchInput: (searchInput: string) => void;
  onSearchSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  suggestions: Array<string>;
}

const StorySearch: React.FC<StorySearchProps> = ({
  searchTerm,
  onSearchInput,
  onSearchSubmit,
  suggestions,
}) => {
  return (
    <form onSubmit={onSearchSubmit}>
      <Autocomplete
        id="search"
        placeholder="Search stories by title, url or author"
        value={searchTerm}
        onChange={(value) => onSearchInput(value)}
        data={suggestions}
        leftSection={<IconSearch size={14} />}
        maw={800}
        mx="auto"
      />
    </form>
  );
};

export default StorySearch;
