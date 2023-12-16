// StoryFilters.tsx
import React from "react";
import { Group } from "@mantine/core";
import ContentFilter from "./ContentFilter";
import SortFilter from "./SortFilter";
import DateFilter from "./DateFilter";

const StoryFilters: React.FC = () => (
  <>
    <ContentFilter />
    <Group gap="sm">
      <SortFilter />
      <DateFilter />
    </Group>
  </>
);

export default StoryFilters;
