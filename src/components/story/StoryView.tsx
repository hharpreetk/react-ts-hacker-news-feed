import { Text } from "@mantine/core";
import { useFetchStory } from "../../hooks/useFetchStory";
import StoryDetail from "./StoryDetail";
import { useParams } from "react-router-dom";

const StoryView: React.FC = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useFetchStory(id);
  return error ? (
    <Text>Error fetching comments: {error.message}</Text>
  ) : isLoading ? (
    <Text>Loading story...</Text>
  ) : (
    <StoryDetail story={data} />
  );
};

export default StoryView;
