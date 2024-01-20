import {
  Box,
  Button,
  Flex,
  Group,
  Paper,
  Text,
  TypographyStylesProvider,
  em,
  rem,
} from "@mantine/core";
import { getFormattedDate } from "../../utils/storyUtils";
import { Comment } from "../../types/story";
import classes from "../../styles/Comment.module.css";
import { useState } from "react";
import { IconCaretDownFilled, IconCaretUpFilled } from "@tabler/icons-react";

const StoryComment = ({ comment }: { comment: Comment }) => {
  // State to manage the visibility of child comments
  const [showReplies, setShowReplies] = useState(false);
  const { author, created_at, children, text, points } = comment;

  return (
    <Flex direction="column" mt={10}>
      <Flex direction="column" gap={3}>
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

      {/* Render "View More Replies" link only if there are more than one child comments */}
      {children.length > 1 && (
        <div>
          <Button
            variant="transparent"
            fz={15}
            style={{ padding: 0, marginBottom: rem(-14), marginTop: rem(-13) }}
            onClick={() => setShowReplies(!showReplies)}
          >
            {showReplies ? (
              <Group gap={10}>
                <IconCaretUpFilled
                  style={{
                    height: rem(14),
                    width: rem(14),
                    marginTop: em(2.5),
                  }}
                />
                <span>{children.length} replies</span>
              </Group>
            ) : (
              <Group gap={10}>
                <IconCaretDownFilled
                  style={{
                    height: rem(14),
                    width: rem(14),
                    marginTop: em(1.5),
                  }}
                />
                {children.length} replies
              </Group>
            )}
          </Button>
        </div>
      )}

      {children && children.length > 0 && (
        <div>
          {showReplies
            ? children.map((child: Comment) => (
                <Paper
                  key={child.id}
                  pl={{ base: "sm", xs: "md" }}
                  classNames={{ root: classes.commentReply }}
                >
                  <StoryComment comment={child} />
                </Paper>
              ))
            : null}
        </div>
      )}
    </Flex>
  );
};

export default StoryComment;
