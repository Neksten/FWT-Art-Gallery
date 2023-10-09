import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import { ThemeProvider } from "@/context/ThemeContext";
import { store } from "@/store";

import { AuthProvider } from "@/providers/AuthProvider";
import { ErrorProvider } from "@/providers/ErrorProvider";
import { FiltersProvider } from "@/context/FiltersContext";
import { App } from "@/components/App";

import "@/index.scss";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <ThemeProvider>
      <ErrorProvider>
        <FiltersProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </FiltersProvider>
      </ErrorProvider>
    </ThemeProvider>
  </Provider>
);
