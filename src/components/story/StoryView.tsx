import { useFetchStory } from "../../hooks/useFetchStory";
import StoryDetail from "./StoryDetail";
import { useParams } from "react-router-dom";
import Feedback from "../search/Feedback";
import StorySkeleton from "./StorySkeleton";

const StoryView: React.FC = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useFetchStory(id);
  return error ? (
    <Feedback
      status="error"
      message={error ? error?.message : "Oops! Something went wrong."}
    />
  ) : isLoading ? (
    <StorySkeleton />
  ) : (
    data && <StoryDetail story={data} />
  );
};

export default StoryView;
