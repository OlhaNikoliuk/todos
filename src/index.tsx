import React from "react";
import "./index.css";
import Router from "./Router";
import { BrowserRouter } from "react-router-dom";

import { render } from "react-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const root: HTMLElement = document.getElementById("root") as HTMLElement;

// Create a client
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Router />
        <ReactQueryDevtools />
      </BrowserRouter>
    </QueryClientProvider>
  );
};
render(<App />, root);
