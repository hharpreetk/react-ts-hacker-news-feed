import { MultiValue, SingleValue } from "react-select";

type Option = {
  value: string;
  label: string;
};

type MultiValueOption = MultiValue<Option>;

type SingleValueOption = SingleValue<Option>;

export { MultiValueOption, SingleValueOption};
