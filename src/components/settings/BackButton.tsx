import { ActionIcon, rem } from "@mantine/core";
import { useLocation, useNavigate } from "react-router-dom";
import { IconX } from "@tabler/icons-react";

const BackButton = () => {
  const location = useLocation();

  const navigate = useNavigate();

  const handlePageExit = () => {
    if (location.key !== "default") {
      // Go back to the previous route
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <ActionIcon
      variant="default"
      size="lg"
      aria-label="Go Back"
      title="Go Back"
      onClick={handlePageExit}
    >
      <IconX style={{ height: rem(16), width: rem(16) }} />
    </ActionIcon>
  );
};

export default BackButton;
