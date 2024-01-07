import { Loader, Text, Center } from "@mantine/core";
import StoryList from "./StoryList";
import Pagination from "./Pagination";
import { NO_RESULT_CONTENT_FEEDBACK } from "../../constants/feedback";
import { useStories } from "../../contexts/StoriesContext";
import { useSearch } from "../../contexts/SearchContext";
import Feedback from "./Feedback";

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
      ) : data?.length === 0 ? (
        <NoResultsFeedback />
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

const NoResultsFeedback = () => {
  const { selectedContent } = useSearch();
  return (
    <Feedback
      status="info"
      message={`No '${
        NO_RESULT_CONTENT_FEEDBACK[selectedContent || "stories"]
      }' were found matching your search.`}
    />
  );
};

const ErrorFeedback = () => {
  const { error } = useStories();
  return (
    <Feedback
      status="error"
      message={
        error
          ? `Error ${error.code}: ${error?.message}`
          : "Oops! Something went wrong."
      }
    />
  );
};
