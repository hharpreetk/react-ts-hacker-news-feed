import React, { createContext, useReducer, ReactNode, useContext } from "react";
import { Stories, StoriesState, StoriesAction } from "../types/types";

interface StoriesContextProps {
  children: ReactNode;
}

export const StoriesContext = createContext<StoriesState>(null!);

export const StoriesDispatchContext = createContext<
  React.Dispatch<StoriesAction>
>(null!);

export const StoriesProvider = ({ children }: StoriesContextProps) => {
  const [stories, dispatchStories] = useReducer(storiesReducer, {
    data: [] as Stories,
    isLoading: false,
    isError: false,
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
        data: action.payload,
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
    case "LOAD_MORE_STORIES":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: [...state.data, ...action.payload],
      };
    default:
      throw new Error("Unsupported action");
  }
};
