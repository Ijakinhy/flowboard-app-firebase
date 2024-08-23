import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { theme } from "./theme.js";
import { Provider } from "react-redux";
import { store } from "./store.js";
import ToastManager from "./components/layout/ToastManager.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ToastManager />
        <App />
      </ThemeProvider>
    </Provider>
  </>
);
