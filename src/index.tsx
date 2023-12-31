import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { theme } from "./themes/theme";
import { SettingsProvider } from "./contexts/SettingsContext";
import { StoriesProvider } from "./contexts/StoriesContext";
import { SearchProvider } from "./contexts/SearchContext";
import Search from "./components/pages/Search";
import Settings from "./components/pages/Settings";
import NotFound from "./components/pages/NotFound";
import "@mantine/core/styles.css";
import "./styles/Global.module.css";
import StoryDetail from "./components/pages/StoryDetail";

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Router>
      <MantineProvider theme={theme}>
        <SettingsProvider>
          <StoriesProvider>
            <SearchProvider>
              <Routes>
                <Route path="/" element={<Search />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/story/:id" element={<StoryDetail />} />
                {/* Catch-all route for unmatched routes */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </SearchProvider>
          </StoriesProvider>
        </SettingsProvider>
      </MantineProvider>
    </Router>
  </React.StrictMode>
);
