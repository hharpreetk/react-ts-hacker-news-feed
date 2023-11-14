import { Story } from "../types/types";

interface StoryItemProps {
  item: Story;
  onRemoveItem: (item: Story) => void;
}

const StoryItem = ({ item, onRemoveItem }: StoryItemProps) => {
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

export default StoryItem;
