import { ScrollArea, SegmentedControl, useMantineTheme } from "@mantine/core";
import { useSearch } from "../../contexts/SearchContext";
import { CONTENT_OPTIONS } from "../../constants/options";
import classes from "../../styles/SegmentedControl.module.css";

const ContentFilter: React.FC = () => {
  const { selectedContent, handleContentChange } = useSearch();
  const theme = useMantineTheme();
  return (
    <ScrollArea
      mb={6}
      scrollbarSize={10}
      type="auto"
      offsetScrollbars
      scrollbars="x"
    >
      <SegmentedControl
        data={CONTENT_OPTIONS}
        value={selectedContent ? selectedContent : ""}
        color={theme.primaryColor}
        classNames={classes}
        onChange={handleContentChange}
        transitionDuration={0}
      />
    </ScrollArea>
  );
};

export default ContentFilter;
