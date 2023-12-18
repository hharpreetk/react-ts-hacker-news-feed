import {
  AppShell,
  Anchor,
  Flex,
  Title,
  Text,
  Group,
  useMantineTheme,
} from "@mantine/core";
import AppHeader from "../shared/AppHeader";
import AppFooter from "../shared/AppFooter";

const NotFound = () => {
  const theme = useMantineTheme();
  return (
    <AppShell
      padding="md"
      header={{ height: 65 }}
      footer={{ height: { base: 80, xs: 60 } }}
      pos="relative"
    >
      <AppShell.Header>
        <AppHeader />
      </AppShell.Header>
      <AppShell.Main display="flex">
        <Flex
          direction="column"
          justify="center"
          align="center"
          gap="xs"
          m="auto"
          p="md"
          maw={800}
        >
          <Title c={theme.primaryColor} ta="center">
            Sorry, that page can't be found.
          </Title>
          <Text c="dimmed" size="lg" ta="center">
            Page you are trying to open does not exist. You may have mistyped
            the address, or the page has been moved to another URL. If you think
            this is an error contact support.
          </Text>
          <Group justify="center" mb="md">
            <Anchor href="/" size="lg" underline="always" c={theme.primaryColor}>
              Go Back To Home Page
            </Anchor>
          </Group>
        </Flex>
      </AppShell.Main>
      <AppShell.Footer pos="absolute" bottom={0} p="lg">
        <AppFooter />
      </AppShell.Footer>
    </AppShell>
  );
};

export default NotFound;
