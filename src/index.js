import React from "react";
import ReactDOM from "react-dom/client";
import ConfigProvider from "./config/provider";
import ThemeProvider from "./theme/provider";
import { ChrononInfoProvider } from "./data/chrononInfo";
import App from "./App";

import "./index.css";
import "@fontsource/roboto";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ConfigProvider>
      <ThemeProvider>
        <ChrononInfoProvider>
          <App />
        </ChrononInfoProvider>
      </ThemeProvider>
    </ConfigProvider>
  </React.StrictMode>
);

