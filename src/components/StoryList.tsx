import { Flex } from "@mantine/core";
import { memo, useCallback } from "react";
import { Story, Stories } from "../types/stories";
import Item from "./StoryItem";
import { useStoriesDispatch } from "../contexts/StoriesContext";

interface StoryListProps {
  list: Stories;
}

const StoryList: React.FC<StoryListProps> = memo(({ list }) => {
  const dispatchStories = useStoriesDispatch();
  const handleRemoveStory = useCallback((item: Story) => {
    dispatchStories({ type: "REMOVE_STORY", payload: item });
  }, []);
  return (
    <Flex direction="column" gap="sm" m="md" maw={800} mx="auto">
      {list.map((item: Story) => {
        return (
          <Item
            key={item.objectID}
            item={item}
            onRemoveItem={handleRemoveStory}
          />
        );
      })}
    </Flex>
  );
});

export default StoryList;
