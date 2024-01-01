import { Grid, ActionIcon } from "@mantine/core";
import { useLocation } from "react-router-dom";
import { IconSquareLetterH } from "@tabler/icons-react";
import SearchBar from "../search/SearchBar";
import ExitButton from "../shared/ExitButton";

const AppHeader: React.FC = () => {
  const location = useLocation();
  const showSearchHeader = location.pathname === "/";
  return (
    <Grid px="lg" py={22} align="center" justify="space-between">
      <ActionIcon component="a" href="/" variant="transparent" size={37}>
        <IconSquareLetterH size={37} />
      </ActionIcon>
      {showSearchHeader ? <SearchBar /> : <ExitButton />}
    </Grid>
  );
};

export default AppHeader;
