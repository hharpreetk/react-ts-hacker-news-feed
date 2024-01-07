import { Text } from "@mantine/core";
import { useFetchStory } from "../../hooks/useFetchStory";
import StoryDetail from "./StoryDetail";

const StoryView: React.FC = () => {
  const { data, isLoading, error } = useFetchStory();
  return error ? (
    <Text>Error fetching comments: {error.message}</Text>
  ) : isLoading ? (
    <Text>Loading story...</Text>
  ) : (
    <StoryDetail story={data} />
  );
};

export default StoryView;
