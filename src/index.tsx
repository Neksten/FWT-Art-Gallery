import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import { App } from "@/components/App";
import { ThemeProvider } from "@/context/ThemeContext";
import { store } from "@/store";
import { AuthProvider } from "@/providers/AuthProvider";

import "@/index.scss";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <ThemeProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </Provider>
);
