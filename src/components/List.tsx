import { useState, memo } from "react";
import { sortBy } from "lodash";
import { Story, Stories } from "../types/types";
import ListItem from "./ListItem";
import SortList from "./SortList";

interface ListProps {
  list: Stories;
  onRemoveItem: (item: Story) => void;
}

const SORTS: Record<
  string,
  { name: string; sortFunction: (list: Stories) => Stories }
> = {
  POINTS: {
    name: "Popularity",
    sortFunction: (list) => sortBy(list, "points"),
  },
  DATE_CREATED: {
    name: "Date",
    sortFunction: (list) => sortBy(list, "created_at"),
  },
  NUM_COMMENTS: {
    name: "Comments",
    sortFunction: (list) => sortBy(list, "num_comments"),
  },
  TITLE: { name: "Title", sortFunction: (list) => sortBy(list, "title") },
  AUTHOR: { name: "Author", sortFunction: (list) => sortBy(list, "author") },
};

const List = memo(({ list, onRemoveItem }: ListProps) => {
  const [sort, setSort] = useState<{ sortKey: string; isReverse: boolean }>({
    sortKey: "POINTS",
    isReverse: true,
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

  const getSortedList = (
    list: Stories,
    sortKey: string,
    isReverse: boolean,
  ) => {
    const { sortFunction } = SORTS[sortKey];
    const sorted = sortFunction(list);
    return isReverse ? sorted.reverse() : sorted;
  };

  const { sortKey, isReverse } = sort;

  const sortedList = getSortedList(list, sortKey, isReverse);

  return (
    <>
      <SortList
        sorts={SORTS}
        sort={sort}
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
              <ListItem
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
