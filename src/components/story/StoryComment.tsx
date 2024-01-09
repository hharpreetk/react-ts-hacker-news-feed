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
  const { author, created_at, children, text } = comment;
  return (
    <Flex direction="column" mt={8}>
      <Flex direction="column" gap={3}>
        <Flex wrap="wrap" rowGap={2} columnGap="xs" align="center">
          <Text fz="sm" span>
            {author}
          </Text>
          <Text fz="xs" span>
            |
          </Text>
          <Text fz="sm" span>
            {getFormattedDate(created_at)}
          </Text>
        </Flex>
        <TypographyStylesProvider
          m={0}
          p={0}
          classNames={{ root: classes.commentText }}
        >
          <Box
            c="gray"
            fz="sm"
            dangerouslySetInnerHTML={{ __html: `${text}` }}
          />
        </TypographyStylesProvider>
      </Flex>
      {children && children.length > 0 && (
        <div>
          {children.map((child: Comment) => (
            <Paper
              pl={{ base: "sm", xs: "md" }}
              classNames={{ root: classes.commentReply }}
            >
              <StoryComment key={child.id} comment={child} />
            </Paper>
          ))}
        </div>
      )}
    </Flex>
  );
};

export default StoryComment;
