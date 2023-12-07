import { ActionIcon, Autocomplete } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconArrowRight, IconSearch } from "@tabler/icons-react";

interface StorySearchProps {
  searchTerm: string;
  onSearchInput: (searchInput: string) => void;
  onSearchSubmit: () => void;
  suggestions: Array<string>;
}

const StorySearch: React.FC<StorySearchProps> = ({
  searchTerm,
  onSearchInput,
  onSearchSubmit,
  suggestions,
}) => {
  const form = useForm({
    initialValues: { search: searchTerm },
  });
  
  return (
    <form onSubmit={form.onSubmit(onSearchSubmit)}>
      <Autocomplete
        id="search"
        type="text"
        placeholder="Search stories by title, url or author"
        value={form.values.search}
        onChange={(value) => {
          form.setFieldValue("search", value);
          onSearchInput(value);
        }}
        data={suggestions}
        leftSection={<IconSearch size={14} />}
        rightSection={
          <ActionIcon type="submit" size={30}>
            <IconArrowRight size={15} />
          </ActionIcon>
        }
        maw={800}
        mx="auto"
      />
    </form>
  );
};

export default StorySearch;
