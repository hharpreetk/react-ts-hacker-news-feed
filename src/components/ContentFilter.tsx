import {
  ScrollArea,
  SegmentedControl,
  useMantineTheme,
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
  return (
    <ScrollArea mb={6} scrollbarSize={9} type="auto">
      <SegmentedControl
        data={CONTENT_OPTIONS}
        value={selectedContent}
        color={theme.primaryColor}
        mb={9}
        classNames={{
          root: classes.root,
          control: classes.control,
          label: classes.label,
        }}
        onChange={onContentChange}
        transitionDuration={0}
      />
    </ScrollArea>
  );
};

export default ContentFilter;
