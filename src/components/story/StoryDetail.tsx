import {
  Flex,
  Anchor,
  Text,
  TypographyStylesProvider,
  Box,
} from "@mantine/core";
import { Story } from "../../types/stories";
import { getFormattedDate, getPointsOrComments } from "../../utils/storyUtils";
import classes from "../../styles/Story.module.css";

interface StoryDetailProps {
  story: Story;
}

const StoryDetail: React.FC<StoryDetailProps> = ({ story }) => {
  const { title, url, author, created_at } = story;

  const getContent = (): string | null => {
    const category = story._tags[0];
    switch (category) {
      case "story":
        return story.story_text;
      case "job":
        return story.job_text;
      default:
        return null;
    }
  };

  const formattedDate = getFormattedDate(created_at);

  const points = getPointsOrComments(story, "points");

  const num_comments = getPointsOrComments(story, "num_comments");

  const renderContent = () => {
    const content = getContent();
    if (content) {
      return (
        <TypographyStylesProvider m={0} p={0}>
          <Box
            c="gray"
            style={{ fontSize: 14 }}
            dangerouslySetInnerHTML={{ __html: `${content}` }}
          />
        </TypographyStylesProvider>
      );
    }
  };

  return (
    <Flex direction="column" gap={6}>
      <div>
        <Text
          fw={600}
          size="lg"
          lh="xs"
          classNames={{ root: classes.storyTitle }}
          span
        >
          {title}
        </Text>
        {url && (
          <Anchor
            href={url}
            target="_blank"
            lineClamp={1}
            underline="always"
            size="sm"
            classNames={{ root: classes.storyUrl }}
          >
            {url}
          </Anchor>
        )}
        <Flex wrap="wrap" rowGap={2} columnGap="xs" align="center" mt={4}>
          <Text size="sm" span>
            {author}
          </Text>
          <Text size="xs" span>
            |
          </Text>
          <Text size="sm" span>
            {formattedDate}
          </Text>
          {points ? (
            <>
              <Text size="xs" span>
                |
              </Text>
              <Text size="sm" span>
                {points}
              </Text>
            </>
          ) : null}
          {num_comments ? (
            <>
              <Text size="xs" span>
                |
              </Text>
              <Text size="sm" span>
                {num_comments}
              </Text>
            </>
          ) : null}
        </Flex>
      </div>
      <div>{renderContent()}</div>
    </Flex>
  );
};

export default StoryDetail;
