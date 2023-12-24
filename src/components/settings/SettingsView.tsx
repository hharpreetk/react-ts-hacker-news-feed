import { Button, Flex, Group, Stack } from "@mantine/core";
import {
  DEFAULT_DISPLAY_SETTINGS,
  DEFAULT_DEFAULT_FILTERS,
  DEFAULT_SEARCH_MATCHES,
} from "../../constants/settings";
import {
  DISPLAY_SETTING,
  DEFAULT_FILTER,
  SEARCH_MATCH,
} from "../../constants/settings";
import {
  PER_PAGE_OPTIONS,
  CONTENT_OPTIONS,
  COMMON_SORT_OPTIONS,
  DATE_RANGE_OPTIONS,
} from "../../constants/options";
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
              options={PER_PAGE_OPTIONS}
              value={DEFAULT_DISPLAY_SETTINGS[DISPLAY_SETTING.PER_PAGE]}
            />
          </SettingsSection>
        </SettingsCard>
        <SettingsCard
          title="Default Filters"
          hoverText="Choose sort options, content type, and date range filters for your content."
        >
          <SettingsSection label="Sort">
            <SettingsSelect
              options={COMMON_SORT_OPTIONS}
              value={DEFAULT_DEFAULT_FILTERS[DEFAULT_FILTER.SORT]}
            />
          </SettingsSection>
          <SettingsSection label="Content">
            <SettingsSelect
              options={CONTENT_OPTIONS}
              value={DEFAULT_DEFAULT_FILTERS[DEFAULT_FILTER.CONTENT]}
            />
          </SettingsSection>
          <SettingsSection label="Date Range" withBorder={false}>
            <SettingsSelect
              options={DATE_RANGE_OPTIONS}
              value={DEFAULT_DEFAULT_FILTERS[DEFAULT_FILTER.DATE_RANGE]}
            />
          </SettingsSection>
        </SettingsCard>
        <SettingsCard
          title="Search Match"
          hoverText="When checked, the search will include matches for selected attributes, author names or story text."
        >
          <SettingsSection label="Author">
            <SettingsCheckbox checked={DEFAULT_SEARCH_MATCHES[SEARCH_MATCH.AUTHOR]} />
          </SettingsSection>
          <SettingsSection label="Story Text" withBorder={false}>
            <SettingsCheckbox checked={DEFAULT_SEARCH_MATCHES[SEARCH_MATCH.STORY_TEXT]} />
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
