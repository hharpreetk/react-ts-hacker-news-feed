import { Switch, useMantineTheme, rem } from "@mantine/core";
import { IconSun, IconMoonStars } from "@tabler/icons-react";

interface ThemeToggleProps {
  theme: string;
  handleToggle: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, handleToggle }) => {
  const mantineTheme = useMantineTheme();

  const sunIcon = (
    <IconSun
      style={{ width: rem(16), height: rem(16) }}
      stroke={2.5}
      color={mantineTheme.colors.yellow[4]}
    />
  );

  const moonIcon = (
    <IconMoonStars
      style={{ width: rem(16), height: rem(16) }}
      stroke={2.5}
      color={mantineTheme.colors.blue[6]}
    />
  );

  return (
    <Switch
      size="md"
      m={4}
      color="dark.4"
      onLabel={sunIcon}
      offLabel={moonIcon}
      checked={theme === "dark"}
      onChange={handleToggle}
    />
  );
};

export default ThemeToggle;
