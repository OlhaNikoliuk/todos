import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Todos } from "./app/components/Todos";
import { NotFound } from "./app/components/NotFound";
import { QueryClient } from "@tanstack/react-query";

const App = () => {
  // Create a client
  const queryClient = new QueryClient();

  return (
    <Routes>
      <Route index path="/todos" element={<Todos />} />
      <Route path="/todos/:todoId" element={<>Detailed</>} />
      <Route path="/" element={<Navigate replace to="/todos" />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
