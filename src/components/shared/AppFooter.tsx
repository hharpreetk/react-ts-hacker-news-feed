import { Flex, Text, Anchor, useMantineTheme } from "@mantine/core";

const AppFooter = () => {
  const theme = useMantineTheme();
  return (
    <Flex
      c="dimmed"
      direction={{ base: "column-reverse", xs: "row" }}
      justify={{ base: "center", xs: "space-between" }}
      gap="xs"
      align="center"
      wrap="wrap"
    >
      <Text size="xs">© Search Hacker News, 2023.</Text>
      <Text size="xs">
        Powered by{" "}
        <Anchor href="https://hn.algolia.com/api" target="_blank">
          HN Search API
        </Anchor>
      </Text>
    </Flex>
  );
};

export default AppFooter;
