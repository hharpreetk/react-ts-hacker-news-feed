import { Grid, ActionIcon } from "@mantine/core";
import { useLocation } from "react-router-dom";
import { IconSquareLetterH } from "@tabler/icons-react";
import SearchBar from "../search/SearchBar";
import ExitButton from "../settings/ExitButton";

const AppHeader: React.FC = () => {
  const location = useLocation();
  const showSearchBar = location.pathname === "/";
  const showExitButton = location.pathname === "/settings" || location.pathname.startsWith("/story/");

  return (
    <Grid px="lg" py={22} align="center" justify="space-between">
      <ActionIcon component="a" href="/" variant="transparent" size={37} aria-label="Go to Home" title="Go to Home">
        <IconSquareLetterH size={37} />
      </ActionIcon>
      {showSearchBar && <SearchBar />}
      {showExitButton && <ExitButton />}
    </Grid>
  );
};

export default AppHeader;
