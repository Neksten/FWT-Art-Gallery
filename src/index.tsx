import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import { store } from "@/store";
import { ThemeProvider } from "@/context/ThemeContext";
import { FiltersProvider } from "@/context/FiltersContext";

import { App } from "@/components/App";
import { AuthProvider } from "@/providers/AuthProvider";
import { ErrorProvider } from "@/providers/ErrorProvider";

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
