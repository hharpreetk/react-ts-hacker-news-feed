import { Loader, Notification } from "@mantine/core";
import classes from "../styles/Feedback.module.css";
import { Stories } from "../types/stories";
import StoryList from "./StoryList";
import Pagination from "./Pagination";
import NoResults from "./NoResults";

interface StoryViewProps {
  data: Stories;
  isLoading: boolean;
  isError: boolean;
  error: any;
  totalPages: number;
  activePage: number;
  handleActivePage: (selectedPage: number) => void;
}

const StoryView: React.FC<StoryViewProps> = ({
  data,
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
        <Notification
          title={error?.code ? `Error ${error.code}` : "Unknown Error"}
          color="red"
          my="md"
          classNames={{
            root: classes.root,
          }}
          withBorder
          withCloseButton={false}
        >
          {error?.message || "Something went wrong..."}
        </Notification>
      ) : isLoading ? (
        <Loader type="dots" mx="auto" my="lg" />
      ) : data.length === 0 ? (
        <NoResults />
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
