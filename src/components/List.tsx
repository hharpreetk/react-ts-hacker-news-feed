import { memo } from "react";
import { Story, Stories } from "../types/types";
import Item from "./Item";

interface ListProps {
  list: Stories;
  onRemoveItem: (item: Story) => void;
}

const List = memo(({ list, onRemoveItem }: ListProps) => {
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
            return (
              <Item
                key={item.objectID}
                item={item}
                onRemoveItem={onRemoveItem}
              />
            );
          })}
        </tbody>
      </table>
    </>
  );
});

export default List;
