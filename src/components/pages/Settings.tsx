import { AppShell, rem } from "@mantine/core";
import AppHeader from "../shared/AppHeader";
import AppFooter from "../shared/AppFooter";
import SettingsView from "../settings/SettingsView";

const Settings: React.FC = () => {
  return (
    <AppShell
      padding="md"
      header={{ height: 65 }}
      footer={{ height: { base: 80, xs: 60 } }}
      pos="relative"
    >
      <AppShell.Header>
        <AppHeader />
      </AppShell.Header>
      <AppShell.Main
        maw={`calc(${rem(800)} + 2*var(--mantine-spacing-md))`}
        m="auto"
        pt={`calc(${rem(65)} + var(--mantine-spacing-md))`}
      >
        <SettingsView />
      </AppShell.Main>
      <AppShell.Footer pos="absolute" bottom={0} p="lg">
        <AppFooter />
      </AppShell.Footer>
    </AppShell>
  );
};

export default Settings;
