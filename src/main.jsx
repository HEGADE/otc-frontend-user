import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SocketContextProvider } from "./context/SocketContext.jsx";
import { MantineProvider } from "@mantine/core";
import {ModalsProvider} from '@mantine/modals'

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <SocketContextProvider>
        <MantineProvider>
          <ModalsProvider>
          <App />
          </ModalsProvider>
        </MantineProvider>
      </SocketContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
