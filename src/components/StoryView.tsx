import { Loader, Notification, Text, useMantineTheme } from "@mantine/core";
import classes from "../styles/Feedback.module.css";
import { Stories } from "../types/stories";
import StoryList from "./StoryList";
import Pagination from "./Pagination";
import { NO_RESULT_CONTENT_FEEDBACK } from "../constants/mappings";

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
  const theme = useMantineTheme();
  return (
    <>
      {isError ? (
        <Notification
          title={error?.code ? `Error ${error.code}` : "Unknown Error"}
          color="red"
          my="md"
          classNames={{
            root: classes.root,
            title: classes.title
          }}
          withBorder
          withCloseButton={false}
        >
          {error?.message || "Something went wrong..."}
        </Notification>
      ) : isLoading ? (
        <Loader type="dots" mx="auto" my="lg" />
      ) : data.length === 0 ? (
        <Notification
          title={`Oops! No ${NO_RESULT_CONTENT_FEEDBACK[selectedContent]} Found`}
          color={theme.primaryColor}
          my="md"
          classNames={{
            root: classes.root,
            title: classes.title
          }}
          withBorder
          withCloseButton={false}
        >
          <Text size="sm">
            Sorry, but we couldn't find the search results matching the filter
            criteria.
          </Text>
        </Notification>
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
