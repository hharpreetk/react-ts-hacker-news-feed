import React, { createContext, useReducer, ReactNode, useContext } from "react";
import { Stories, Story } from "../types/stories";

interface StoriesProviderProps {
  children: ReactNode;
}

type StoriesState = {
  data: Stories;
  isLoading: boolean;
  isError: boolean;
  error?: any;
  totalPages: number;
};

type StoriesAction =
  | { type: "STORIES_FETCH_INIT" }
  | {
      type: "STORIES_FETCH_SUCCESS";
      payload: { hits: Stories; nbPages: number };
    }
  | { type: "STORIES_FETCH_FAILURE"; payload: { error: any } }
  | { type: "REMOVE_STORY"; payload: Story };

export const StoriesContext = createContext<StoriesState | undefined>(undefined);

export const StoriesDispatchContext =
  createContext<React.Dispatch<StoriesAction> | undefined>(undefined);

export const useStories = () => {
  const context = useContext(StoriesContext);
  if (!context) {
    throw new Error("useStories must be used within a StoriesProvider");
  }
  return context;
};

export const useStoriesDispatch = () => {
  const context = useContext(StoriesDispatchContext);
  if (!context) {
    throw new Error("useStoriesDispatch must be used within a StoriesProvider");
  }
  return context;
};

export const StoriesProvider = ({ children }: StoriesProviderProps) => {
  const [stories, dispatchStories] = useReducer(storiesReducer, {
    data: [] as Stories,
    isLoading: false,
    isError: false,
    error: undefined,
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
        error: action.payload.error,
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
