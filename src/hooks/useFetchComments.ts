import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { getStoryUrl } from "../api/api";

const useFetchComments = (storyId: string) => {
  const url = getStoryUrl(storyId);

  const { data, isLoading, error } = useQuery({
    queryKey: [storyId],
    queryFn: async () => {
      const result = await axios.get(url);
      const { children } = result.data;
      return children;
    },
  });
  return { data, isLoading, error };
};

export { useFetchComments };
