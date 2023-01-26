import React, { useState } from "react";
import { Checkbox } from "@mui/material";
import { useTodos } from "../../data/store";
import { BsList, BsTrash } from "react-icons/bs";
import { FiEdit2 } from "react-icons/fi";
import { Todo, TodoCategory } from "../../data/utils/types";
import { ConfirmModal } from "./ConfirmModal";
import { styled } from "@mui/system";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getCurrentColor } from "../../data/utils/getCurrentColor";

const StyledCheckBox = styled(Checkbox)({
  color: "#fff",
  padding: 0,

  "&.Mui-checked": { color: "#fff" },
});

interface TodoListProps {
  todos: Todo[];
  setTodoToEdit: (todo: Todo) => void;
  openModal: () => void;
}

const TodoList = ({ todos, setTodoToEdit, openModal }: TodoListProps) => {
  const [todoToRemove, setTodoToRemove] = useState<Todo | null>(null);

  const toggleTodo = useTodos((state) => state.toggleTodo);
  const removeTodo = useTodos((state) => state.removeTodo);

  const navigate = useNavigate();
  let { todoId } = useParams();
  const location = useLocation();

  return (
    <>
      <div className="flex flex-col w-full nth-2n:text-white overflow-x-auto">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className={`flex justify-between w-full py-3 px-4 rounded mb-2 last-of-type:mb-0 text-white items-start ${
              getCurrentColor()[todo.category]
            }`}
          >
            <div className="flex gap-2 items-start">
              <StyledCheckBox
                checked={todo.completed}
                onClick={() => toggleTodo(todo.id)}
              />
              <div className="text-start">
                <p className="font-semibold">{todo.title}</p>
                {todo.description && (
                  <p className="font-normal text-xs">{todo.description}</p>
                )}
              </div>
            </div>
            <div className="flex gap-3 items-center cursor-pointer">
              <BsTrash onClick={() => setTodoToRemove(todo)} size={22} />

              <FiEdit2
                size={22}
                onClick={() => {
                  setTodoToEdit(todo);
                  openModal();
                }}
              />
              <BsList onClick={() => navigate(`${todo.id}`)} size={22} />
            </div>
          </div>
        ))}
      </div>
      <ConfirmModal
        open={!!todoToRemove}
        onClose={() => setTodoToRemove(null)}
        text={"Are you sure you want to delete this item?"}
        handleConfirm={() => {
          removeTodo(todoToRemove?.id);
          setTodoToRemove(null);
        }}
        confirmBtnText="Remove"
        handleReject={() => setTodoToRemove(null)}
      />
    </>
  );
};

export default TodoList;
