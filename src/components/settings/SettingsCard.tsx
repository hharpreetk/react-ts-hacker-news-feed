import { Box, Card, Group, HoverCard, ScrollArea, Text } from "@mantine/core";
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
    <ScrollArea type="auto" offsetScrollbars scrollbars="x">
      <Card withBorder miw={250} pb={0}>
        <Card.Section withBorder inheritPadding py={16}>
          <Group justify="space-between">
            <Text size="sm">{title}</Text>
            <HoverCard width={220}>
              <HoverCard.Target>
                <IconHelpCircle
                  size={22}
                  strokeWidth={1.5}
                  color="gray"
                  aria-label={`Hover to see more information about ${title.toLowerCase()}.`}
                />
              </HoverCard.Target>
              <HoverCard.Dropdown>
                <Text size="sm">{hoverText}</Text>
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
