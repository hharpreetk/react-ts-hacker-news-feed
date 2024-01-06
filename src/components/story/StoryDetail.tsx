import { useLocation } from "react-router-dom";
import {
  Flex,
  Anchor,
  Text,
  TypographyStylesProvider,
  Box,
} from "@mantine/core";
import { getFormattedDate, getPointsOrComments } from "../../utils/storyUtils";
import { useFetchComments } from "../../hooks/useFetchComments";
import classes from "../../styles/Story.module.css";

const StoryDetail: React.FC = () => {
  const location = useLocation();

  const story = location.state;

  const {
    objectID,
    title,
    url,
    author,
    created_at,
    _tags,
    story_text,
    job_text,
  } = story;

  const getContent = (): string | null => {
    const category = _tags[0];
    switch (category) {
      case "story":
        return story_text;
      case "job":
        return job_text;
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

  const renderComments = () => {
    const { data, isLoading, error } = useFetchComments(objectID);
    if (isLoading) {
      return <Text>Loading comments...</Text>;
    }

    if (error) {
      return <Text>Error fetching comments: {error.message}</Text>;
    }


    return (
      <ul>
        {data.map((comment: any) => (
          <li key={comment.id}>{comment.text}</li>
        ))}
      </ul>
    );
  };

  renderComments();

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
      <div>{renderComments()}</div>
    </Flex>
  );
};

export default StoryDetail;
