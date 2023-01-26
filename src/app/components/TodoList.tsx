import React, { useState } from "react";
import { Checkbox } from "@mui/material";
import { useTodos } from "../../data/store";
import { BsTrash } from "react-icons/bs";
import { FiEdit2 } from "react-icons/fi";
import { Todo } from "../../data/utils/types";
import { ConfirmModal } from "./ConfirmModal";
import { styled } from "@mui/system";

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

  // const todos: Todo[] = useTodos((state) => state.todos);
  const toggleTodo = useTodos((state) => state.toggleTodo);
  const removeTodo = useTodos((state) => state.removeTodo);

  return (
    <>
      <div className="flex flex-col w-full nth-2n:text-white ">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="flex justify-between w-full py-3 px-4 rounded nth-4n+1:bg-1n nth-4n+2:bg-2n nth-4n+3:bg-3n
          bg-0n mb-2 last-of-type:mb-0 text-white items-start"
          >
            <div className="flex gap-2 items-start">
              <StyledCheckBox
                checked={todo.completed}
                onClick={() => toggleTodo(todo.id)}
                // classes={classes.checkbox}
              />
              <div className="text-start">
                <p className="font-semibold">{todo.title}</p>
                {todo.description && <p className="font-normal text-xs">{todo.description}</p>}
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
