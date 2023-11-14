import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import { StoriesProvider } from "./contexts/StoriesContext";

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <StoriesProvider>
      <App />
    </StoriesProvider>
  </React.StrictMode>
);
