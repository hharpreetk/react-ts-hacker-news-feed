import { ActionIcon } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { IconX } from "@tabler/icons-react";

const ExitButton = () => {
  const navigate = useNavigate();
  const handlePageExit = () => {
    // Go back to the previous route
    navigate(-1);
  };
  return (
    <ActionIcon
      variant="default"
      size="lg"
      aria-label="Exit Page"
      onClick={handlePageExit}
    >
      <IconX size={18} />
    </ActionIcon>
  );
};

export default ExitButton;
