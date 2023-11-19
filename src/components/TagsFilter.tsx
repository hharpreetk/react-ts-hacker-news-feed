import Select from "react-select";
import { MultiValueOption } from "../types/options";
import { TAG_OPTIONS } from "../constants/options";
interface TagsFilterProps {
  selectedTags: MultiValueOption;
  onTagChange: (selectedOptions: MultiValueOption) => void;
}

const TagsFilter = ({ selectedTags, onTagChange }: TagsFilterProps) => {
  // Customize display logic for selected tags
  const displayTags = (tags: string[]) => {
    return tags.length > 1
      ? tags.slice(0, tags.length - 1).join(", ") +
          ` or ${tags[tags.length - 1]}`
      : tags;
  };

  return (
    <div>
      <label>Filter by Type:</label>
      <Select
        isMulti
        options={TAG_OPTIONS}
        value={selectedTags}
        onChange={onTagChange}
        placeholder="Select Type..."
      />
      {selectedTags.length ? (
        <p>Showing {displayTags(selectedTags.map((tag) => tag.label))}</p>
      ) : <p>Showing all types</p>}
    </div>
  );
};

export default TagsFilter;
