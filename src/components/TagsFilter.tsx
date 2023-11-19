import Select from "react-select";
import { MultiValueOption } from "../types/options";

interface TagsFilterProps {
  selectedTags: MultiValueOption;
  onTagChange: (selectedOptions: MultiValueOption) => void;
}

const options = [
  { value: "story", label: "Stories" },
  { value: "show_hn", label: "Show HN" },
  { value: "ask_hn", label: "Ask HN" },
  { value: "launch_hn", label: "Launch HN" },
  { value: "job", label: "Jobs" },
  { value: "poll", label: "Polls" },
  { value: "comment", label: "Comments" },
];

const TagsFilter = ({ selectedTags, onTagChange }: TagsFilterProps) => (
  <div>
    <label>Filter by Tags:</label>
    <Select
      isMulti
      options={options}
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
