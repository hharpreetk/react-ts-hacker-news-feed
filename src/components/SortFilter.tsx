import { Select } from "@mantine/core";
import { COMMON_SORT_OPTIONS, JOB_SORT_OPTIONS } from "../constants/options";
import { IconSortDescending2 } from "@tabler/icons-react";
import { Options } from "../types/options";
import classes from "../styles/Select.module.css";

interface SortFilterProps {
  selectedSort: string | null;
  onSortSelect: (selectedOption: string | null) => void;
  selectedContent: string;
}

// Function to get sort options based on selected content
const getSortOptions = (selectedContent: string): Options => {
  // If selected content is "job," return job-specific options
  if (selectedContent === "job") {
    return JOB_SORT_OPTIONS;
  }
  // Otherwise, return common options
  return COMMON_SORT_OPTIONS;
};

const SortFilter: React.FC<SortFilterProps> = ({
  selectedSort,
  onSortSelect,
  selectedContent,
}) => {
  return (
    <Select
      maw={{ base: 180, xs: "auto" }}
      classNames={{ input: classes.input }}
      data={getSortOptions(selectedContent)}
      value={selectedSort}
      onChange={onSortSelect}
      leftSection={<IconSortDescending2 size={17} stroke={1.5} />}
      allowDeselect={false}
      required
    />
  );
};

export default SortFilter;
