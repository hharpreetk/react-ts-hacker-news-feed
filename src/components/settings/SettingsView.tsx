import { Button, Flex, Group, Stack } from "@mantine/core";
import { useSemiPersistentState } from "../../hooks/useSemiPersistentState";
import {
  DEFAULT_DISPLAY_SETTING_THEME,
  DEFAULT_DISPLAY_SETTING_HITS_PER_PAGE,
  DEFAULT_DEFAULT_FILTERS,
  DEFAULT_SEARCH_MATCHES,
} from "../../constants/settings";
import {
  DISPLAY_SETTING_THEME,
  DISPLAY_SETTING_HITS_PER_PAGE,
  DEFAULT_FILTER,
  SEARCH_MATCH,
} from "../../constants/settings";
import {
  HITS_PER_PAGE_OPTIONS,
  CONTENT_OPTIONS,
  COMMON_SORT_OPTIONS,
  DATE_RANGE_OPTIONS,
  THEME_OPTION,
} from "../../constants/options";
import ThemeToggle from "./ThemeToggle";
import SettingsCard from "./SettingsCard";
import SettingsSection from "./SettingsSection";
import SettingsSelect from "./SettingsSelect";
import SettingsCheckbox from "./SettingsCheckbox";
import classes from "../../styles/Button.module.css";

const SettingsView = () => {
  // Persist settings
  const [settings, setSettings] = useSemiPersistentState("APP_SETTINGS", {
    // Initial settings
    theme: DEFAULT_DISPLAY_SETTING_THEME[DISPLAY_SETTING_THEME.THEME],
    hitsPerPage:
      DEFAULT_DISPLAY_SETTING_HITS_PER_PAGE[
        DISPLAY_SETTING_HITS_PER_PAGE.HITS_PER_PAGE
      ],
    defaultContent: DEFAULT_DEFAULT_FILTERS[DEFAULT_FILTER.CONTENT],
    defaultSort: DEFAULT_DEFAULT_FILTERS[DEFAULT_FILTER.SORT],
    defaultDateRange: DEFAULT_DEFAULT_FILTERS[DEFAULT_FILTER.DATE_RANGE],
    authorText: DEFAULT_SEARCH_MATCHES[SEARCH_MATCH.AUTHOR],
    storyText: DEFAULT_SEARCH_MATCHES[SEARCH_MATCH.STORY_TEXT],
  });

  const handleThemeToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTheme = event.currentTarget.checked
      ? THEME_OPTION.DARK_THEME
      : THEME_OPTION.LIGHT_THEME;
    setSettings({
      ...settings,
      theme: newTheme,
    });
  };

  const handleStoryTextChecked = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSettings({
      ...settings,
      storyText: event.currentTarget.checked,
    });
  };

  const handleAuthorChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({
      ...settings,
      authorText: event.currentTarget.checked,
    });
  };

  const handlePerPageSelect = (value: string | null) => {
    setSettings({
      ...settings,
      hitsPerPage: value,
    });
  };

  const handleDefaultSortSelect = (value: string | null) => {
    setSettings({
      ...settings,
      defaultSort: value,
    });
  };

  const handleDefaultContentSelect = (value: string | null) => {
    setSettings({
      ...settings,
      defaultContent: value,
    });
  };

  const handleDefaultDateRangeSelect = (value: string | null) => {
    setSettings({
      ...settings,
      defaultDateRange: value,
    });
  };

  return (
    <Flex direction="column" align="flex-end">
      <Stack gap="xs" w="100%">
        <SettingsCard
          title="Display Settings"
          hoverText=" Pick a light or dark theme for the interface, and adjust the items per page to suit your browsing preferences."
        >
          <SettingsSection label="Theme">
            <ThemeToggle
              theme={settings.theme}
              handleToggle={handleThemeToggle}
            />
          </SettingsSection>
          <SettingsSection label="Hits Per Page" withBorder={false}>
            <SettingsSelect
              options={HITS_PER_PAGE_OPTIONS}
              selectedValue={settings.hitsPerPage}
              handleSelect={handlePerPageSelect}
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
              selectedValue={settings.defaultSort}
              handleSelect={handleDefaultSortSelect}
            />
          </SettingsSection>
          <SettingsSection label="Content">
            <SettingsSelect
              options={CONTENT_OPTIONS}
              selectedValue={settings.defaultContent}
              handleSelect={handleDefaultContentSelect}
            />
          </SettingsSection>
          <SettingsSection label="Date Range" withBorder={false}>
            <SettingsSelect
              options={DATE_RANGE_OPTIONS}
              selectedValue={settings.defaultDateRange}
              handleSelect={handleDefaultDateRangeSelect}
            />
          </SettingsSection>
        </SettingsCard>
        <SettingsCard
          title="Search Match"
          hoverText="When checked, the search will include matches for selected attributes, author names or story text."
        >
          <SettingsSection label="Author">
            <SettingsCheckbox
              checked={settings.authorText}
              handleChecked={handleAuthorChecked}
            />
          </SettingsSection>
          <SettingsSection label="Story Text" withBorder={false}>
            <SettingsCheckbox
              checked={settings.storyText}
              handleChecked={handleStoryTextChecked}
            />
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
