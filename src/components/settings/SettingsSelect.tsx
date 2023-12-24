import { Select } from "@mantine/core";
import { Options } from "../../types/options";
import classes from "../../styles/Select.module.css";

interface SettingsSelectProps {
  options: Options;
  selectedValue: string | null;
  handleSelect: (value: string | null) => void;
}

const SettingsSelect: React.FC<SettingsSelectProps> = ({
  options,
  selectedValue,
  handleSelect,
}) => {
  return (
    <Select
      data={options}
      value={selectedValue}
      allowDeselect={false}
      classNames={classes}
      onChange={handleSelect}
    />
  );
};

export default SettingsSelect;
