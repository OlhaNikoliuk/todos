import axios from "axios";
import {
  FetchTodoBody,
  FetchTodoListBody,
  CreateTodoValues,
  TodosSearchParams,
} from "./utils/types";

axios.defaults.baseURL = "https://todo-api-0i3118.can.canonic.dev/api";

export const fetchTodos = (
  params: TodosSearchParams
): Promise<FetchTodoListBody> =>
  axios.get(`/todos`, { params }).then(({ data }) => data);

export const fetchTodo = (id: string): Promise<FetchTodoBody> =>
  axios.get(`/todos/${id}`).then(({ data }) => ({
    success: data.success,
    data: { ...data.data, category: data.category?.value },
  }));

export const createTodo = ({
  title,
  description,
  completed,
  category,
}: CreateTodoValues): Promise<FetchTodoBody> =>
  axios
    .post("/todos", {
      input: {
        title,
        description,
        completed,
        category,
      },
    })
    .then((res) => res.data.data);

export const editTodo = (
  id: string,
  { title, description, completed, category }: CreateTodoValues
): Promise<FetchTodoBody> =>
  axios
    .patch(`/todos/${id}`, {
      input: {
        title,
        description,
        completed,
        category,
      },
    })
    .then((res) => res.data.data);

export const deleteTodo = (id: string): Promise<FetchTodoBody> =>
  axios.delete(`/todos/${id}`).then((res) => res.data.data);
