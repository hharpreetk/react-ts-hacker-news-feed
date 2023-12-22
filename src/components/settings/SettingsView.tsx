import {
  Button,
  Card,
  CardSection,
  Checkbox,
  Flex,
  Grid,
  Group,
  ScrollArea,
  Select,
  Stack,
  Text,
} from "@mantine/core";
import ThemeToggle from "./ThemeToggle";
import { IconHelpCircle } from "@tabler/icons-react";

const SettingsView = () => {
  return (
    <Flex direction="column" align="flex-end">
      <Stack gap="xs" w="100%">
        <ScrollArea type="auto" offsetScrollbars scrollbars="x">
          <Card withBorder miw={250}>
            <Card.Section withBorder inheritPadding py="md">
              <Group justify="space-between">
                <Text size="sm">Display Settings</Text>
                <IconHelpCircle size={22} color="gray" />
              </Group>
            </Card.Section>
            <CardSection withBorder inheritPadding py="sm">
              <Grid align="center">
                <Grid.Col span={4}>
                  <Text size="sm">Theme</Text>
                </Grid.Col>
                <Grid.Col span="auto">
                  <ThemeToggle />
                </Grid.Col>
              </Grid>
            </CardSection>
            <CardSection withBorder inheritPadding py="xs">
              <Grid align="center">
                <Grid.Col span={4}>
                  <Text size="sm">Per Page</Text>
                </Grid.Col>
                <Grid.Col span="auto">
                  <Select
                    data={["10", "20", "30", "40", "50"]}
                    value="20"
                    allowDeselect={false}
                    size="sm"
                    maw={200}
                  />
                </Grid.Col>
              </Grid>
            </CardSection>
          </Card>
        </ScrollArea>
        <ScrollArea type="auto" offsetScrollbars scrollbars="x">
          <Card miw={290} withBorder>
            <Card.Section withBorder inheritPadding py="md">
              <Group justify="space-between">
                <Text size="sm">Default Filters</Text>
                <IconHelpCircle size={22} color="gray" />
              </Group>
            </Card.Section>
            <CardSection withBorder inheritPadding py="xs">
              <Grid align="center">
                <Grid.Col span={4}>
                  <Text size="sm">Sort</Text>
                </Grid.Col>
                <Grid.Col span="auto">
                  <Select
                    data={["Popularity", "Date"]}
                    value="Popularity"
                    allowDeselect={false}
                    size="sm"
                    maw={200}
                  />
                </Grid.Col>
              </Grid>
            </CardSection>
            <CardSection withBorder inheritPadding py="xs">
              <Grid align="center">
                <Grid.Col span={4}>
                  <Text size="sm">Type</Text>
                </Grid.Col>
                <Grid.Col span="auto">
                  <Select
                    data={[
                      "Stories",
                      "Ask HN",
                      "Show HN",
                      "Launch HN",
                      "Jobs",
                      "Polls",
                    ]}
                    value="Stories"
                    allowDeselect={false}
                    size="sm"
                    maw={200}
                  />
                </Grid.Col>
              </Grid>
            </CardSection>
            <CardSection withBorder inheritPadding py="xs">
              <Grid align="center">
                <Grid.Col span={4}>
                  <Text size="sm">Date Range</Text>
                </Grid.Col>
                <Grid.Col span="auto">
                  <Select
                    data={[
                      "Forever",
                      "Past Year",
                      "Past Month",
                      "Past Week",
                      "Past 24 Hrs",
                      "Past Hour",
                    ]}
                    value="Forever"
                    allowDeselect={false}
                    size="sm"
                    maw={200}
                  />
                </Grid.Col>
              </Grid>
            </CardSection>
          </Card>
        </ScrollArea>
        <ScrollArea type="auto" offsetScrollbars scrollbars="x">
          <Card miw={290} withBorder>
            <Card.Section withBorder inheritPadding py="md">
              <Group justify="space-between">
                <Text size="sm">Search Match</Text>
                <IconHelpCircle size={22} color="gray" />
              </Group>
            </Card.Section>
            <CardSection withBorder inheritPadding py="md">
              <Grid align="center">
                <Grid.Col span={4}>
                  <Text size="sm">Author</Text>
                </Grid.Col>
                <Grid.Col span="auto">
                  <Checkbox defaultChecked />
                </Grid.Col>
              </Grid>
            </CardSection>
            <CardSection withBorder inheritPadding py="md">
              <Grid align="center">
                <Grid.Col span={4}>
                  <Text size="sm">Story Text</Text>
                </Grid.Col>
                <Grid.Col span="auto">
                  <Checkbox defaultChecked />
                </Grid.Col>
              </Grid>
            </CardSection>
          </Card>
        </ScrollArea>
      </Stack>
      <Group gap="xs" mb="xs">
        <Button variant="default" fw={400} style={{ fontSize: 15 }} h={39}>
          Reset
        </Button>
        <Button
          variant="filled"
          fw={400}
          style={{ fontSize: 15, border: "none" }}
          h={39}
        >
          Save
        </Button>
      </Group>
    </Flex>
  );
};

export default SettingsView;
