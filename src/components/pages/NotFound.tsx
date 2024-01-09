import {
  Anchor,
  Flex,
  Title,
  Text,
  Group,
  useMantineTheme,
} from "@mantine/core";
import AppShell from "../shared/AppShell";

const NotFound = () => {
  const theme = useMantineTheme();
  return (
    <AppShell isDisplayCenter>
      <Flex
        direction="column"
        justify="center"
        align="center"
        m="auto"
        p="md"
        maw={800}
        gap="xs"
      >
        <Title c={theme.primaryColor} order={2} ta="center">
          Sorry, this page cannot be found.
        </Title>
        <Text c="dimmed" ta="center">
          Page you are trying to open does not exist. You may have mistyped the
          address, or the page has been moved to another URL. If you think this
          is an error contact support.
        </Text>
        <Group justify="center" mb="md">
          <Anchor href="/" underline="always" c={theme.primaryColor}>
            Go Back To Home Page
          </Anchor>
        </Group>
      </Flex>
    </AppShell>
  );
};

export default NotFound;
