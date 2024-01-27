import {
  ScrollArea,
  SegmentedControl,
  rem,
  useMantineTheme,
} from "@mantine/core";
import { useSearch } from "../../contexts/SearchContext";
import { CONTENT_OPTIONS } from "../../constants/options";
import classes from "../../styles/SegmentedControl.module.css";

const ContentFilter: React.FC = () => {
  const { selectedContent, handleContentChange } = useSearch();
  const theme = useMantineTheme();
  return (
    <ScrollArea
      mb={5}
      scrollbarSize={10}
      type="auto"
      offsetScrollbars
      scrollbars="x"
    >
      <SegmentedControl
        data={CONTENT_OPTIONS}
        value={selectedContent ? selectedContent : ""}
        color={theme.primaryColor}
        size="lg"
        p={rem(2)}
        classNames={classes}
        onChange={handleContentChange}
        transitionDuration={0}
        autoContrast
      />
    </ScrollArea>
  );
};

export default ContentFilter;
