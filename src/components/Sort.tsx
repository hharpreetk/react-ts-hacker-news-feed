import Select from "react-select";
import { SingleValueOption } from "../types/options";
import { SORT_OPTIONS } from "../constants/options";

interface SortProps {
  selectedSort: SingleValueOption;
  onSortSelect: (selectedOption: SingleValueOption) => void;
}

const Sort = ({ selectedSort, onSortSelect }: SortProps) => {
  return (
    <div>
      <label>Sort by:</label>
      <Select
        options={SORT_OPTIONS}
        value={selectedSort}
        onChange={onSortSelect}
      />
    </div>
  );
};

export default Sort;
