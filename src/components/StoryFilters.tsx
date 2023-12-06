// StoryFilters.tsx
import React from "react";
import { Group } from "@mantine/core";
import ContentFilter from "./ContentFilter";
import SortFilter from "./SortFilter";
import DateFilter from "./DateFilter";

interface StoryFiltersProps {
  selectedContent: string;
  handleContentChange: (selectedOptions: string) => void;
  selectedSort: string | null;
  handleSortSelect: (selectedOption: string | null) => void;
  selectedDate: string | null;
  handleDateSelect: (selectedOption: string | null) => void;
}

const StoryFilters: React.FC<StoryFiltersProps> = ({
  selectedContent,
  handleContentChange,
  selectedSort,
  handleSortSelect,
  selectedDate,
  handleDateSelect,
}) => (
  <>
    <ContentFilter selectedContent={selectedContent} onContentChange={handleContentChange} />
    <Group gap="sm">
      <SortFilter selectedSort={selectedSort} onSortSelect={handleSortSelect} />
      <DateFilter selectedDate={selectedDate} onDateSelect={handleDateSelect} />
    </Group>
  </>
);

export default StoryFilters;
