import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Todos } from "./Todos";
import { NotFound } from "./NotFound";
import { QueryClient } from "@tanstack/react-query";
import { DetailedTodo } from "./DetailedTodo";

const App = () => {
  // Create a client
  const queryClient = new QueryClient();

  return (
    <Routes>
      <Route index path="/todos" element={<Todos />} />
      <Route path="/todos/:todoId" element={<DetailedTodo />} />
      <Route path="/" element={<Navigate replace to="/todos" />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
