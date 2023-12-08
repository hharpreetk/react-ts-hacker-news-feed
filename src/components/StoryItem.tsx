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
import {
  TypographyStylesProvider,
  useMantineTheme,
  useMantineColorScheme,
} from "@mantine/core";
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
        return story_text;
      case "job":
        return job_text;
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
    const UrlProps = {
      size: "sm",
      c:
        colorScheme === "dark"
          ? "var(--mantine-color-gray-5)"
          : "var(--mantine-color-gray-7)",
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
