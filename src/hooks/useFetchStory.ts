import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { getStoryUrl } from "../api/api";

const useFetchStory = (storyId: string | undefined) => {
  const url = getStoryUrl(storyId || "");

  const { data, isLoading, isFetching, isError, error } = useQuery({
    queryKey: [storyId],
    queryFn: async () => {
      const response = await fetch(url);

      if (!response.ok) {
        let errorMessage = `Status ${response.status} error.`;

        // Customize error message based on different status codes
        if (response.status === 404) {
          errorMessage = "Story not found.";
        } else if (response.status === 500) {
          errorMessage = "Internal server error.";
        }

        throw new Error(errorMessage);
      }

      return response.json();
    },
  });
  return { data, isLoading, isFetching, isError, error };
};

export { useFetchStory };
