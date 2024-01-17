import {
  Flex,
  Anchor,
  Text,
  TypographyStylesProvider,
  Box,
} from "@mantine/core";
import StoryComment from "./StoryComment";
import { getFormattedDate } from "../../utils/storyUtils";
import { Comment, Story } from "../../types/story";
import classes from "../../styles/Story.module.css";

interface StoryDetailProps {
  story: Story;
}

const StoryDetail: React.FC<StoryDetailProps> = ({ story }) => {
  const { title, url, author, created_at, text, points, children } = story;

  const calculateTotalComments = (comments: Comment[] | undefined): number => {
    let total = comments ? comments.length : 0;

    if (comments && comments.length > 0) {
      comments.forEach((comment: Comment) => {
        total += calculateTotalComments(comment.children);
      });
    }

    return total;
  };

  const num_comments = calculateTotalComments(children);

  const formattedDate = getFormattedDate(created_at);

  const renderContent = () => {
    if (text) {
      return (
        <TypographyStylesProvider
          m={0}
          p={0}
          classNames={{ root: classes.storyDetail }}
        >
          <Box fz="sm" dangerouslySetInnerHTML={{ __html: `${text}` }} />
        </TypographyStylesProvider>
      );
    }
  };

  const renderComments = () => {
    if (children) {
      return children.map((comment: Comment) => (
        <Flex direction="column" mb={7} key={comment.id}>
          <StoryComment comment={comment} />
        </Flex>
      ));
    } else {
      return null;
    }
  };

  return (
    <Flex direction="column" gap={6}>
      <div>
        <Text
          fw={600}
          fz="lg"
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
            fz="sm"
            classNames={{ root: classes.storyUrl }}
          >
            {url}
          </Anchor>
        )}
        <Flex wrap="wrap" rowGap={2} columnGap="xs" align="center" mt={4}>
          <Text fz="sm" translate="no" span>
            {author}
          </Text>
          <Text fz="xs" span>
            |
          </Text>
          <Text fz="sm" span>
            {formattedDate}
          </Text>
          {points && (
            <>
              <Text fz="xs" span>
                |
              </Text>
              <Text fz="sm" span>
                {points} point{points === 1 ? "" : "s"}
              </Text>
            </>
          )}
          {children && (
            <>
              <Text fz="xs" span>
                |
              </Text>
              <Text fz="sm" span>
                {num_comments} comment
                {num_comments > 1 || num_comments === 0 ? "s" : ""}
              </Text>
            </>
          )}
        </Flex>
      </div>
      {renderContent() && <div>{renderContent()}</div>}
      {num_comments ? (
        <Flex direction="column" mt={6}>
          <Text fz="sm">Comments ({num_comments})</Text>
          {renderComments()}
        </Flex>
      ) : null}
    </Flex>
  );
};

export default StoryDetail;
