import { useState, memo } from "react";
import { sortBy } from "lodash";
import { Story, Stories } from "../types/types";
import Item from "./Item";
import SortButton from "./SortButton";

interface ListProps {
  list: Stories;
  onRemoveItem: (item: Story) => void;
}

const SORTS: Record<string, (list: Stories) => Stories> = {
  NONE: (list) => list,
  TITLE: (list) => sortBy(list, "title"),
  AUTHOR: (list) => sortBy(list, "author"),
  COMMENTS: (list) => sortBy(list, "num_comments"),
  POINTS: (list) => sortBy(list, "points"),
  DATE_CREATED: (list) => sortBy(list, "created_at"),
};

const List = memo(({ list, onRemoveItem }: ListProps) => {
  const [sort, setSort] = useState<{ sortKey: string; isReverse: boolean }>({
    sortKey: "NONE",
    isReverse: false,
  });

  const handleSort = (sortKey: string, isReverse?: boolean) => {
    // Change the sort order when sorting key is same as the current sorting key otherwise reset the sort order
    setSort((prevSort) => ({
      sortKey: sortKey,
      isReverse: sortKey === prevSort.sortKey ? !prevSort.isReverse : false,
    }));
  };

  const sortFunction = SORTS[sort.sortKey];
  const sortedList = sort.isReverse
    ? sortFunction(list).reverse()
    : sortFunction(list);

  return (
    <table>
      <thead>
        <tr>
          <th scope="col">
            <nobr>
              Title{" "}
              <SortButton
                handleSort={() => handleSort("TITLE")}
                isActive={sort.sortKey === "TITLE"}
                isReverse={sort.isReverse}
                normalOrderText="Click to sort the title in reverse alphabetical order"
                reverseOrderText="Click to sort the title in alphabetical order"
              />
            </nobr>
          </th>
          <th scope="col">
            <nobr>
              Author{" "}
              <SortButton
                handleSort={() => handleSort("AUTHOR")}
                isActive={sort.sortKey === "AUTHOR"}
                isReverse={sort.isReverse}
                normalOrderText="Click to sort the author in reverse alphabetical order"
                reverseOrderText="Click to sort the author in alphabetical order"
              />
            </nobr>
          </th>
          <th scope="col">
            <nobr>
              Comments{" "}
              <SortButton
                handleSort={() => handleSort("COMMENTS")}
                isActive={sort.sortKey === "COMMENTS"}
                isReverse={sort.isReverse}
                normalOrderText="Click to sort the total comments from highest to lowest"
                reverseOrderText="Click to sort the total comments from lowest to highest"
              />
            </nobr>
          </th>
          <th scope="col">
            <nobr>
              Points{" "}
              <SortButton
                handleSort={() => handleSort("POINTS")}
                isActive={sort.sortKey === "POINTS"}
                isReverse={sort.isReverse}
                normalOrderText="Click to sort the total points from highest to lowest"
                reverseOrderText="Click to sort the total points from lowest to highest"
              />
            </nobr>
          </th>
          <th scope="col">
            <nobr>
              Date Created{" "}
              <SortButton
                handleSort={() => handleSort("DATE_CREATED")}
                isActive={sort.sortKey === "DATE_CREATED"}
                isReverse={sort.isReverse}
                normalOrderText="Click to sort the date of creation from oldest to newest"
                reverseOrderText="Click to sort the date of creation from newest to oldest"
              />
            </nobr>
          </th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        {sortedList.map((item) => {
          return (
            <Item key={item.objectID} item={item} onRemoveItem={onRemoveItem} />
          );
        })}
      </tbody>
    </table>
  );
});

interface SortButtonProps {
  handleSort: () => void;
  isActive: boolean;
  isReverse: boolean;
  normalOrderText: string;
  reverseOrderText: string;
}

export default List;
