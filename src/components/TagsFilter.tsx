import { MultiSelect } from "@mantine/core";
import { TAG_OPTIONS } from "../constants/options";

interface TagsFilterProps {
  selectedTags: string[];
  onTagChange: (selectedOptions: string[]) => void;
}

const TagsFilter = ({ selectedTags, onTagChange }: TagsFilterProps) => (
  <div>
    <MultiSelect
      label="Filter by Story Type or Types"
      data={TAG_OPTIONS}
      value={selectedTags}
      onChange={onTagChange}
      placeholder="Select a type"
      hidePickedOptions
      clearable
      required
    />
  </div>
);

export default TagsFilter;
