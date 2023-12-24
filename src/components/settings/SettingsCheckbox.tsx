import { Checkbox } from "@mantine/core";

interface SettingsCheckboxProps {
  checked: boolean;
}

const SettingsCheckbox: React.FC<SettingsCheckboxProps> = ({ checked }) => {
  return <Checkbox defaultChecked m={7} checked={checked} />;
};

export default SettingsCheckbox;
