import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { getStoryUrl } from "../api/api";

const useFetchStory = (storyId: string | undefined) => {
  const url = getStoryUrl(storyId || "");

  const { data, isLoading, error } = useQuery({
    queryKey: [storyId],
    queryFn: async () => {
      const result = await axios.get(url);
      return result.data;
    },
  });
  return { data, isLoading, error };
};

export { useFetchStory };
