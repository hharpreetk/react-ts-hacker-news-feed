import { Autocomplete, ActionIcon } from "@mantine/core";
import { IconSearch, IconArrowRight } from "@tabler/icons-react";

interface SearchProps {
  searchTerm: string;
  onSearchInput: (searchInput: string) => void;
  onSearchSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  suggestions: Array<string>;
}

const Search = ({
  searchTerm,
  onSearchInput,
  onSearchSubmit,
  suggestions,
}: SearchProps) => {
  return (
    <form onSubmit={onSearchSubmit}>
      <Autocomplete
        id="search"
        placeholder="Search stories by title, url or author"
        value={searchTerm}
        onChange={(value) => onSearchInput(value)}
        data={suggestions}
        leftSection={<IconSearch size={14} />}
        rightSection={
          <ActionIcon radius="xl" size={24} variant="filled" type="submit">
            <IconArrowRight size={14} />
          </ActionIcon>
        }
        autoFocus
      />
    </form>
  );
};

export default Search;
