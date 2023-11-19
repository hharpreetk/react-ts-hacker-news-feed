import { MultiValue } from "react-select";

type Option = {
  value: string;
  label: string;
};

type MultiValueOption = MultiValue<Option>;

export { MultiValueOption };
