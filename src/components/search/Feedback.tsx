import { Text } from "@mantine/core";
import classes from "../../styles/Feedback.module.css";

const Feedback: React.FC<{ status: "info" | "error"; message: string }> = ({
  status,
  message,
}) => {
  const feedbackProps = {
    size: "0.95rem",
    lh: "lg",
    p: "md",
  };

  const classNames = {
    root: status === "info" ? classes.info : classes.error,
  };

  return (
    <Text classNames={classNames} {...feedbackProps}>
      {message}
    </Text>
  );
};

export default Feedback;
