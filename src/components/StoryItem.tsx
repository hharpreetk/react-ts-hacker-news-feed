import { Card, Flex, Anchor, Group, Badge, Box, Text } from "@mantine/core";
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

  const getContent = () => {
    const category = getCategory();
    switch (category) {
      case "story":
        return item.story_text;
      case "job":
        return item.job_text;
      case "comment":
        return item.comment_text;
      default:
        return null;
    }
  };

  const getPoints = () => {
    const category = getCategory();
    switch (category) {
      case "story":
        return item.points;
      case "poll":
        return item.points;
      default:
        return null;
    }
  };

  const getNumberOfComments = () => {
    const category = getCategory();
    switch (category) {
      case "story":
        return item.num_comments;
      case "poll":
        return item.num_comments;
      default:
        return null;
    }
  };

  return (
    <Card withBorder radius="md">
      <Flex direction="column" gap={3}>
        <Group justify="space-between" wrap="nowrap" align="start">
          {getCategory() === "comment" ? (
            <Anchor href={item.story_url} target="_blank" fw={500} lh="sm">
              ON: {item.story_title}
            </Anchor>
          ) : (
            <Anchor href={item.url} target="_blank" fw={500} lh="sm">
              {item.title}
            </Anchor>
          )}
          <Box>
            <Badge tt="uppercase" fw={700} size="sm" variant="light" radius={2}>
              {getCategory()}
            </Badge>
          </Box>
        </Group>
        {getContent() && (
          <Text lineClamp={2} size="sm" mb={2}>
            {getContent()}
          </Text>
        )}
        <Flex wrap="wrap" rowGap={2} columnGap="xs" align="center" c="dimmed">
          <Text size="sm">{item.author}</Text>
          <Text size="xs">|</Text>
          <Text size="sm">{getFormattedDate(item.created_at)}</Text>
          <Text size="xs">|</Text>
          {getPoints() !== null && (
            <>
              <Text size="sm">{getPoints()} points</Text>
              <Text size="xs">|</Text>
            </>
          )}
          {getNumberOfComments() !== null && (
            <>
              <Text size="sm">{getNumberOfComments()} comments</Text>
              <Text size="xs">|</Text>
            </>
          )}
          <Anchor size="sm" onClick={handleRemoveItem}>
            Hide
          </Anchor>
        </Flex>
      </Flex>
    </Card>
  );
};

export default StoryItem;
