import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { theme } from "./themes/theme";
import { StoriesProvider } from "./contexts/StoriesContext";
import { SearchProvider } from "./contexts/SearchContext";
import Search from "./components/pages/Search";
import Settings from "./components/pages/Settings";
import "@mantine/core/styles.css";

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

const router = createBrowserRouter([
  {
    path: "/:path?",
    element: <Search />,
  },
  {
    path: "/settings",
    element: <Settings />
  }
]);

const App: React.FC = () => <RouterProvider router={router} />;

root.render(
  <React.StrictMode>
    <MantineProvider theme={theme} defaultColorScheme="light">
      <StoriesProvider>
      <SearchProvider>
        <App />
        </SearchProvider>
      </StoriesProvider>
    </MantineProvider>
  </React.StrictMode>
);
