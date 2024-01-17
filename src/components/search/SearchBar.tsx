import { Grid, ActionIcon, rem } from "@mantine/core";
import { IconAdjustmentsCog } from "@tabler/icons-react";
import StorySearch from "./StorySearch";

const SearchBar = () => {
  return (
    <>
      <Grid.Col span="auto" maw="90%" py={0}>
        <StorySearch />
      </Grid.Col>
      <ActionIcon
        component="a"
        href="/settings"
        variant="default"
        size="lg"
        title="Edit App Settings"
        aria-label="Edit App Settings"
      >
        <IconAdjustmentsCog
          style={{ height: rem(17), width: rem(17) }}
          stroke={1.5}
        />
      </ActionIcon>
    </>
  );
};

export default SearchBar;
