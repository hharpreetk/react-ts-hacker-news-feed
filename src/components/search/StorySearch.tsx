import { ActionIcon, Autocomplete } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconArrowRight, IconSearch } from "@tabler/icons-react";
import { useSearch } from "../../contexts/SearchContext";

const StorySearch: React.FC = () => {
  const { searchTerm, handleSearchInput, handleSearchSubmit, suggestions } =
    useSearch();
    
  const form = useForm({
    initialValues: { search: searchTerm },
  });

  return (
    <form onSubmit={form.onSubmit(handleSearchSubmit)}>
      <Autocomplete
        id="search"
        type="text"
        placeholder="Search here..."
        value={form.values.search}
        onChange={(value) => {
          form.setFieldValue("search", value);
          handleSearchInput(value);
        }}
        data={suggestions}
        leftSection={<IconSearch size={14} />}
        rightSection={
          <ActionIcon type="submit" size={30} variant="filled">
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
