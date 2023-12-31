import { Grid, ActionIcon } from "@mantine/core";
import { useLocation } from "react-router-dom";
import { IconSquareLetterH } from "@tabler/icons-react";
import SearchHeader from "../search/SearchHeader";
import SettingsHeader from "../settings/SettingsHeader";

const AppHeader: React.FC = () => {
  const location = useLocation();
  const showSearchHeader = location.pathname === "/";
  return (
    <Grid px="lg" py={22} align="center" justify="space-between">
      <ActionIcon component="a" href="/" variant="transparent" size={37}>
        <IconSquareLetterH size={37} />
      </ActionIcon>
      {showSearchHeader ? <SearchHeader /> : <SettingsHeader />}
    </Grid>
  );
};

export default AppHeader;
