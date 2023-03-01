import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter as Router } from "react-router-dom";
import { customTheme } from "./theme/customTheme";
import AppContextProvider from "./context/AppContext";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <QueryClientProvider client={queryClient}>
        <AppContextProvider>
          <ThemeProvider theme={customTheme}>
            <CssBaseline />
            <App />

            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
          </ThemeProvider>
        </AppContextProvider>
      </QueryClientProvider>
    </Router>
  </React.StrictMode>
);
