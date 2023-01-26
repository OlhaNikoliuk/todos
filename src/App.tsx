import React, { useState } from "react";
import TodoList from "./app/components/TodoList.tsx";
import CreateTodoForm from "./app/components/CreateTodoForm.tsx";
import { Todo } from "./data/utils/types";
import { AddButton } from "./app/components/AddButton.tsx";
import { Box } from "@mui/material";
import { useFilter, useTodos } from "./data/store.ts";
import { filterOptions } from "./data/utils/filterOptions.ts";
import { Filter } from "./app/components/Filter.tsx";

const App = () => {
  const [openModal, setOpenModal] = useState(false);
  const [todoToEdit, setTodoToEdit] = useState<Todo | null>(null);

  const filter = useFilter((store) => store.filter);
  const setFilter = useFilter((store) => store.setFilter);

  const todos = useTodos((store) => {
    switch (filter) {
      case "completed":
        return store.todos.filter((todo) => todo.completed);
      case "uncompleted":
        return store.todos.filter((todo) => !todo.completed);
      default:
        return store.todos;
    }
  });

  return (
    <div className="w-600 mx-auto pt-10">
      <Box
        component="div"
        className="flex flex-col justify-start min-h-600 text-center rounded-xl bg-dark p-6"
      >
        <h1 className="text-2xl font-bold  mt-8 mx-auto text-white mb-4">
          What`s the plan for today?
        </h1>
        <AddButton
          onClick={() => setOpenModal(true)}
          text="Add new"
          className="mb-4"
        />
        <Filter
          options={filterOptions()}
          onChange={(e) => setFilter(e.target.value)}
        />

        <TodoList
          todos={todos}
          setTodoToEdit={setTodoToEdit}
          openModal={() => setOpenModal(true)}
        />
        <CreateTodoForm
          openModal={openModal}
          closeModal={() => {
            setOpenModal(false);
            setTodoToEdit(null);
          }}
          initialValue={todoToEdit}
        />
      </Box>
    </div>
  );
};

export default App;
