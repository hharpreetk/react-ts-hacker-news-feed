import { Grid, ThemeIcon, ActionIcon } from "@mantine/core";
import { IconSquareLetterH, IconAdjustmentsCog } from "@tabler/icons-react";
import StorySearch from "../search/StorySearch";

const AppHeader: React.FC = () => (
  <Grid px="lg" py={14} align="center" justify="space-between">
    <ThemeIcon variant="transparent" size={37}>
      <IconSquareLetterH size={37} />
    </ThemeIcon>
    <Grid.Col span="auto" maw="90%">
      <StorySearch />
    </Grid.Col>
    <ActionIcon
      component="a"
      href="/settings"
      variant="default"
      size="lg"
      aria-label="Edit App Settings"
    >
      <IconAdjustmentsCog size={18} stroke={1.5} />
    </ActionIcon>
  </Grid>
);

export default AppHeader;
