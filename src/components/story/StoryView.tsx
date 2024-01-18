import { useFetchStory } from "../../hooks/useFetchStory";
import StoryDetail from "./StoryDetail";
import { useParams } from "react-router-dom";
import Feedback from "../search/Feedback";
import StorySkeleton from "./StorySkeleton";

const StoryView: React.FC = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useFetchStory(id);

  if (isError) {
    return (
      <Feedback
        status="error"
        message={
          error?.message || "Sorry, something went wrong. Try again later."
        }
      />
    );
  }

  if (isLoading) {
    return <StorySkeleton />;
  }

  return data ? <StoryDetail story={data} /> : null;
};

export default StoryView;
