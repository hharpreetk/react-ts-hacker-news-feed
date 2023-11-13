import { useState, memo } from "react";
import { sortBy } from "lodash";
import { Story, Stories } from "../types/types";
import Item from "./Item";
import SortList from "./SortList";

interface ListProps {
  list: Stories;
  onRemoveItem: (item: Story) => void;
}

const SORTS: Record<
  string,
  { name: string; sortFunction: (list: Stories) => Stories }
> = {
  NONE: { name: "None", sortFunction: (list) => list },
  TITLE: { name: "Title", sortFunction: (list) => sortBy(list, "title") },
  AUTHOR: { name: "Author", sortFunction: (list) => sortBy(list, "author") },
  COMMENTS: {
    name: "Comments",
    sortFunction: (list) => sortBy(list, "num_comments"),
  },
  POINTS: { name: "Points", sortFunction: (list) => sortBy(list, "points") },
  DATE_CREATED: {
    name: "Date Created",
    sortFunction: (list) => sortBy(list, "created_at"),
  },
};

const List = memo(({ list, onRemoveItem }: ListProps) => {
  const [sort, setSort] = useState<{ sortKey: string; isReverse: boolean }>({
    sortKey: "NONE",
    isReverse: false,
  });

  const handleSortCriteriaSelect = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSort({ ...sort, sortKey: event.target.value });
  };

  const handleSortOrderChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSort({
      ...sort,
      isReverse: event.target.value === "DESCENDING",
    });
  };

  const { sortKey, isReverse } = sort;

  const { sortFunction } = SORTS[sortKey];
  const sortedList = isReverse
    ? sortFunction(list).reverse()
    : sortFunction(list);

  return (
    <>
      <SortList
        sorts={SORTS}
        onSortCriteriaSelect={handleSortCriteriaSelect}
        onSortOrderChange={handleSortOrderChange}
      />

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
          {sortedList.map((item) => {
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
