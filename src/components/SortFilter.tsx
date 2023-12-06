import { Select } from "@mantine/core";
import { SORT_OPTIONS } from "../constants/options";
import { IconSortDescending2 } from "@tabler/icons-react";

interface SortFilterProps {
  selectedSort: string | null;
  onSortSelect: (selectedOption: string | null) => void;
}

const SortFilter = ({ selectedSort, onSortSelect }: SortFilterProps) => {
  return (
    <Select
      maw={{ base: 180, xs: "auto" }}
      styles={{ input: { height: 38 } }}
      data={SORT_OPTIONS}
      value={selectedSort}
      onChange={onSortSelect}
      leftSection={<IconSortDescending2 size={17} stroke={1.5} />}
      allowDeselect={false}
      required
    />
  );
};

export default SortFilter;
