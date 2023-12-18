import { Grid, ThemeIcon } from "@mantine/core";
import { useLocation } from "react-router-dom";
import { IconSquareLetterH } from "@tabler/icons-react";
import SearchHeader from "../search/SearchHeader";
import SettingsHeader from "../settings/SettingsHeader";

const AppHeader: React.FC = () => {
  const location = useLocation();
  const showSearchHeader = location.pathname === "/";
  const showSettingsHeader = location.pathname === "/settings";
  return (
    <Grid px="lg" py={22} align="center" justify="space-between">
      <ThemeIcon variant="transparent" size={37}>
        <IconSquareLetterH size={37} />
      </ThemeIcon>
      {showSearchHeader && <SearchHeader />}
      {showSettingsHeader && <SettingsHeader />}
    </Grid>
  );
};

export default AppHeader;
