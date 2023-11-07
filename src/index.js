import React from "react";
import ReactDOM from "react-dom/client";
import ThemeProvider from "./theme/provider";
import { ChrononInfoProvider } from "./data/chrononInfo";
import App from "./App";

import "./index.css";
import "@fontsource/roboto";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <ChrononInfoProvider>
        <App />
      </ChrononInfoProvider>
    </ThemeProvider>
  </React.StrictMode>
);

