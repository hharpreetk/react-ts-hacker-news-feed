import { Loader, Text, Center, Box } from "@mantine/core";
import StoryList from "./StoryList";
import Pagination from "./Pagination";
import { NO_RESULT_CONTENT_FEEDBACK } from "../../constants/mappings";
import { useStories } from "../../contexts/StoriesContext";
import { useSearch } from "../../contexts/SearchContext";
import classes from "../../styles/Feedback.module.css";

const StoryView: React.FC = () => {
  const { data, isLoading, isError } = useStories();

  return (
    <>
      {isError ? (
        <ErrorFeedback />
      ) : isLoading ? (
        <Center py="sm">
          <Loader type="oval" mx="auto" my="lg" />
        </Center>
      ) : data.length === 0 ? (
        <NoResultsFeedback />
      ) : (
        <>
          <StoryList />
          <Pagination />
        </>
      )}
    </>
  );
};

export default StoryView;

const NoResultsFeedback: React.FC = () => {
  const { selectedContent } = useSearch();
  return (
    <Text
      size="0.95rem"
      lh="lg"
      p="md"
      mt="md"
      classNames={{ root: classes.info }}
    >{`No '${NO_RESULT_CONTENT_FEEDBACK[selectedContent]}' were found matching your search.`}</Text>
  );
};

const ErrorFeedback: React.FC = () => {
  const { error } = useStories();
  return (
    <Text
      size="0.95rem"
      lh="lg"
      p="md"
      mt="md"
      classNames={{ root: classes.error }}
    >
      {error?.code ? `Error ${error.code}:` : "Unknown Error:"}
      {"  "}
      {error?.message || "Something went wrong..."}
    </Text>
  );
};
