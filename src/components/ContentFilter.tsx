import {
  ScrollArea,
  SegmentedControl,
  useMantineTheme,
  useMantineColorScheme,
} from "@mantine/core";
import { CONTENT_OPTIONS } from "../constants/options";
import classes from "../styles/SegmentedControl.module.css";

interface ContentilterProps {
  selectedContent: string;
  onContentChange: (selectedOptions: string) => void;
}

const ContentFilter: React.FC<ContentilterProps> = ({
  selectedContent,
  onContentChange,
}) => {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  return (
    <ScrollArea mb={6} scrollbarSize={9} type="auto">
      <SegmentedControl
        data={CONTENT_OPTIONS}
        value={selectedContent}
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
        }}
        mb={9}
        classNames={{ control: classes.control, label: classes.label }}
        onChange={onContentChange}
        transitionDuration={0}
      />
    </ScrollArea>
  );
};

export default ContentFilter;
