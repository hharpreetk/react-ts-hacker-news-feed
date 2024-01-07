import { Center, Loader, Text } from "@mantine/core";
import { useFetchStory } from "../../hooks/useFetchStory";
import StoryDetail from "./StoryDetail";
import { useParams } from "react-router-dom";
import Feedback from "../search/Feedback";

const StoryView: React.FC = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useFetchStory(id);
  return error ? (
    <Feedback
      status="error"
      message={
        error ? `Error: ${error?.message}` : "Oops! Something went wrong."
      }
    />
  ) : isLoading ? (
    <Center py="sm" my="lg">
      <Loader type="oval" mx="auto" />
    </Center>
  ) : (
    <StoryDetail story={data} />
  );
};

export default StoryView;
