import { Group, Pagination as MantinePagination } from "@mantine/core";
import classes from "../../styles/Pagination.module.css";

interface PaginationProps {
  totalPages: number;
  activePage: number;
  handleActivePage: (selectedPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  activePage,
  handleActivePage,
}) => (
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

export default Pagination;
