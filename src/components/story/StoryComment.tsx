import {
  Box,
  Flex,
  Paper,
  Text,
  TypographyStylesProvider,
} from "@mantine/core";
import { getFormattedDate } from "../../utils/storyUtils";
import { Comment } from "../../types/story";
import classes from "../../styles/Comment.module.css";

const StoryComment = ({ comment }: { comment: Comment }) => {
  const { author, created_at, children, text, points } = comment;
  return (
    <Flex direction="column" mt={10}>
      <Flex direction="column" gap={1}>
        <Flex
          wrap="wrap"
          align="center"
          rowGap={2}
          columnGap={8}
          classNames={{ root: classes.commentInfo }}
        >
          <Text fz="sm" span>
            {author}
          </Text>
          <Text fz="xs" span>
            ·
          </Text>
          <Text fz="sm" span>
            {getFormattedDate(created_at)}
          </Text>
          {points && (
            <>
              <Text fz="xs" span>
                ·
              </Text>
              <Text fz="sm" span>
                {points}
              </Text>
            </>
          )}
        </Flex>
        <TypographyStylesProvider
          m={0}
          p={0}
          classNames={{ root: classes.commentText }}
        >
          <Box fz="sm" dangerouslySetInnerHTML={{ __html: `${text}` }} />
        </TypographyStylesProvider>
      </Flex>
      {children && children.length > 0 && (
        <div>
          {children.map((child: Comment) => (
            <Paper
              key={child.id}
              pl={{ base: "sm", xs: "md" }}
              classNames={{ root: classes.commentReply }}
            >
              <StoryComment comment={child} />
            </Paper>
          ))}
        </div>
      )}
    </Flex>
  );
};

export default StoryComment;
