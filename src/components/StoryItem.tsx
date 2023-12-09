import { Card, Flex, Anchor, Group, Badge, Box, Text } from "@mantine/core";
import {
  TypographyStylesProvider,
  useMantineTheme,
  useMantineColorScheme,
} from "@mantine/core";
import "../styles/StoryItem.module.css";
import { Story, HighlightResult } from "../types/stories";
import { CONTENT_OPTIONS } from "../constants/options";
import { format } from "timeago.js";

interface StoryItemProps {
  item: Story;
  onRemoveItem: (item: Story) => void;
}

const StoryItem: React.FC<StoryItemProps> = ({ item, onRemoveItem }) => {
  const theme = useMantineTheme();

  const { colorScheme } = useMantineColorScheme();

  const handleRemoveItem = () => onRemoveItem(item);

  const getFormattedDate = (dateInput: string): string => {
    return format(new Date(dateInput));
  };

  const {
    title,
    url,
    author,
    story_text,
    job_text,
    _tags,
    _highlightResult,
    created_at,
  } = item;

  const getCategory = (): string => _tags[0];

  const getTags = (): string[] => {
    return CONTENT_OPTIONS.filter((option) => _tags.includes(option.value)).map(
      (option) => option.value.replace(/_/g, " ")
    );
  };

  const getContent = (): string | null => {
    switch (getCategory()) {
      case "story":
        return getHighlightedValue("story_text") || story_text;
      case "job":
        return getHighlightedValue("job_text") || job_text;
      default:
        return null;
    }
  };

  const getHighlightedValue = (
    field: keyof HighlightResult<Story>
  ): string | null => {
    return _highlightResult?.[field]?.value || null;
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
    const titleProps = {
      fw: 500,
      lh: "xs",
      c: theme.primaryColor,
    };

    const highlightWords = _highlightResult?.title?.matchedWords ?? [];

    const titleValue =
      highlightWords.length > 0 ? getHighlightedValue("title") : title;

    return (
      <TypographyStylesProvider
        p={0}
        m={0}
        styles={{ root: { marginBottom: 0 } }}
      >
        <Text
          {...titleProps}
          dangerouslySetInnerHTML={{ __html: `${titleValue}` }}
        />
      </TypographyStylesProvider>
    );
  };

  const renderUrl = () => {
    const UrlProps = {
      size: "sm",
      c:
        colorScheme === "dark"
          ? "var(--mantine-color-gray-5)"
          : "var(--mantine-color-gray-7)",
      lineClamp: 1,
    };

    const highlightWords = _highlightResult?.url?.matchedWords ?? [];

    const urlValue =
      highlightWords.length > 0 ? getHighlightedValue("url") : url;

    if (url) {
      return (
        <Anchor href={url} target="_blank" {...UrlProps}>
          <TypographyStylesProvider
            p={0}
            m={0}
            styles={{ root: { marginBottom: 0 } }}
          >
            <Text dangerouslySetInnerHTML={{ __html: `${urlValue}` }} />
          </TypographyStylesProvider>
        </Anchor>
      );
    }
  };

  const renderAuthor = () => {
    const highlightWords = _highlightResult?.author?.matchedWords ?? [];

    const authorValue =
      highlightWords.length > 0 ? getHighlightedValue("author") : author;

    return (
      <TypographyStylesProvider
        p={0}
        m={0}
        styles={{ root: { marginBottom: 0 } }}
      >
        <Text
          dangerouslySetInnerHTML={{ __html: `${authorValue}` }}
          size="sm"
        />
      </TypographyStylesProvider>
    );
  };

  const renderContent = () => {
    const contentProps = {
      lineClamp: 2,
      size: "sm",
      mb: 0,
      c: "dimmed",
    };
    if (getContent()) {
      return (
        <TypographyStylesProvider
          p={0}
          m={0}
          styles={{ root: { marginBottom: 0 } }}
        >
          <Text
            {...contentProps}
            dangerouslySetInnerHTML={{ __html: `${getContent()}` }}
          />
        </TypographyStylesProvider>
      );
    }
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
        {renderContent()}
        <Flex wrap="wrap" rowGap={3} columnGap="xs" align="center">
          {renderAuthor()}
          <Text size="xs">|</Text>
          <Text size="sm">{getFormattedDate(created_at)}</Text>
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
