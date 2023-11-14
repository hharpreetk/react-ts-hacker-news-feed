import { Stories } from "../types/types";

interface StoriesSorterProps {
  sorts: Record<
    string,
    { name: string; sortFunction: (list: Stories) => Stories }
  >;
  sort: { sortKey: string; isReverse: boolean };
  onSortCriteriaSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onSortOrderChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const StoriesSorter = ({
  sorts,
  sort,
  onSortCriteriaSelect,
  onSortOrderChange,
}: StoriesSorterProps) => {
  return (
    <div>
      <label htmlFor="sortingCriteria">Sort By:</label>
      <select
        id="sortingCriteria"
        name="sortingCriteria"
        onChange={onSortCriteriaSelect}
      >
        {Object.keys(sorts).map((key) => (
          <option key={key} value={key}>
            {sorts[key].name}
          </option>
        ))}
      </select>
      <input
        type="radio"
        id="ascending"
        name="sortOrder"
        value="ASCENDING"
        onChange={onSortOrderChange}
        checked={!sort.isReverse}
      />
      <label htmlFor="ascending">Ascending</label>
      <input
        type="radio"
        id="descending"
        name="sortOrder"
        value="DESCENDING"
        onChange={onSortOrderChange}
        checked={sort.isReverse}
      />
      <label htmlFor="descending">Descending</label>
    </div>
  );
};

export default StoriesSorter;
