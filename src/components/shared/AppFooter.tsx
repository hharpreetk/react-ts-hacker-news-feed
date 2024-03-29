import { Flex, Text, Anchor } from "@mantine/core";
import classes from "../../styles/Footer.module.css";

const AppFooter = () => {
  return (
    <Flex
      c="dimmed"
      direction={{ base: "column-reverse", xs: "row" }}
      justify={{ base: "center", xs: "space-between" }}
      gap={6}
      align="center"
      wrap="wrap"
      w="100%"
    >
      <Text fz="xs" classNames={{ root: classes.footerText }}>
        © Search Hacker News, 2023.
      </Text>
      <Text fz="xs" classNames={{ root: classes.footerText }}>
        Powered by{" "}
        <Anchor fz="xs" href="https://hn.algolia.com/api" target="_blank">
          HN Search API
        </Anchor>
      </Text>
    </Flex>
  );
};

export default AppFooter;
