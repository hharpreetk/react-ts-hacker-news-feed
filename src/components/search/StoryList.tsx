import { Flex } from "@mantine/core";
import { memo, useCallback } from "react";
import { Story } from "../../types/stories";
import Item from "./StoryItem";
import { useStories, useStoriesDispatch } from "../../contexts/StoriesContext";

const StoryList: React.FC = memo(() => {
  const { data } = useStories();
  const dispatchStories = useStoriesDispatch();

  const handleRemoveItem = useCallback((item: Story) => {
    dispatchStories({ type: "REMOVE_STORY", payload: item });
  }, []);

  return (
    <Flex direction="column" gap="sm" m="md" maw={800} mx="auto">
      {data.map((item: Story) => {
        return (
          <Item
            key={item.objectID}
            item={item}
            onRemoveItem={handleRemoveItem}
          />
        );
      })}
    </Flex>
  );
});

export default StoryList;
