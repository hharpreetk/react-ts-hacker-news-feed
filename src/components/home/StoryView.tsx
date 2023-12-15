import { Loader, Text } from "@mantine/core";
import { Stories } from "../../types/stories";
import StoryList from "./StoryList";
import Pagination from "./Pagination";
import { NO_RESULT_CONTENT_FEEDBACK } from "../../constants/mappings";

interface StoryViewProps {
  data: Stories;
  selectedContent: string;
  isLoading: boolean;
  isError: boolean;
  error: any;
  totalPages: number;
  activePage: number;
  handleActivePage: (selectedPage: number) => void;
}

const StoryView: React.FC<StoryViewProps> = ({
  data,
  selectedContent,
  isLoading,
  isError,
  error,
  totalPages,
  activePage,
  handleActivePage,
}) => {
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
