import React, { createContext, useReducer, ReactNode, useContext } from "react";
import { Stories, Story } from "../types/stories";

interface StoriesContextProps {
  children: ReactNode;
}

type StoriesState = {
  data: Stories;
  isLoading: boolean;
  isError: boolean;
  totalPages: number;
};

type StoriesAction =
  | { type: "STORIES_FETCH_INIT" }
  | {
      type: "STORIES_FETCH_SUCCESS";
      payload: { hits: Stories; nbPages: number };
    }
  | { type: "STORIES_FETCH_FAILURE" }
  | { type: "REMOVE_STORY"; payload: Story };

export const StoriesContext = createContext<StoriesState>(null!);

export const StoriesDispatchContext = createContext<
  React.Dispatch<StoriesAction>
>(null!);

export const StoriesProvider = ({ children }: StoriesContextProps) => {
  const [stories, dispatchStories] = useReducer(storiesReducer, {
    data: [] as Stories,
    isLoading: false,
    isError: false,
    totalPages: 0,
  });

  return (
    <StoriesContext.Provider value={stories}>
      <StoriesDispatchContext.Provider value={dispatchStories}>
        {children}
      </StoriesDispatchContext.Provider>
    </StoriesContext.Provider>
  );
};

export const useStories = () => {
  return useContext(StoriesContext);
};

export const useStoriesDispatch = () => {
  return useContext(StoriesDispatchContext);
};

const storiesReducer = (
  state: StoriesState,
  action: StoriesAction
): StoriesState => {
  switch (action.type) {
    case "STORIES_FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "STORIES_FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.hits,
        totalPages: action.payload.nbPages,
      };
    case "STORIES_FETCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case "REMOVE_STORY":
      return {
        ...state,
        data: state.data.filter(
          (story) => action.payload.objectID !== story.objectID
        ),
      };
    default:
      throw new Error("Unsupported action");
  }
};
