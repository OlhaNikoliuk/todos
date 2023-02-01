import React from "react";
import { useParams } from "react-router-dom";
import { useTodo } from "../../data/hooks";
import BackLink from "./BackLink";

export const DetailedTodo = () => {
  const { todoId } = useParams();

  const { data: todo, isLoading: todoIsLoading } = useTodo(todoId);
  console.log(todo);
  return (
    <div>
      <BackLink text="Go back" to="/todos" />
      DetailedTodo
    </div>
  );
};
