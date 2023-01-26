import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Home } from "./app/components/Home";
import { NotFound } from "./app/components/NotFound";

const App = () => {
  return (
    <Routes>
      <Route index path="/todos" element={<Home />} />
      <Route path="/todos/:todoId" element={<>Detailed</>} />
      <Route path="/" element={<Navigate replace to="/todos" />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
