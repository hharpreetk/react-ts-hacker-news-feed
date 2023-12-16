import { ActionIcon } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { IconX } from "@tabler/icons-react";

const SettingsHeader = () => {
  const navigate = useNavigate();
  const handleSettingsClose = () => {
    // Go back to the previous route
    navigate(-1);
  };
  return (
    <ActionIcon
      variant="default"
      size="lg"
      aria-label="Exit Settings Page"
      onClick={handleSettingsClose}
    >
      <IconX size={18} />
    </ActionIcon>
  );
};

export default SettingsHeader;
