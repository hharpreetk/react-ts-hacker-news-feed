import {
  Switch,
  useMantineTheme,
  rem,
  useMantineColorScheme,
} from "@mantine/core";
import { IconSun, IconMoonStars } from "@tabler/icons-react";

const ThemeToggle = () => {
  const theme = useMantineTheme();
  const { toggleColorScheme } = useMantineColorScheme();

  const sunIcon = (
    <IconSun
      style={{ width: rem(16), height: rem(16) }}
      stroke={2.5}
      color={theme.colors.yellow[4]}
    />
  );

  const moonIcon = (
    <IconMoonStars
      style={{ width: rem(16), height: rem(16) }}
      stroke={2.5}
      color={theme.colors.blue[6]}
    />
  );

  return (
    <Switch
      size="md"
      m={4}
      color="dark.4"
      onLabel={sunIcon}
      offLabel={moonIcon}
      onChange={toggleColorScheme}
    />
  );
};

export default ThemeToggle;
