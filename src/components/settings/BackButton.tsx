import { ActionIcon } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { IconX } from "@tabler/icons-react";

const BackButton = () => {
  const navigate = useNavigate();
  const handlePageExit = () => {
    // Go back to the previous route
    navigate(-1);
  };

  return (
    <ActionIcon
      variant="default"
      size="lg"
      aria-label="Go Back"
      title="Go Back"
      onClick={handlePageExit}
    >
      <IconX size={18} />
    </ActionIcon>
  );
};

export default BackButton;
