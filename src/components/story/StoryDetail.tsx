import {
  Flex,
  Anchor,
  Text,
  TypographyStylesProvider,
  Box,
  Paper,
  Space,
} from "@mantine/core";
import { getFormattedDate } from "../../utils/storyUtils";
import classes from "../../styles/Story.module.css";

interface StoryDetailProps {
  story: {
    title: string;
    url: string;
    author: string;
    text: string | null;
    points: number;
    created_at: string;
    children: [];
  };
}

const StoryDetail: React.FC<StoryDetailProps> = ({ story }) => {
  const { title, url, author, created_at, text, points, children } = story;

  const num_comments = children.length;

  const formattedDate = getFormattedDate(created_at);

  const renderContent = () => {
    if (text) {
      return (
        <TypographyStylesProvider m={0} p={0}>
          <Box
            c="gray"
            style={{ fontSize: 14 }}
            dangerouslySetInnerHTML={{ __html: `${text}` }}
          />
        </TypographyStylesProvider>
      );
    }
  };

  const renderComments = () => {
    if (children) {
      return children.map((comment: any) => (
        <Flex direction="column" key={comment.id} mb="md">
          {/* <Paper p="xs" my={6} withBorder> */}
            <Flex direction="column" gap={4}>
              <Flex wrap="wrap" rowGap={2} columnGap="xs" align="center">
                <Text fz="sm" span>
                  {comment.author}
                </Text>
                <Text fz="xs" span>
                  |
                </Text>
                <Text fz="sm" span>
                  {getFormattedDate(comment.created_at)}
                </Text>
              </Flex>
              <TypographyStylesProvider m={0} p={0}>
                <Box
                  c="gray"
                  style={{ fontSize: 14 }}
                  dangerouslySetInnerHTML={{ __html: `${comment.text}` }}
                />
              </TypographyStylesProvider>
            </Flex>
          {/* </Paper> */}
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
          {points && (
            <>
              <Text size="xs" span>
                |
              </Text>
              <Text size="sm" span>
                {points} point{points === 1 ? "" : "s"}
              </Text>
            </>
          )}
          {children && (
            <>
              <Text size="xs" span>
                |
              </Text>
              <Text size="sm" span>
                {num_comments} comment
                {num_comments > 1 || num_comments === 0 ? "s" : ""}
              </Text>
            </>
          )}
        </Flex>
      </div>
      {renderContent() && <div>{renderContent()}</div>}
      {num_comments ? (
        <Flex direction="column">
          <Text fz="sm">
            Comments ({num_comments})
          </Text>
          {renderComments()}
        </Flex>
      ) : null}
    </Flex>
  );
};

export default StoryDetail;
