import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import { App } from "@components/App";
import { ThemeProvider } from "./context/ThemeContext/ThemeContext";
import { store } from "./store";

import "./index.scss";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </Provider>
);
