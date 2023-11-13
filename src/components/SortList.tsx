import { Stories } from "../types/types";

interface SortDropdownProps {
  sorts: Record<
    string,
    { name: string; sortFunction: (list: Stories) => Stories }
  >;
  onSortCriteriaSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onSortOrderChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SortDropdown = ({
  sorts,
  onSortCriteriaSelect,
  onSortOrderChange,
}: SortDropdownProps) => {
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
      />
      <label htmlFor="ascending">Ascending</label>
      <input
        type="radio"
        id="descending"
        name="sortOrder"
        value="DESCENDING"
        onChange={onSortOrderChange}
      />
      <label htmlFor="descending">Descending</label>
    </div>
  );
};

export default SortDropdown;
