import {
  ActionIcon,
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
import { IconQuestionMark } from "@tabler/icons-react";

const SettingsView = () => {
  return (
    <Stack gap="xs" w="100%">
      <ScrollArea type="auto" offsetScrollbars scrollbars="x">
        <Card withBorder miw={250}>
          <Card.Section withBorder inheritPadding py="xs">
            <Group justify="space-between">
              <Text size="sm">Display Settings</Text>
              <ActionIcon variant="default" radius="sm">
                <IconQuestionMark size={13} />
              </ActionIcon>
            </Group>
          </Card.Section>
          <CardSection withBorder inheritPadding py="xs">
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
          <Card.Section withBorder inheritPadding py="sm">
            <Group justify="space-between">
              <Text size="sm">Default Filters</Text>
              <ActionIcon variant="default" radius="sm">
                <IconQuestionMark size={13} />
              </ActionIcon>
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
          <Card.Section withBorder inheritPadding py="xs">
            <Group justify="space-between">
              <Text size="sm">Search Matching</Text>
              <ActionIcon variant="default" radius="sm">
                <IconQuestionMark size={13} />
              </ActionIcon>
            </Group>
          </Card.Section>
          <CardSection withBorder inheritPadding py="xs">
            <Grid align="center">
              <Grid.Col span={4}>
                <Text size="sm">Author</Text>
              </Grid.Col>
              <Grid.Col span="auto">
                <Checkbox defaultChecked />
              </Grid.Col>
            </Grid>
          </CardSection>
          <CardSection withBorder inheritPadding py="xs">
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
  );
};

export default SettingsView;
