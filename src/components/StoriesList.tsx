import { memo, useCallback } from "react";
import { Story, Stories } from "../types/types";
import Item from "./StoryItem";
import { useStoriesDispatch } from "../contexts/StoriesContext";

interface StoriesListProps {
  list: Stories;
}

const StoriesList = memo(({ list }: StoriesListProps) => {
  const dispatchStories = useStoriesDispatch();
  const handleRemoveStory = useCallback((item: Story) => {
    dispatchStories({ type: "REMOVE_STORY", payload: item });
  }, []);
  return (
    <>
      <table>
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Author</th>
            <th scope="col">Comments</th>
            <th scope="col">Points</th>
            <th scope="col">Date Created</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item: Story) => {
            return <Item key={item.objectID} item={item} onRemoveItem={handleRemoveStory} />;
          })}
        </tbody>
      </table>
    </>
  );
});

export default StoriesList;
