import { ActionIcon, Autocomplete, rem } from "@mantine/core";
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
        leftSection={<IconSearch style={{ height: rem(12), width: rem(12), marginTop: 1 }} />}
        leftSectionWidth={33}
        rightSection={
          <ActionIcon type="submit" size={30} variant="filled" title="Submit Search" aria-label="Submit Search">
            <IconArrowRight style={{ height: rem(14), width: rem(14) }} />
          </ActionIcon>
        }
        maw={800}
        mx="auto"
      />
    </form>
  );
};

export default StorySearch;
