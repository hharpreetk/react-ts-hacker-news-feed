import { Grid, ThemeIcon, ActionIcon } from "@mantine/core";
import { IconSquareLetterH, IconAdjustmentsCog } from "@tabler/icons-react";
import StorySearch from "../search/StorySearch";

interface AppHeaderProps {
  searchTerm: string;
  handleSearchInput: (searchInput: string) => void;
  handleSearchSubmit: () => void;
  suggestions: Array<string>;
}

const AppHeader: React.FC<AppHeaderProps> = ({
  searchTerm,
  handleSearchInput,
  handleSearchSubmit,
  suggestions,
}) => (
  <Grid px="lg" py={14} align="center" justify="space-between">
    <ThemeIcon variant="transparent" size={37}>
      <IconSquareLetterH size={37} />
    </ThemeIcon>
    <Grid.Col span="auto" maw="90%">
      <StorySearch
        searchTerm={searchTerm}
        onSearchInput={handleSearchInput}
        onSearchSubmit={handleSearchSubmit}
        suggestions={suggestions}
      />
    </Grid.Col>
    <ActionIcon component="a" href="/settings" variant="default" size="lg" aria-label="Edit App Settings">
      <IconAdjustmentsCog size={18} stroke={1.5} />
    </ActionIcon>
  </Grid>
);

export default AppHeader;
