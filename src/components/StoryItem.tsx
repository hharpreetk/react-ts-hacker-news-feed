import {
  Card,
  Flex,
  Anchor,
  Group,
  Badge,
  Box,
  Text,
  Highlight,
} from "@mantine/core";
import { TypographyStylesProvider, useMantineTheme } from "@mantine/core";
import { Story } from "../types/stories";
import { CONTENT_OPTIONS } from "../constants/options";
import { format } from "timeago.js";

interface StoryItemProps {
  item: Story;
  onRemoveItem: (item: Story) => void;
}

const StoryItem: React.FC<StoryItemProps> = ({ item, onRemoveItem }) => {
  const theme = useMantineTheme();

  const handleRemoveItem = () => onRemoveItem(item);

  const getFormattedDate = (dateInput: string): string => {
    return format(new Date(dateInput));
  };

  const getCategory = (): string => item._tags[0];

  const getTags = (): string[] => {
    const allTags = item._tags;
    return CONTENT_OPTIONS.filter((option) =>
      allTags.includes(option.value)
    ).map((option) => option.value.replace(/_/g, " "));
  };

  const getContent = (): string | null => {
    switch (getCategory()) {
      case "story":
        return item.story_text;
      case "job":
        return item.job_text;
      default:
        return null;
    }
  };

  const getPointsOrComments = (
    property: "points" | "num_comments"
  ): React.ReactNode => {
    const category = getCategory();
    const value =
      category === "story" || category === "poll" ? item[property] : null;

    if (value !== null) {
      const label = property === "points" ? "point" : "comment";
      return (
        <>
          <Text size="sm">
            {value} {value === 1 ? label : `${label}s`}
          </Text>
          <Text size="xs">|</Text>
        </>
      );
    }

    return null;
  };

  const renderAnchor = () => {
    const { title, url, _highlightResult } = item;
    const titleProps = {
      fw: 500,
      lh: "xs",
      c: theme.primaryColor,
    };

    const highlightWords = _highlightResult?.title?.matchedWords ?? [];

    if (url) {
      return (
        <Anchor href={url} target="_blank" {...titleProps}>
          <Highlight highlight={highlightWords} fw={500}>
            {title}
          </Highlight>
        </Anchor>
      );
    } else {
      return (
        <Highlight highlight={highlightWords} {...titleProps}>
          {title}
        </Highlight>
      );
    }
  };

  const renderAuthor = () => {
    const { author, _highlightResult } = item;
    const highlightWords = _highlightResult?.author?.matchedWords ?? [];
    return (
      <>
        <Highlight highlight={highlightWords} size="sm">
          {author}
        </Highlight>
        <Text size="xs">|</Text>
      </>
    );
  };

  return (
    <Card withBorder radius="md">
      <Flex direction="column" gap={2}>
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
        <Flex wrap="wrap" rowGap={3} columnGap="xs" align="center">
          {renderAuthor()}
          <Text size="sm">{getFormattedDate(item.created_at)}</Text>
          <Text size="xs">|</Text>
          {getPointsOrComments("points")}
          {getPointsOrComments("num_comments")}
          <Anchor size="sm" c={theme.primaryColor} onClick={handleRemoveItem}>
            Hide
          </Anchor>
        </Flex>
      </Flex>
    </Card>
  );
};

export default StoryItem;
