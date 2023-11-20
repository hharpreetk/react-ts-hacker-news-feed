import { Select, MenuItem } from "@mui/material";
import { SORT_OPTIONS } from "../constants/options";
import { Option } from "../types/options";

interface SortProps {
  selectedSort: string;
  onSortSelect: (selectedOption: string) => void;
}

const Sort = ({ selectedSort, onSortSelect }: SortProps) => {
  return (
    <Select
      value={selectedSort}
      onChange={(event) => {
        onSortSelect(event.target.value);
      }}
    >
      {SORT_OPTIONS.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default Sort;
