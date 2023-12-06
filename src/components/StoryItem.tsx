import { Card, Flex, Anchor, Group, Badge, Box, Text } from "@mantine/core";
import { TypographyStylesProvider, useMantineTheme } from "@mantine/core";
import { Story } from "../types/stories";
import { TAG_OPTIONS } from "../constants/options";
import { format } from "timeago.js";

interface StoryItemProps {
  item: Story;
  onRemoveItem: (item: Story) => void;
}

const StoryItem: React.FC<StoryItemProps> = ({ item, onRemoveItem }) => {
  const theme = useMantineTheme();

  const handleRemoveItem = () => onRemoveItem(item);

  // Function to format date as "time ago"
  const getFormattedDate = (dateInput: string): string => {
    return format(new Date(dateInput));
  };

  // Function to get category
  const getCategory = (): string => {
    return item._tags[0];
  };

  // Function to get category tags
  const getTags = (): string[] => {
    const allTags = item._tags;
    const matchingTags = TAG_OPTIONS.filter((tagOption) =>
      allTags.includes(tagOption.value)
    );
    return matchingTags.map((tagOption) => tagOption.value.replace(/_/g, " "));
  };

  const getContent = () => {
    const category = getCategory();
    switch (category) {
      case "story":
        return item.story_text;
      case "job":
        return item.job_text;
      default:
        return null;
    }
  };

  const getPointsOrComments = (property: "points" | "num_comments") => {
    const category = getCategory();
    return category === "story" || category === "poll" ? item[property] : null;
  };

  const renderAnchor = () => {
    const { title, url } = item;

    // If url exists, render Anchor component, otherwise render Text component
    if (url) {
      return (
        <Anchor
          href={item.url}
          target="_blank"
          fw={500}
          lh="sm"
          c={theme.primaryColor}
        >
          {title}
        </Anchor>
      );
    } else {
      return (
        <Text fw={500} lh="sm">
          {title}
        </Text>
      );
    }
  };

  return (
    <Card withBorder radius="md">
      <Flex direction="column" gap={3}>
        <Group justify="space-between" wrap="nowrap" align="start">
          {renderAnchor()}
          <Box>
            <Group gap={6} justify="end">
              {getTags().map((tag, index) => (
                <Badge
                  key={index}
                  tt="uppercase"
                  fw={700}
                  size="sm"
                  variant="light"
                  radius={2}
                >
                  {tag}
                </Badge>
              ))}
            </Group>
          </Box>
        </Group>
        {getContent() && (
          <TypographyStylesProvider p={0} m={0}>
            <Text
              lineClamp={2}
              size="sm"
              mb={0}
              c="dimmed"
              dangerouslySetInnerHTML={{ __html: `${getContent()}` }}
            />
          </TypographyStylesProvider>
        )}
        <Flex wrap="wrap" rowGap={2} columnGap="xs" align="center">
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
          <Anchor size="sm" c={theme.primaryColor} onClick={handleRemoveItem}>
            Hide
          </Anchor>
        </Flex>
      </Flex>
    </Card>
  );
};

export default StoryItem;
