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
import "../styles/Content.module.css";
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

  const renderTitle = () => {
    const { title, _highlightResult } = item;

    const titleProps = {
      fw: 500,
      lh: "xs",
      c: theme.primaryColor,
    };

    const highlightWords = _highlightResult?.title?.matchedWords ?? [];

    return (
      <Highlight highlight={highlightWords} {...titleProps}>
        {title}
      </Highlight>
    );
  };

  const renderUrl = () => {
    const { url, _highlightResult } = item;

    const UrlProps = {
      size: "sm",
      c: "dimmed",
      lineClamp: 1,
    };

    const urlHighlightWords = _highlightResult?.url?.matchedWords ?? [];

    if (url) {
      return (
        <Anchor href={url} target="_blank" {...UrlProps}>
          <Highlight highlight={urlHighlightWords}>{url}</Highlight>
        </Anchor>
      );
    }
  };

  const renderAuthor = () => {
    const { author, _highlightResult } = item;
    const highlightWords = _highlightResult?.author?.matchedWords ?? [];
    return (
      <Highlight highlight={highlightWords} size="sm">
        {author}
      </Highlight>
    );
  };

  return (
    <Card withBorder radius="md">
      <Flex direction="column" gap={1}>
        <Group justify="space-between" wrap="nowrap" align="start">
          {renderTitle()}
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
        {renderUrl()}
        {getContent() && (
          <TypographyStylesProvider
            p={0}
            m={0}
            styles={{ root: { marginBottom: 0 } }}
          >
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
          {/* {renderUrl()}
          <Text size="xs">|</Text> */}
          {renderAuthor()}
          <Text size="xs">|</Text>
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
