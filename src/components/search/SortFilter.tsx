import { Select } from "@mantine/core";
import { COMMON_SORT_OPTIONS, JOB_SORT_OPTIONS } from "../../constants/options";
import { useSearch } from "../../contexts/SearchContext";
import { IconSortDescending2 } from "@tabler/icons-react";
import { Options } from "../../types/options";
import classes from "../../styles/Select.module.css";

// Function to get sort options based on selected content
const getSortOptions = (selectedContent: string): Options => {
  // If selected content is "job," return job-specific options
  if (selectedContent === "job") {
    return JOB_SORT_OPTIONS;
  }
  // Otherwise, return common options
  return COMMON_SORT_OPTIONS;
};

const SortFilter: React.FC = () => {
  const { selectedSort, handleSortSelect, selectedContent } = useSearch();
  return (
    <Select
      classNames={{ root: classes.root, input: classes.input }}
      data={getSortOptions(selectedContent)}
      value={selectedSort}
      onChange={handleSortSelect}
      leftSection={<IconSortDescending2 size={17} stroke={1.5} />}
      allowDeselect={false}
      required
    />
  );
};

export default SortFilter;
