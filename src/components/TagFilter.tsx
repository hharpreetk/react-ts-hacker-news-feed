import {
  ScrollArea,
  SegmentedControl,
  useMantineTheme,
  useMantineColorScheme,
} from "@mantine/core";
import { TAG_OPTIONS } from "../constants/options";
import classes from "../styles/Custom.module.css";

interface TagFilterProps {
  selectedTag: string;
  onTagChange: (selectedOptions: string) => void;
}

const TagFilter: React.FC<TagFilterProps> = ({ selectedTag, onTagChange }) => {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  return (
    <ScrollArea mb={6} scrollbarSize={9} type="auto">
      <SegmentedControl
        data={TAG_OPTIONS}
        value={selectedTag}
        color={theme.primaryColor}
        styles={{
          root: {
            background:
              colorScheme === "dark"
                ? `var(--mantine-color-dark-6)`
                : `var(--mantine-color-body)`,
            border: `calc(0.0625rem*var(--mantine-scale)) solid ${
              colorScheme === "dark"
                ? `var(--mantine-color-dark-4)`
                : `var(--mantine-color-gray-3)`
            }`,
          },
          control: {
            padding:
              "calc(0.12rem*var(--mantine-scale)) calc(0.275rem*var(--mantine-scale))",
          },
          label: {
            fontWeight: "normal",
          },
        }}
        mb={9}
        classNames={{ control: classes.control, label: classes.label }}
        onChange={onTagChange}
        transitionDuration={0}
      />
    </ScrollArea>
  );
};

export default TagFilter;
