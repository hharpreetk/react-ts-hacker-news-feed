import { Select } from "@mantine/core";
import { Options } from "../../types/options";
import classes from "../../styles/Select.module.css";

interface SettingsSelectProps {
  options: Options;
  value: string;
}

const SettingsSelect: React.FC<SettingsSelectProps> = ({ options, value }) => {
  return (
    <Select
      data={options}
      value={value}
      allowDeselect={false}
      classNames={classes}
    />
  );
};

export default SettingsSelect;
