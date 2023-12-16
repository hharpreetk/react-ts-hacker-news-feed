import { Group, Pagination as MantinePagination } from "@mantine/core";
import classes from "../../styles/Pagination.module.css";
import { useSearch } from "../../contexts/SearchContext";
import { useStories } from "../../contexts/StoriesContext";

const Pagination: React.FC = () => {
  const { totalPages } = useStories();
  const { activePage, handleActivePage } = useSearch();
  return (
    <MantinePagination.Root
      total={totalPages}
      value={activePage + 1}
      onChange={handleActivePage}
      size="sm"
      classNames={{ control: classes.control }}
      py="sm"
      siblings={0}
    >
      <Group gap={5} justify="center">
        <MantinePagination.Previous />
        <MantinePagination.Items />
        <MantinePagination.Next />
      </Group>
    </MantinePagination.Root>
  );
};

export default Pagination;
