import { memo } from "react";
import { Story, Stories } from "../types/types";
import Item from "./Item";

interface ListProps {
  list: Stories;
  onRemoveItem: (item: Story) => void;
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
