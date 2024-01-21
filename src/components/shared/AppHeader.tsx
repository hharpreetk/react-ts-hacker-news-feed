import { Grid, ActionIcon, rem } from "@mantine/core";
import { useLocation } from "react-router-dom";
import { IconSquareLetterH } from "@tabler/icons-react";
import BackButton from "../settings/BackButton";
import SearchHeader from "../search/SearchHeader";

const AppHeader: React.FC = () => {
  const location = useLocation();
  const showSearchHeader = location.pathname === "/";
  const showExitButton =
    location.pathname === "/settings" ||
    location.pathname.startsWith("/story/");

  return (
    <Grid px="lg" py={22} align="center" justify="space-between">
      <ActionIcon
        component="a"
        href="/"
        variant="transparent"
        size={rem(37)}
        aria-label="Go to Home"
        title="Go to Home"
      >
        <IconSquareLetterH style={{ width: rem(37), height: rem(37) }} />
      </ActionIcon>
      {showSearchHeader && <SearchHeader />}
      {showExitButton && <BackButton />}
    </Grid>
  );
};

export default AppHeader;
