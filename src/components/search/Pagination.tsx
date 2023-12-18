import { Group, Pagination as MantinePagination, em } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import classes from "../../styles/Pagination.module.css";
import { useSearch } from "../../contexts/SearchContext";
import { useStories } from "../../contexts/StoriesContext";

const Pagination: React.FC = () => {
  const { totalPages } = useStories();
  const { activePage, handleActivePage } = useSearch();

  const isSmallScreen = useMediaQuery(`(max-width: ${em(576)})`);

  return (
    <MantinePagination.Root
      total={totalPages}
      value={activePage + 1}
      onChange={handleActivePage}
      size="sm"
      classNames={{ control: classes.control }}
      pt="xs"
      py="md"
      siblings={isSmallScreen ? 0 : 1}
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
