import { Button, Flex, Group, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useSettings } from "../../contexts/SettingsContext";
import { useCustomMantineTheme } from "../../contexts/MantineThemeContext";
import {
  HITS_PER_PAGE_OPTIONS,
  CONTENT_OPTIONS,
  COMMON_SORT_OPTIONS,
  DATE_RANGE_OPTIONS,
} from "../../constants/options";
import { ThemeOption } from "../../constants/options";
import ThemeToggle from "./ThemeToggle";
import SettingsCard from "./SettingsCard";
import SettingsSection from "./SettingsSection";
import SettingsSelect from "./SettingsSelect";
import SettingsCheckbox from "./SettingsCheckbox";
import classes from "../../styles/Button.module.css";
import ScaleSlider from "./ScaleSlider";

const SettingsView = () => {
  // Persist settings
  const [settings, setSettings] = useSettings();

  // const { setColorScheme } = useMantineColorScheme();

  const { setScale, setColorScheme } = useCustomMantineTheme();

  const form = useForm({
    initialValues: settings,
  });

  const handleThemeToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTheme = event.currentTarget.checked
      ? ThemeOption.Dark
      : ThemeOption.Light;

    form.setValues({
      ...form.values,
      theme: newTheme,
    });

    setColorScheme(newTheme);
  };

  const handleStoryTextChecked = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    form.setValues({
      ...form.values,
      storyText: event.currentTarget.checked,
    });
  };

  const handleAuthorChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    form.setValues({
      ...form.values,
      authorText: event.currentTarget.checked,
    });
  };

  const handlePerPageSelect = (value: string | null) => {
    form.setValues({
      ...form.values,
      hitsPerPage: value,
    });
  };

  const handleDefaultSortSelect = (value: string | null) => {
    form.setValues({
      ...form.values,
      defaultSort: value,
    });
  };

  const handleDefaultContentSelect = (value: string | null) => {
    form.setValues({
      ...form.values,
      defaultContent: value,
    });
  };

  const handleDefaultDateRangeSelect = (value: string | null) => {
    form.setValues({
      ...form.values,
      defaultDateRange: value,
    });
  };

  const handleScaleChange = (value: number) => {
    form.setValues({
      ...form.values,
      scale: value,
    });

    setScale(value);
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        // When the form is submitted and it's dirty, the settings are saved, and the dirty state is reset
        if (form.isDirty()) {
          setSettings(form.values); // Save form values to local storage
        }
        form.resetDirty();
      }}
    >
      <Flex direction="column" align="flex-end">
        <Stack gap="xs" w="100%">
          <SettingsCard
            title="Display Settings"
            hoverText=" Pick a light or dark theme for the interface, and adjust the items per page to suit your browsing preferences."
          >
            <SettingsSection label="Theme">
              <ThemeToggle
                theme={form.values.theme}
                handleToggle={handleThemeToggle}
              />
            </SettingsSection>
            <SettingsSection label="Scale">
              <ScaleSlider
                scale={form.values.scale}
                handleChange={handleScaleChange}
              />
            </SettingsSection>
            <SettingsSection label="Hits Per Page" withBorder={false}>
              <SettingsSelect
                options={HITS_PER_PAGE_OPTIONS}
                selectedValue={form.values.hitsPerPage}
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
                selectedValue={form.values.defaultSort}
                handleSelect={handleDefaultSortSelect}
              />
            </SettingsSection>
            <SettingsSection label="Content">
              <SettingsSelect
                options={CONTENT_OPTIONS}
                selectedValue={form.values.defaultContent}
                handleSelect={handleDefaultContentSelect}
              />
            </SettingsSection>
            <SettingsSection label="Date Range" withBorder={false}>
              <SettingsSelect
                options={DATE_RANGE_OPTIONS}
                selectedValue={form.values.defaultDateRange}
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
                checked={form.values.authorText}
                handleChecked={handleAuthorChecked}
              />
            </SettingsSection>
            <SettingsSection label="Story Text" withBorder={false}>
              <SettingsCheckbox
                checked={form.values.storyText}
                handleChecked={handleStoryTextChecked}
              />
            </SettingsSection>
          </SettingsCard>
        </Stack>
        <Group gap="xs" mb="xs">
          <Button
            type="submit"
            variant="filled"
            classNames={classes}
            disabled={!form.isDirty()}
          >
            Save
          </Button>
        </Group>
      </Flex>
    </form>
  );
};

export default SettingsView;
