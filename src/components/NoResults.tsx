import { Notification, Text } from "@mantine/core";
import classes from "../styles/Feedback.module.css";

const NoResults = () => (
  <Notification
    title="No Results Found"
    my="md"
    classNames={{
      root: classes.root,
      body: classes.body,
      title: classes.title,
    }}
    withBorder
    withCloseButton={false}
  >
    <Text size="sm">
      Sorry, but we couldn't find the search results matching the filter
      criteria.
    </Text>
  </Notification>
);

export default NoResults;
