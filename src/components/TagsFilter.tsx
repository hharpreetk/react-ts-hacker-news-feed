import Select from "react-select";
import { MultiValueOption } from "../types/options";
import { OPTIONS } from "../constants/options";

interface TagsFilterProps {
  selectedTags: MultiValueOption;
  onTagChange: (selectedOptions: MultiValueOption) => void;
}

const TagsFilter = ({ selectedTags, onTagChange }: TagsFilterProps) => (
  <div>
    <label>Filter by Tags:</label>
    <Select
      isMulti
      options={OPTIONS}
      value={selectedTags}
      onChange={onTagChange}
    />
    {selectedTags.length ? (
      <p>Showing {selectedTags.map((tag) => tag.label).join(" or ")}</p>
    ) : (
      <></>
    )}
  </div>
);

export default TagsFilter;
