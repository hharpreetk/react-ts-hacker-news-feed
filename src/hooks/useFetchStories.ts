import axios from "axios";
import { useStoriesDispatch } from "../contexts/StoriesContext";

const useFetchStories = (url: string) => {
  const dispatchStories = useStoriesDispatch();

  const fetchStories = async () => {
    // Show loading indicator when data loading is delayed
    dispatchStories({ type: "STORIES_FETCH_INIT" });

    // Fetch stories
    try {
      const result = await axios.get(url);
      dispatchStories({
        type: "STORIES_FETCH_SUCCESS",
        payload: result.data.hits,
      });
    } catch (error) {
      dispatchStories({ type: "STORIES_FETCH_FAILURE" });
    }
  };

  return fetchStories;
};

export { useFetchStories };
