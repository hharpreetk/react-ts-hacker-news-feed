import { CardSection, Grid, Text } from "@mantine/core";

interface SettingsSectionProps {
  withBorder?: boolean;
  label: string;
  children: React.ReactNode;
}
const SettingsSection: React.FC<SettingsSectionProps> = ({
  withBorder = true,
  label,
  children,
}) => {
  return (
    <CardSection withBorder={withBorder} inheritPadding py="sm">
      <Grid align="center">
        <Grid.Col span={4}>
          <Text fz="sm">{label}</Text>
        </Grid.Col>
        <Grid.Col span="auto">{children}</Grid.Col>
      </Grid>
    </CardSection>
  );
};

export default SettingsSection;
