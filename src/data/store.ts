import { nanoid } from "nanoid";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Todo } from "./utils/types";

export interface TodosState {
  todos: Todo[];
  addTodo: ({
    title,
    description,
  }: {
    title: string;
    description?: string;
  }) => void;
  removeTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  editTodo: (todo: Todo) => void;
}

export interface FilterStore {
  filter: string;
  setFilter: (filter: string) => void;
}

export const useTodos = create<TodosState>()(
  persist(
    (set) => ({
      todos: [
        { id: "1", title: "Learn JS", completed: false },
        { id: "2", title: "Learn React", completed: false },
      ],

      addTodo: ({ title, description }) =>
        set((state) => {
          const newTodo = {
            id: nanoid(),
            title,
            description,
            completed: false,
          };
          return { todos: [newTodo, ...state.todos] };
        }),

      editTodo: (editedTodo: Todo) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === editedTodo.id ? editedTodo : todo
          ),
        })),

      removeTodo: (todoId) =>
        set((state) => ({
          todos: state.todos.filter((el) => el.id !== todoId),
        })),
      loading: false,
      error: null,

      toggleTodo: (todoId) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id !== todoId ? todo : { ...todo, completed: !todo.completed }
          ),
        })),
    }),
    {
      name: "todos-storage",
    }
  )
);

export const useFilter = create<FilterStore>((set) => ({
  filter: "all",
  setFilter: (filter) => set({ filter }),
}));
