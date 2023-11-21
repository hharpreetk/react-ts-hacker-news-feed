import { MultiValueTagOption } from "../types/options";
import Select from "react-select";
import { TAG_OPTIONS } from "../constants/options";

interface TagsFilterProps {
  selectedTags: MultiValueTagOption;
  onTagChange: (selectedOptions: MultiValueTagOption) => void;
}

const TagsFilter = ({ selectedTags, onTagChange }: TagsFilterProps) => (
  <div>
    <Select
      isMulti
      options={TAG_OPTIONS}
      value={selectedTags}
      onChange={onTagChange}
      placeholder="Select Types..."
    />
  </div>
);

export default TagsFilter;
