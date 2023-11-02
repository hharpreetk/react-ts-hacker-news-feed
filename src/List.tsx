import { memo } from "react";
import Item from "./Item";

type Item = {
  title: string;
  url: string;
  author: string;
  num_comments: number;
  points: number;
  objectID: number;
};

interface ListProps {
  list: Item[];
  onRemoveItem: (item: Item) => void;
}

const List = memo(({ list, onRemoveItem }: ListProps) => (
  <div>
    {list.map((item) => {
      return (
        <Item key={item.objectID} item={item} onRemoveItem={onRemoveItem} />
      );
    })}
  </div>
));

export default List;
