import { Select } from "@mantine/core";
import { SORT_OPTIONS } from "../constants/options";

interface SortFilterProps {
  selectedSort: string | null;
  onSortSelect: (selectedOption: string | null) => void;
}

const SortFilter = ({ selectedSort, onSortSelect }: SortFilterProps) => {
  return (
    <Select
      label="Sort by"
      data={SORT_OPTIONS}
      value={selectedSort}
      onChange={onSortSelect}
    />
  );
};

export default SortFilter;
