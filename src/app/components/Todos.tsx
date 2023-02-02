import React, { useState } from "react";
import { Box, Stack } from "@mui/material";
import { filterOptions } from "../../data/utils/filterOptions";
import { Todo, TodoCategory } from "../../data/utils/types";
import { AddButton } from "./AddButton";
import CreateTodoForm from "./CreateTodoForm";
import { Filter } from "./Filter";
import TodoList from "./TodoList";
import { useSearchParams, useNavigate } from "react-router-dom";
import { categoriesOptions } from "../../data/utils/categoriesOptions";
import { getCurrentColor } from "../../data/utils/getCurrentColor";
import { BsListCheck } from "react-icons/bs";
import { useTodosList } from "../../data/hooks";
import Skeleton from "./Skeleton";

export const Todos = () => {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams({});
  const [openModal, setOpenModal] = useState(false);
  const [todoToEdit, setTodoToEdit] = useState<Todo | null>(null);

  const queryParams = {
    completed: searchParams.get("completed"),
    category: searchParams.get("category"),
  };

  const { data: todos, isLoading: todosIsLoading } = useTodosList({
    params: queryParams,
  });

  const handleCategoryChange = (value: TodoCategory) => {
    if (value) {
      searchParams.set("category", value);
      setSearchParams(searchParams);
    } else {
      searchParams.delete("category");
      setSearchParams(searchParams);
    }
  };

  const handleFilterChange = (value: string) => {
    if (value === "all") {
      searchParams.delete("completed");
      setSearchParams(searchParams);
    } else {
      searchParams.set("completed", value === "completed" ? "true" : "false");
      setSearchParams(searchParams);
    }
  };

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
        <AddButton
          onClick={() => setOpenModal(true)}
          text="Add new"
          id="add-todo-btn"
        />
        <div className="w-full h-2px bg-bright my-6" />
        <div className="flex wrap gap-4 w-full justify-between mb-4">
          {[{ label: "All", value: undefined }, ...categoriesOptions()].map(
            (category, i) => (
              <button
                key={Number(i)}
                disabled={searchParams.get("category") === category.value}
                onClick={() => handleCategoryChange(category.value)}
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
          onChange={(e) => handleFilterChange(e.target.value)}
        />
        <div className="w-full h-2px bg-bright my-6" />

        {!todos?.data?.length && todosIsLoading && (
          <Stack spacing={1.3}>
            {[...Array(5)].map((_, i) => (
              <Skeleton key={Number(i)} />
            ))}
          </Stack>
        )}

        {!!todos?.data?.length && (
          <TodoList
            todos={todos.data}
            setTodoToEdit={setTodoToEdit}
            openModal={() => setOpenModal(true)}
            searchParams={queryParams}
          />
        )}
        <CreateTodoForm
          openModal={openModal}
          closeModal={() => {
            setOpenModal(false);
            setTodoToEdit(null);
          }}
          initialValue={todoToEdit}
          searchParams={queryParams}
        />
      </Box>
    </div>
  );
};
