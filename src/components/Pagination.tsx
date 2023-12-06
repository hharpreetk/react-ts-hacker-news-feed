import { Group, Pagination as MantinePagination } from "@mantine/core";
import classes from "../styles/Custom.module.css";

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
    styles={{
      control: {
        height: "calc(var(--pagination-control-size)*1.35)",
        minWidth: "calc(var(--pagination-control-size)*1.35)",
      },
    }}
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
