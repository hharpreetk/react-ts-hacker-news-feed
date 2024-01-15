import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  CustomMantineProvider,
  CustomMantineThemeProvider,
} from "./contexts/MantineThemeContext";
import { SettingsProvider } from "./contexts/SettingsContext";
import { StoriesProvider } from "./contexts/StoriesContext";
import { SearchProvider } from "./contexts/SearchContext";
import Search from "./components/pages/Search";
import Settings from "./components/pages/Settings";
import Story from "./components/pages/Story";
import NotFound from "./components/pages/NotFound";
import "@mantine/core/styles.css";
import "./styles/Global.module.css";

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <Router>
      <QueryClientProvider client={queryClient}>
        <CustomMantineThemeProvider>
          <CustomMantineProvider>
            <SettingsProvider>
              <StoriesProvider>
                <SearchProvider>
                  <Routes>
                    <Route path="/" element={<Search />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/story/:id" element={<Story />} />
                    {/* Catch-all route for unmatched routes */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </SearchProvider>
              </StoriesProvider>
            </SettingsProvider>
          </CustomMantineProvider>
        </CustomMantineThemeProvider>
      </QueryClientProvider>
    </Router>
  </React.StrictMode>
);
