import Select from "react-select";
import { SingleValueSortOption } from "../types/options";
import { SORT_OPTIONS } from "../constants/options";

interface SortProps {
  selectedSort: SingleValueSortOption;
  onSortSelect: (selectedOption: SingleValueSortOption) => void;
}

const Sort = ({ selectedSort, onSortSelect }: SortProps) => {
  return (
    <Select
      options={SORT_OPTIONS}
      value={selectedSort}
      onChange={onSortSelect}
    />
  );
};

export default Sort;
