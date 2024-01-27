// StoryFilters.tsx
import React from "react";
import { Flex } from "@mantine/core";
import ContentFilter from "./ContentFilter";
import SortFilter from "./SortFilter";
import DateFilter from "./DateFilter";

const StoryFilters: React.FC = () => (
  <>
    <ContentFilter />
    <Flex rowGap="xs" columnGap={{ base: "sm", xs: "md" }} wrap="wrap">
      <SortFilter />
      <DateFilter />
    </Flex>
  </>
);

export default StoryFilters;
