// StoryFilters.tsx
import React from "react";
import { Group } from "@mantine/core";
import TagFilter from "./TagFilter";
import SortFilter from "./SortFilter";
import DateFilter from "./DateFilter";

interface StoryFiltersProps {
  selectedTag: string;
  handleTagChange: (selectedOptions: string) => void;
  selectedSort: string | null;
  handleSortSelect: (selectedOption: string | null) => void;
  selectedDate: string | null;
  handleDateSelect: (selectedOption: string | null) => void;
}

const StoryFilters: React.FC<StoryFiltersProps> = ({
  selectedTag,
  handleTagChange,
  selectedSort,
  handleSortSelect,
  selectedDate,
  handleDateSelect,
}) => (
  <>
    <TagFilter selectedTag={selectedTag} onTagChange={handleTagChange} />
    <Group gap="sm">
      <SortFilter selectedSort={selectedSort} onSortSelect={handleSortSelect} />
      <DateFilter selectedDate={selectedDate} onDateSelect={handleDateSelect} />
    </Group>
  </>
);

export default StoryFilters;
