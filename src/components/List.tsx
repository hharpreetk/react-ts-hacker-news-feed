import { useState, memo } from "react";
import { sortBy } from "lodash";
import { Story, Stories } from "../types/types";
import Item from "./Item";

interface ListProps {
  list: Stories;
  onRemoveItem: (item: Story) => void;
}

const SORTS: Record<string, (list: Stories) => Stories> = {
  NONE: (list: Stories): Stories => list,
  TITLE: (list: Stories): Stories => sortBy(list, "title"),
  AUTHOR: (list: Stories): Stories => sortBy(list, "author"),
  COMMENTS: (list: Stories): Stories => sortBy(list, "num_comments").reverse(),
  POINTS: (list: Stories): Stories => sortBy(list, "points").reverse(),
  DATE_CREATED: (list: Stories): Stories => sortBy(list, "created_at"),
};

const List = memo(({ list, onRemoveItem }: ListProps) => {
  const [sort, setSort] = useState("NONE");

  const handleSort = (sortKey: string) => {
    // Reset the sort order when sorting key is same as the current sorting key
    setSort((prevSort) => (prevSort === sortKey ? "NONE" : sortKey));
  };

  const sortFunction = SORTS[sort];
  const sortedList = sortFunction(list);

  return (
    <table>
      <thead>
        <tr>
          <th scope="col">
            <nobr>
              Title{" "}
              <button
                onClick={() => handleSort("TITLE")}
                alt="Click to sort the title column in alphabetical order"
              >
                {sort === "TITLE" ? "⮇" : "⮃"}
              </button>
            </nobr>
          </th>
          <th scope="col">
            <nobr>
              Author{" "}
              <button
                onClick={() => handleSort("AUTHOR")}
                alt="Click to sort the author column in alphabetical order"
              >
                {sort === "AUTHOR" ? "⮇" : "⮃"}
              </button>
            </nobr>
          </th>
          <th scope="col">
            <nobr>
              Comments{" "}
              <button
                onClick={() => handleSort("COMMENTS")}
                alt="Click to sort the total comments from highest to lowest"
              >
                {sort === "COMMENTS" ? "⮅" : "⮃"}
              </button>
            </nobr>
          </th>
          <th scope="col">
            <nobr>
              Points{" "}
              <button
                onClick={() => handleSort("POINTS")}
                alt="Click to sort the total points from highest to lowest"
              >
                ⮅
              </button>
            </nobr>
          </th>
          <th scope="col">
            <nobr>
              Date Created{" "}
              <button
                onClick={() => handleSort("DATE_CREATED")}
                alt="Click to sort the date of creation from newest to oldest"
              >
                {sort === "DATE_CREATED" ? "⮇" : "⮃"}
              </button>
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

export default List;
