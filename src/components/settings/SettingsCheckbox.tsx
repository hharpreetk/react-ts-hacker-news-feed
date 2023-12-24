import React from "react";
import { Checkbox } from "@mantine/core";

interface SettingsCheckboxProps {
  checked: boolean;
  handleChecked: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SettingsCheckbox: React.FC<SettingsCheckboxProps> = ({
  checked,
  handleChecked,
}) => {
  return <Checkbox defaultChecked={checked} m={7} onChange={handleChecked} />;
};

export default SettingsCheckbox;
