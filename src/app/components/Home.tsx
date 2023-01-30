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
import { BsListCheck } from "react-icons/bs";

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
        className="flex flex-col justify-start min-h-600 text-center rounded-xl bg-dark p-6 max-h-600"
      >
        <div
          className="flex flex-nowrap gap-3 items-center my-6 mx-auto cursor-pointer"
          onClick={() => navigate("/")}
        >
          <h1 className="text-2xl font-bold  text-white ">My todo list</h1>
          <BsListCheck color="white" size={24} />
        </div>

        <AddButton onClick={() => setOpenModal(true)} text="Add new" />

        <div className="w-full h-2px bg-bright my-6" />

        <div className="flex wrap gap-4 w-full justify-between mb-4">
          {[{ label: "All", value: undefined }, ...categoriesOptions()].map(
            (category) => (
              <button
                key={category.value}
                disabled={searchParams.get("category") === category.value}
                onClick={() =>
                  category.value
                    ? setSearchParams({ category: category.value })
                    : setSearchParams()
                }
                className={`disabled:bg-grey disabled:opacity-75  
                ${!category.value && "bg-main-gradient"}
                ${
                  searchParams.get("category") !== category.value &&
                  getCurrentColor()[category.value]
                } flex  py-3 px-7  rounded-md text-white font-medium  `}
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

        <div className="w-full h-2px bg-bright my-6" />

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
