import { Card, Flex, Anchor, Divider, Text } from "@mantine/core";
import { Story } from "../types/stories";
import { format } from "timeago.js";

interface StoryItemProps {
  item: Story;
  onRemoveItem: (item: Story) => void;
}

const StoryItem = ({ item, onRemoveItem }: StoryItemProps) => {
  const handleRemoveItem = () => onRemoveItem(item);

  // Function to format date as "time ago"
  const getFormattedDate = (dateInput: string): string => {
    return format(new Date(dateInput));
  };

  return (
    <Card withBorder radius="md">
      <Flex direction="column" gap={3}>
        <Anchor href={item.url} target="_blank" fw={500} lh="sm">
          {item.title}
        </Anchor>
        {item.story_text ? (
          <Text lineClamp={2} size="sm" c="dimmed" mb={2}>
            {item.story_text}
          </Text>
        ) : null}
        <Flex wrap="wrap" rowGap={2} columnGap="xs" align="center">
          <Text size="sm">{item.author}</Text>
          <Text size="xs">|</Text>
          <Text size="sm">{item.points} points</Text>
          <Text size="xs">|</Text>
          <Text size="sm">{item.num_comments} comments</Text>
          <Text size="xs">|</Text>
          <Text size="sm">{getFormattedDate(item.created_at)}</Text>
          <Text size="xs">|</Text>
          <Anchor size="sm" onClick={handleRemoveItem}>
            Hide
          </Anchor>
        </Flex>
      </Flex>
    </Card>
  );
};

export default StoryItem;
