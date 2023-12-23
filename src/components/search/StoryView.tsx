import { Loader, Text, Center } from "@mantine/core";
import StoryList from "./StoryList";
import Pagination from "./Pagination";
import { NO_RESULT_CONTENT_FEEDBACK } from "../../constants/mappings";
import { useStories } from "../../contexts/StoriesContext";
import { useSearch } from "../../contexts/SearchContext";
import classes from "../../styles/Feedback.module.css";

const StoryView: React.FC = () => {
  const { data, isLoading, isError } = useStories();

  const feedbackProps = {
    size: "0.95rem",
    lh: "lg",
    p: "md",
    mt: "md",
  };

  return (
    <>
      {isError ? (
        <ErrorFeedback feedbackProps={feedbackProps} />
      ) : isLoading ? (
        <Center py="sm">
          <Loader type="oval" mx="auto" my="lg" />
        </Center>
      ) : data?.length === 0 ? (
        <NoResultsFeedback feedbackProps={feedbackProps} />
      ) : (
        data && (
          <>
            <StoryList />
            <Pagination />
          </>
        )
      )}
    </>
  );
};

export default StoryView;

const NoResultsFeedback: React.FC<{
  feedbackProps: Record<string, string>;
}> = ({ feedbackProps }) => {
  const { selectedContent } = useSearch();
  return (
    <Text
      classNames={{ root: classes.info }}
      {...feedbackProps}
    >{`No '${NO_RESULT_CONTENT_FEEDBACK[selectedContent]}' were found matching your search.`}</Text>
  );
};

const ErrorFeedback: React.FC<{ feedbackProps: Record<string, string> }> = ({
  feedbackProps,
}) => {
  const { error } = useStories();
  return (
    <Text classNames={{ root: classes.error }} {...feedbackProps}>
      {error?.code ? `Error ${error.code}:` : "Unknown Error:"}
      {"  "}
      {error?.message || "Something went wrong..."}
    </Text>
  );
};
