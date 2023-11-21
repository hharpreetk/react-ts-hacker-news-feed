import { SingleValue, MultiValue } from "react-select";

type TagOption = {
  value: string;
  label: string;
};

type SortOption = {
  value: string;
  label: string;
  resource: string;
};

type TimeOption = {
  value: string;
  label: string;
  numericFilter: string;
};

type SingleValueSortOption = SingleValue<SortOption>;

type SingleValueTimeOption = SingleValue<TimeOption>;

type MultiValueTagOption = MultiValue<TagOption>;

export { MultiValueTagOption, SingleValueSortOption, SingleValueTimeOption };
