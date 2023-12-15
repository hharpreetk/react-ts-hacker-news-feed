import { Loader, Text } from "@mantine/core";
import StoryList from "./StoryList";
import Pagination from "./Pagination";
import { NO_RESULT_CONTENT_FEEDBACK } from "../../constants/mappings";
import { useStories } from "../../contexts/StoriesContext";

interface StoryViewProps {
  selectedContent: string;
  activePage: number;
  handleActivePage: (selectedPage: number) => void;
}

const StoryView: React.FC<StoryViewProps> = ({
  selectedContent,
  activePage,
  handleActivePage,
}) => {
  const stories = useStories();

  const { data, isLoading, isError, error, totalPages } = stories;
  
  return (
    <>
      {isError ? (
        <ErrorFeedback error={error} />
      ) : isLoading ? (
        <Loader type="dots" mx="auto" my="lg" />
      ) : data.length === 0 ? (
        <NoResultsFeedback selectedContent={selectedContent} />
      ) : (
        <>
          <StoryList list={data} />
          <Pagination
            totalPages={totalPages}
            activePage={activePage}
            handleActivePage={handleActivePage}
          />
        </>
      )}
    </>
  );
};

export default StoryView;

interface NoResultsFeedbackProps {
  selectedContent: string;
}

const NoResultsFeedback: React.FC<NoResultsFeedbackProps> = ({
  selectedContent,
}) => {
  return (
    <Text
      size="0.95rem"
      mt="sm"
      c="dark"
      lh="lg"
    >{`No '${NO_RESULT_CONTENT_FEEDBACK[selectedContent]}' were found matching your search.`}</Text>
  );
};

interface ErrorFeedbackProps {
  error?: any;
}

const ErrorFeedback: React.FC<ErrorFeedbackProps> = ({ error }) => (
  <Text size="0.95rem" mt="sm" c="dark" lh="lg">
    {error?.code ? `Error ${error.code}:` : "Unknown Error:"}
    {"  "}
    {error?.message || "Something went wrong..."}
  </Text>
);
