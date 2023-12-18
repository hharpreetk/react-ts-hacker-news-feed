import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { theme } from "./themes/theme";
import { StoriesProvider } from "./contexts/StoriesContext";
import { SearchProvider } from "./contexts/SearchContext";
import Search from "./components/pages/Search";
import Settings from "./components/pages/Settings";
import NotFound from "./components/pages/NotFound";
import "@mantine/core/styles.css";

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Router>
      <MantineProvider theme={theme} defaultColorScheme="light">
        <StoriesProvider>
          <SearchProvider>
            <Routes>
              <Route path="/" element={<Search />} />
              <Route path="/settings" element={<Settings />} />
              {/* Catch-all route for unmatched routes */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </SearchProvider>
        </StoriesProvider>
      </MantineProvider>
    </Router>
  </React.StrictMode>
);
