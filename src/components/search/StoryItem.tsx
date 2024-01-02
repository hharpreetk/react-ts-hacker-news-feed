import { useNavigate } from "react-router-dom";
import { Card, Flex, Anchor, Group, Badge, Box, Text } from "@mantine/core";
import { TypographyStylesProvider } from "@mantine/core";
import classes from "../../styles/Story.module.css";
import { Story, HighlightResult } from "../../types/stories";
import { CONTENT_OPTIONS } from "../../constants/options";
import { format } from "timeago.js";

interface StoryItemProps {
  item: Story;
  onRemoveItem: (item: Story) => void;
}

const StoryItem: React.FC<StoryItemProps> = ({ item, onRemoveItem }) => {
  const handleRemoveItem = () => onRemoveItem(item);

  const getFormattedDate = (dateInput: string): string => {
    return format(new Date(dateInput));
  };

  const {
    objectID,
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

  const getTag = (): string => {
    const filteredTags = CONTENT_OPTIONS.filter((option) =>
      _tags.includes(option.value)
    );
    return filteredTags[filteredTags.length - 1].value.replace(/_/g, " ");
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
    const highlightedWords = _highlightResult?.[field]?.matchedWords || [];
    return highlightedWords.length > 0
      ? _highlightResult?.[field]?.value || null
      : null;
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

  const typographyStylesProviderProps = {
    p: 0,
    m: 0,
    classNames: { root: classes.storyContent },
  };

  const renderTitle = () => {
    const titleProps = {
      fw: 500,
      lh: "xs",
      classNames: { root: classes.storyTitle },
    };

    return (
      <TypographyStylesProvider {...typographyStylesProviderProps}>
        <Text
          {...titleProps}
          dangerouslySetInnerHTML={{
            __html: `${getHighlightedValue("title") || title}`,
          }}
        />
      </TypographyStylesProvider>
    );
  };

  const renderUrl = () => {
    const UrlProps = {
      size: "sm",
      lineClamp: 1,
      classNames: { root: classes.storyUrl },
    };

    if (url) {
      return (
        <TypographyStylesProvider {...typographyStylesProviderProps}>
          <Anchor
            href={url}
            target="_blank"
            {...UrlProps}
            dangerouslySetInnerHTML={{
              __html: `${getHighlightedValue("url") || url}`,
            }}
          />
        </TypographyStylesProvider>
      );
    }
  };

  const renderAuthor = () => {
    return (
      <TypographyStylesProvider {...typographyStylesProviderProps}>
        <Text
          dangerouslySetInnerHTML={{
            __html: `${getHighlightedValue("author") || author}`,
          }}
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
      classNames: { root: classes.storyText },
    };
    if (getContent()) {
      return (
        <TypographyStylesProvider {...typographyStylesProviderProps}>
          <Text
            {...contentProps}
            dangerouslySetInnerHTML={{ __html: `${getContent()}` }}
          />
        </TypographyStylesProvider>
      );
    }
  };

  const navigate = useNavigate();

  const handleCardClick = () => {
    // Check if the content is a "job" before navigating
    if (getCategory() !== "job") {
      navigate(`story/${objectID}`, { state: item });
    }
  };

  return (
    <Card
      withBorder
      radius="md"
      component="a"
      onClick={handleCardClick}
      style={{
        cursor: getCategory() === "job" ? "auto" : "pointer",
      }}
    >
      <Flex direction="column" gap={2} classNames={{ root: classes.storyItem }}>
        <Flex justify="space-between" wrap="nowrap" align="start" gap="xs">
          {renderTitle()}
          <Box visibleFrom="xs">
            <Group>
              <Badge
                tt="uppercase"
                fw={700}
                size="sm"
                variant="light"
                radius={2}
              >
                {getTag()}
              </Badge>
            </Group>
          </Box>
        </Flex>
        {renderUrl()}
        {renderContent()}
        <Flex wrap="wrap" rowGap={2} columnGap="xs" align="center" mt={1}>
          {renderAuthor()}
          <Text size="xs">|</Text>
          <Text size="sm">{getFormattedDate(created_at)}</Text>
          <Text size="xs">|</Text>
          {getPointsOrComments("points")}
          {getPointsOrComments("num_comments")}
          <Anchor
            size="sm"
            classNames={{ root: classes.storyHide }}
            onClick={handleRemoveItem}
          >
            Hide
          </Anchor>
        </Flex>
      </Flex>
    </Card>
  );
};

export default StoryItem;
