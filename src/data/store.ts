import { nanoid } from "nanoid";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { TodoCategory } from "./utils/types";

export type Todo = {
  id: string;
  title: string;
  completed: boolean;
  description?: string;
  category?: TodoCategory;
};
export interface TodosState {
  todos: Todo[];
  addTodo: ({
    title,
    description,
    category,
  }: {
    title: string;
    description?: string;
    category: TodoCategory;
  }) => void;
  removeTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  editTodo: (todo: Todo) => void;
}

export interface FilterStore {
  filter: { label: string; value: boolean | undefined };
  setFilter: (filter: { label: string; value: boolean | undefined }) => void;
}

export const useTodos = create<TodosState>()(
  persist(
    (set) => ({
      todos: [
        {
          id: "1",
          title: "Learn JS",
          completed: false,
          category: TodoCategory.study,
        },
        {
          id: "2",
          title: "Learn React",
          completed: false,
          category: TodoCategory.study,
        },
      ],

      addTodo: ({ title, description, category }) =>
        set((state) => {
          const newTodo = {
            id: nanoid(),
            title,
            description,
            category,
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
  filter: { label: "all", value: undefined },
  setFilter: (filter) => set({ filter }),
}));
