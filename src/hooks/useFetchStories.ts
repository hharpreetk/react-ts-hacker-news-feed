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
      const { hits, nbPages } = result.data;
      dispatchStories({
        type: "STORIES_FETCH_SUCCESS",
        payload: { hits, nbPages },
      });
    } catch (error: any) {
      dispatchStories({
        type: "STORIES_FETCH_FAILURE",
        payload: { error: error },
      });
    }
  };

  return fetchStories;
};

export { useFetchStories };
