import { Suspense, memo, useCallback, lazy } from "react";
import { Flex } from "@mantine/core";
import { Story } from "../../types/stories";
import StoryItem from "./StoryItem";
import { useStories, useStoriesDispatch } from "../../contexts/StoriesContext";
import StorySkeleton from "./StorySkeleton";

const StoryList: React.FC = memo(() => {
  const { data } = useStories();
  const dispatchStories = useStoriesDispatch();

  const handleRemoveItem = useCallback((item: Story) => {
    dispatchStories({ type: "REMOVE_STORY", payload: item });
  }, []);

  return (
    <Flex direction="column" gap="sm" my="md" maw={800} mx="auto">
      {data.map((item: Story) => (
        <Suspense fallback={<StorySkeleton />}>
          <StoryItem
            key={item.objectID}
            item={item}
            onRemoveItem={handleRemoveItem}
          />
        </Suspense>
      ))}
    </Flex>
  );
});

export default StoryList;