import { useLocation } from "react-router-dom";
import AppShell from "../shared/AppShell";
import StoryDetail from "../story/StoryDetail";

const Story: React.FC = () => {
  const location = useLocation();

  const story = location.state;

  return (
    <AppShell>
      <StoryDetail story={story} />
    </AppShell>
  );
};

export default Story;
