import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { getStoryUrl } from "../api/api";
import { useLocation } from "react-router-dom";

const useFetchStory = () => {
  const location = useLocation();
  const { objectID } = location.state;
  const url = getStoryUrl(objectID || "");

  const { data, isLoading, error } = useQuery({
    queryKey: [objectID],
    queryFn: async () => {
      const result = await axios.get(url);
      return result.data;
    },
  });
  return { data, isLoading, error };
};

export { useFetchStory };
