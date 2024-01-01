import {
  Flex,
  Anchor,
  Text,
  TypographyStylesProvider,
  Box,
  Card,
} from "@mantine/core";
import { Story } from "../../types/stories";
import { format } from "timeago.js";
import classes from "../../styles/Story.module.css";

interface StoryDetailProps {
  story: Story;
}

const StoryDetail: React.FC<StoryDetailProps> = ({ story }) => {
  const getFormattedDate = (dateInput: string): string => {
    return format(new Date(dateInput));
  };

  const { title, url, author, story_text, job_text, _tags, created_at } = story;

  const getCategory = (): string => _tags[0];

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
      category === "story" || category === "poll" ? story[property] : null;

    if (value !== null) {
      const label = property === "points" ? "point" : "comment";
      return (
        <Text size="sm" span>
          {value} {value === 1 ? label : `${label}s`}
        </Text>
      );
    }

    return null;
  };

  const renderContent = () => {
    if (getContent()) {
      return (
        <TypographyStylesProvider m={0} p={0}>
          <Box
            c="gray"
            style={{ fontSize: 14 }}
            dangerouslySetInnerHTML={{ __html: `${getContent()}` }}
          />
        </TypographyStylesProvider>
      );
    }
  };

  return (
    <Flex direction="column" gap={2}>
      <Text fw={600} lh="xs" classNames={{ root: classes.storyTitle }} span>
        {title}
      </Text>
      {url && (
        <Anchor
          href={url}
          target="_blank"
          size="sm"
          lineClamp={1}
          classNames={{ root: classes.storyUrl }}
        >
          {url}
        </Anchor>
      )}
      <Flex wrap="wrap" rowGap={2} columnGap="xs" align="center" mt={1} mb={2}>
        <Text size="sm" span>
          {author}
        </Text>
        <Text size="xs" span>
          |
        </Text>
        <Text size="sm" span>
          {getFormattedDate(created_at)}
        </Text>
        {getPointsOrComments("points") ? (
          <>
            <Text size="xs" span>
              |
            </Text>
            {getPointsOrComments("points")}
          </>
        ) : null}
        {getPointsOrComments("num_comments") ? (
          <>
            <Text size="xs" span>
              |
            </Text>
            {getPointsOrComments("num_comments")}
          </>
        ) : null}
      </Flex>
      {renderContent()}
    </Flex>
  );
};

export default StoryDetail;
