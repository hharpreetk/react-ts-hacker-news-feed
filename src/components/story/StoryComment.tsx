import {
  Box,
  Flex,
  Paper,
  Text,
  TypographyStylesProvider,
} from "@mantine/core";
import { getFormattedDate } from "../../utils/storyUtils";
import { Comment } from "../../types/story";
import classes from "../../styles/Story.module.css";

const StoryComment = ({ comment }: { comment: Comment }) => {
  const { author, created_at, children, text } = comment;
  return (
    <Flex direction="column" gap={4} mt={8}>
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
      >
        <Box c="gray" fz="sm" dangerouslySetInnerHTML={{ __html: `${text}` }} />
      </TypographyStylesProvider>
      {children && children.length > 0 && (
        <div>
          {children.map((child: Comment) => (
            <Paper pl="md" style={{ borderLeft: "1px solid lightgray", borderRadius: 0 }}>
              <StoryComment key={child.id} comment={child} />
            </Paper>
          ))}
        </div>
      )}
    </Flex>
  );
};

export default StoryComment;
