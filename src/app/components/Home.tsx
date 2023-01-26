import { Box } from "@mui/material";
import React, { useState } from "react";
import { useFilter, useTodos } from "../../data/store";
import { filterOptions } from "../../data/utils/filterOptions";
import { Todo } from "../../data/utils/types";
import { AddButton } from "./AddButton";
import CreateTodoForm from "./CreateTodoForm";
import { Filter } from "./Filter";
import TodoList from "./TodoList";
import { useSearchParams, useNavigate } from "react-router-dom";
import { categoriesOptions } from "../../data/utils/categoriesOptions";
import { getCurrentColor } from "../../data/utils/getCurrentColor";

export const Home = () => {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const [openModal, setOpenModal] = useState(false);
  const [todoToEdit, setTodoToEdit] = useState<Todo | null>(null);

  const filter = useFilter((store) => store.filter);
  const setFilter = useFilter((store) => store.setFilter);

  const todos = useTodos((store) =>
    store.todos.filter(
      (todo) =>
        (filter.value ? todo.completed === filter.value : todo) &&
        (searchParams.get("category")
          ? todo.category === searchParams.get("category")
          : todo)
    )
  );

  return (
    <div className="w-600 mx-auto py-10">
      <Box
        component="div"
        className="flex flex-col justify-start min-h-500 text-center rounded-xl bg-dark p-6 max-h-600"
      >
        <h1
          className="text-2xl font-bold  mt-8 mx-auto text-white mb-4 cursor-pointer"
          onClick={() => navigate("/")}
        >
          What`s the plan for today?
        </h1>
        <AddButton
          onClick={() => setOpenModal(true)}
          text="Add new"
          className="mb-4"
        />
        <div className="flex wrap gap-4 w-full justify-between mb-3">
          {[{ label: "All", value: undefined }, ...categoriesOptions()].map(
            (category) => (
              <button
                key={category.value}
                onClick={() =>
                  category.value
                    ? setSearchParams({ category: category.value })
                    : setSearchParams()
                }
                className={`bg-main-gradient ${
                  getCurrentColor()[category.value]
                } flex  py-3 px-7  rounded-md text-white font-medium`}
              >
                {category.label}
              </button>
            )
          )}
        </div>

        <Filter
          options={filterOptions()}
          onChange={(e) =>
            setFilter({
              label: e.target.value,
              value: e.target.value === "completed" ? true : false,
            })
          }
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
