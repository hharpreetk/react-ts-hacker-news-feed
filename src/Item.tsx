interface ItemProps {
  item: {
    title: string;
    url: string;
    author: string;
    num_comments: number;
    points: number;
    objectID: number;
  };
  onRemoveItem: (item: ItemProps["item"]) => void;
}

const Item = ({ item, onRemoveItem }: ItemProps) => {
  const handleRemoveItem = () => onRemoveItem(item);
  return (
    <div>
      <span>
        <a href={item.url}>{item.title}</a>
      </span>
      <span>{item.author}</span>
      <span>{item.num_comments}</span>
      <span>{item.points}</span>
      <span>
        <button type="button" onClick={handleRemoveItem}>
          Dismiss
        </button>
      </span>
    </div>
  );
};

export default Item;
