import { Story } from "../types/types";

type ItemProps = {
  item: Story;
  onRemoveItem: (item: ItemProps["item"]) => void;
};

const Item = ({ item, onRemoveItem }: ItemProps) => {
  const handleRemoveItem = () => onRemoveItem(item);

  const getFormattedDate = (dateInput: string): string => {
    const date = new Date(dateInput);
    const formattedDate = date.toLocaleDateString();
    return formattedDate;
  };

  return (
    <tr>
      <td>
        <a href={item.url}>{item.title}</a>
      </td>
      <td>{item.author}</td>
      <td>{item.num_comments}</td>
      <td>{item.points}</td>
      <td>{getFormattedDate(item.created_at)}</td>
      <td>
        <button type="button" onClick={handleRemoveItem}>
          Dismiss
        </button>
      </td>
    </tr>
  );
};

export default Item;
