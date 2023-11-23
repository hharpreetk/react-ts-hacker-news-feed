import React from "react";
import ReactDOM from "react-dom/client";
import { MantineProvider } from '@mantine/core';
import App from "./components/App";
import { StoriesProvider } from "./contexts/StoriesContext";
import '@mantine/core/styles.css';

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <MantineProvider>
    <StoriesProvider>
      <App />
    </StoriesProvider>
    </MantineProvider>
  </React.StrictMode>
);
