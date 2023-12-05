import React from "react";
import ReactDOM from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import { theme } from "./themes/theme";
import App from "./components/App";
import { StoriesProvider } from "./contexts/StoriesContext";
import "@mantine/core/styles.css";

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <StoriesProvider>
        <App />
      </StoriesProvider>
    </MantineProvider>
  </React.StrictMode>
);
