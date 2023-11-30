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

  const getPointsOrComments = (property: "points" | "num_comments") => {
    const category = getCategory();
    return category === "story" || category === "poll" ? item[property] : null;
  };

  const renderAnchor = () => {
    const category = getCategory();
    const link = category === "comment" ? item.story_url : item.url;
    const title =
      category === "comment" ? `ON: ${item.story_title}` : item.title;

    return (
      <Anchor href={link} target="_blank" fw={500} lh="sm">
        {title}
      </Anchor>
    );
  };

  return (
    <Card withBorder radius="md">
      <Flex direction="column" gap={3}>
        <Group justify="space-between" wrap="nowrap" align="start">
          {renderAnchor()}
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
          {getPointsOrComments("points") !== null && (
            <>
              <Text size="sm">
                {getPointsOrComments("points")}{" "}
                {getPointsOrComments("points") === 1 ? "point" : "points"}
              </Text>
              <Text size="xs">|</Text>
            </>
          )}
          {getPointsOrComments("num_comments") !== null && (
            <>
              <Text size="sm">
                {getPointsOrComments("num_comments")}{" "}
                {getPointsOrComments("num_comments") === 1
                  ? "comment"
                  : "comments"}
              </Text>
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
