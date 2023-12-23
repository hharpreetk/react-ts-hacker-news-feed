import { Button, Flex, Group, Stack } from "@mantine/core";
import ThemeToggle from "./ThemeToggle";
import SettingsCard from "./SettingsCard";
import SettingsSection from "./SettingsSection";
import SettingsSelect from "./SettingsSelect";
import SettingsCheckbox from "./SettingsCheckbox";
import classes from "../../styles/Button.module.css";

const SettingsView = () => {
  return (
    <Flex direction="column" align="flex-end">
      <Stack gap="xs" w="100%">
        <SettingsCard
          title="Display Settings"
          hoverText=" Pick a light or dark theme for the interface, and adjust the items per page to suit your browsing preferences."
        >
          <SettingsSection label="Theme">
            <ThemeToggle />
          </SettingsSection>
          <SettingsSection label="Per Page" withBorder={false}>
            <SettingsSelect
              options={["10", "20", "30", "40", "50"]}
              value="20"
            />
          </SettingsSection>
        </SettingsCard>
        <SettingsCard
          title="Default Filters"
          hoverText="Choose sorting options, content type, and date range filters for your content."
        >
          <SettingsSection label="Sort">
            <SettingsSelect
              options={["Popularity", "Date"]}
              value="Popularity"
            />
          </SettingsSection>
          <SettingsSection label="Type">
            <SettingsSelect
              options={[
                "Stories",
                "Ask HN",
                "Show HN",
                "Launch HN",
                "Jobs",
                "Polls",
              ]}
              value="Stories"
            />
          </SettingsSection>
          <SettingsSection label="Date Range" withBorder={false}>
            <SettingsSelect
              options={[
                "Forever",
                "Past Year",
                "Past Month",
                "Past Week",
                "Past 24 Hrs",
                "Past Hour",
              ]}
              value="Forever"
            />
          </SettingsSection>
        </SettingsCard>
        <SettingsCard
          title="Search Match"
          hoverText="Enable or disable search matching for specific criteria. When active, the search will include matches for the selected attributes, such as author names or story text."
        >
          <SettingsSection label="Author">
            <SettingsCheckbox />
          </SettingsSection>
          <SettingsSection label="Story Text" withBorder={false}>
            <SettingsCheckbox />
          </SettingsSection>
        </SettingsCard>
      </Stack>
      <Group gap="xs" mb="xs">
        <Button variant="filled" classNames={classes}>
          Save
        </Button>
      </Group>
    </Flex>
  );
};

export default SettingsView;
