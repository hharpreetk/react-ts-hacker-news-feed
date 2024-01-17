import {
  Card,
  Group,
  HoverCard,
  ScrollArea,
  Text,
  ThemeIcon,
  rem,
} from "@mantine/core";
import { IconHelpCircle } from "@tabler/icons-react";

interface SettingsCardProps {
  title: string;
  hoverText: string;
  children: React.ReactNode;
}

const SettingsCard: React.FC<SettingsCardProps> = ({
  title,
  hoverText,
  children,
}) => {
  return (
    <ScrollArea offsetScrollbars="x">
      <Card withBorder miw={250} pb={0}>
        <Card.Section withBorder inheritPadding py={16}>
          <Group justify="space-between" my={3}>
            <Text fz="sm">{title}</Text>
            <HoverCard width={220}>
              <HoverCard.Target>
                <IconHelpCircle
                  style={{ width: rem(22), height: rem(22) }}
                  strokeWidth={1.5}
                  color="gray"
                  aria-label={`Hover to see more information about ${title.toLowerCase()}.`}
                />
              </HoverCard.Target>
              <HoverCard.Dropdown>
                <Text fz="sm">{hoverText}</Text>
              </HoverCard.Dropdown>
            </HoverCard>
          </Group>
        </Card.Section>
        {children}
      </Card>
    </ScrollArea>
  );
};

export default SettingsCard;
