import { AppShell as App, rem } from "@mantine/core";
import { useHeadroom } from "@mantine/hooks";
import AppHeader from "../shared/AppHeader";
import AppFooter from "../shared/AppFooter";

interface AppShellProps {
  children: React.ReactNode;
  isDisplayCenter?: boolean;
}

const AppShell: React.FC<AppShellProps> = ({ children, isDisplayCenter }) => {
  // Collaspe the header when user scrolls
  const pinned = useHeadroom({ fixedAt: 120 });

  return (
    <App
      padding="md"
      header={{ height: 65, collapsed: !pinned, offset: false }}
      footer={{ height: { base: 80, xs: 65 } }}
      transitionDuration={0}
      pos="relative"
    >
      <App.Header>
        <AppHeader />
      </App.Header>
      <App.Main
        maw={`calc(${rem(800)} + 2*var(--mantine-spacing-md))`}
        m="auto"
        pt={`calc(${rem(65)} + var(--mantine-spacing-md))`}
        display={isDisplayCenter ? "flex" : "block"}
      >
        {children}
      </App.Main>
      <App.Footer pos="absolute" display="flex" px="md">
        <AppFooter />
      </App.Footer>
    </App>
  );
};

export default AppShell;
