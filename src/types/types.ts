type Story = {
  title: string;
  url: string;
  author: string;
  num_comments: number;
  points: number;
  created_at: string;
  objectID: number;
};

type Stories = Array<Story>;

type StoriesState = {
  data: Stories;
  isLoading: boolean;
  isError: boolean;
};

type StoriesAction =
  | { type: "STORIES_FETCH_INIT" }
  | { type: "STORIES_FETCH_SUCCESS"; payload: Stories }
  | { type: "STORIES_FETCH_FAILURE" }
  | { type: "REMOVE_STORY"; payload: Story }
  | { type: "LOAD_MORE_STORIES"; payload: Stories };

export { Story, Stories, StoriesState, StoriesAction };
