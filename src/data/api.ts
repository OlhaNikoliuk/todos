import axios from "axios";
import {
  FetchTodoBody,
  FetchTodoListBody,
  CreateTodoValues,
  Todo,
} from "./utils/types";

axios.defaults.baseURL = "https://todo-api-0i3118.can.canonic.dev/api";

export const fetchTodos = (params: string): Promise<FetchTodoListBody> =>
  axios.get(`/todos?${params}`).then(({ data }) => ({
    success: data.success,
    data: data.data.map((el) => ({
      ...el,
      category: el.category?.value,
    })),
  }));

export const fetchTodo = (id: string): Promise<FetchTodoBody> =>
  axios.get(`/todos/:${id}`).then(({ data }) => ({
    success: data.success,
    data: { ...data.data, category: data.category?.value },
  }));

export const createTodo = (values: CreateTodoValues): Promise<FetchTodoBody> =>
  axios
    .post("/todos", {
      input: {
        ...values,
        category: {
          label: values.category,
          value: values.category,
        },
      },
    })
    .then((res) => res.data.data);

export const editTodo = (
  id: string,
  values: CreateTodoValues
): Promise<FetchTodoBody> =>
  axios
    .patch(`/todos/${id}`, {
      input: {
        title: values.title,
        description: values.description,
        completed: values.completed,
        category: {
          label: values.category,
          value: values.category,
        },
      },
    })
    .then((res) => res.data.data);

export const deleteTodo = (id: string): Promise<FetchTodoBody> =>
  axios.delete(`/todos/${id}`).then((res) => res.data.data);
