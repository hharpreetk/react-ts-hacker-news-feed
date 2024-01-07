import {
  Flex,
  Anchor,
  Text,
  TypographyStylesProvider,
  Box,
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
    return (
      <ul>
        {children.map((comment: any) => (
          <li key={comment.id}>{comment.text}</li>
        ))}
      </ul>
    );
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
                {points} point{points === 1 ? "" : "s"}
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
