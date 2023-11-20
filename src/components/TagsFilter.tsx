import { TagOption } from "../types/options";
import { TextField, Autocomplete, MenuItem } from "@mui/material";
import { TAG_OPTIONS } from "../constants/options";

interface TagsFilterProps {
  selectedTags: TagOption[];
  onTagChange: (selectedOptions: TagOption[]) => void;
}

const TagsFilter = ({ selectedTags, onTagChange }: TagsFilterProps) => {
  return (
    <Autocomplete
      multiple
      options={TAG_OPTIONS}
      value={selectedTags}
      onChange={(_, newValue) => {
        onTagChange(newValue);
      }}
      getOptionLabel={(option) => option.label}
      disableCloseOnSelect
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label="Select Type"
        />
      )}
      renderOption={(props, option) => (
        <MenuItem {...props} key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      )}
    />
  );
};

export default TagsFilter;
