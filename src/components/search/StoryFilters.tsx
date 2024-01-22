// StoryFilters.tsx
import React from "react";
import { Flex, Group } from "@mantine/core";
import ContentFilter from "./ContentFilter";
import SortFilter from "./SortFilter";
import DateFilter from "./DateFilter";

const StoryFilters: React.FC = () => (
  <>
    <ContentFilter />
    <Flex rowGap="xs" columnGap="md" wrap="wrap">
      <SortFilter />
      <DateFilter />
    </Flex>
  </>
);

export default StoryFilters;
