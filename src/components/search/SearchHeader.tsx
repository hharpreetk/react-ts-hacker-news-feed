import { Grid, ActionIcon } from "@mantine/core";
import { IconAdjustmentsCog } from "@tabler/icons-react";
import StorySearch from "../search/StorySearch";

const SearchHeader = () => {
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
        aria-label="Edit App Settings"
      >
        <IconAdjustmentsCog size={18} stroke={1.5} />
      </ActionIcon>
    </>
  );
};

export default SearchHeader;
