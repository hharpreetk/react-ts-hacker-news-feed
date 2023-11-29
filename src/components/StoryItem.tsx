import { Card, Flex, Anchor, Group, Badge, Text } from "@mantine/core";
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

  // Function to get category tag
  const getCategory = (): string => {
    return item._tags[0];
  };

  return (
    <Card withBorder radius="md">
      <Flex direction="column" gap={3}>
        <Group justify="space-between" wrap="nowrap" align="start">
          <Anchor href={item.url} target="_blank" fw={500} lh="sm">
            {item.title}
          </Anchor>
          <Text>
            <Badge tt="uppercase" fw={700} size="sm" variant="light" radius={2}>
              {getCategory()}
            </Badge>
          </Text>
        </Group>
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
