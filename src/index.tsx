import React from "react";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Router from "./app/components/Router";

const container: HTMLElement = document.getElementById("root") as HTMLElement;
const root = createRoot(container!); // createRoot(container!) if you use TypeScript

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
root.render(<App />);
