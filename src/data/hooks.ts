import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import * as api from "./api";
import { todosKeys } from "./hookKeys";
import {
  CreateTodoValues,
  FetchTodoBody,
  FetchTodoListBody,
  TodosSearchParams,
} from "./utils/types";

export const useTodosList = ({ params }: { params?: TodosSearchParams }) => {
  return useQuery<FetchTodoListBody, Error>(todosKeys.list(params), () =>
    api.fetchTodos(params)
  );
};

export const useTodo = (id: string) =>
  useQuery<FetchTodoBody, Error>(
    todosKeys.detail(id),
    () => api.fetchTodo(id),
    {
      enabled: !!id,
    }
  );

export const useCreateTodo = (): UseMutationResult<
  unknown,
  any,
  { values: CreateTodoValues; params?: TodosSearchParams },
  unknown
> => {
  const queryClient = useQueryClient();
  return useMutation(({ values }) => api.createTodo(values), {
    onMutate: async ({ values, params }) => {
      await queryClient.cancelQueries(todosKeys.all());

      const previousTodosList = queryClient.getQueryData<FetchTodoListBody>(
        todosKeys.list(params)
      );

      if (previousTodosList) {
        const newTodo = {
          _id: "loading",
          ...values,
        };

        const newTodoList = {
          ...previousTodosList,
          data: [...previousTodosList.data, newTodo],
        };

        queryClient.setQueryData(todosKeys.list(params), newTodoList);
      }
      return { previousTodosList };
    },

    onError: (_, { params }, { previousTodosList }) => {
      queryClient.setQueryData(todosKeys.list(params), previousTodosList);
    },

    onSettled: () => {
      queryClient.invalidateQueries(todosKeys.all());
    },
  });
};

export const useEditTodo = (): UseMutationResult<
  FetchTodoBody,
  any,
  { id: string; values: CreateTodoValues; params?: TodosSearchParams },
  unknown
> => {
  const queryClient = useQueryClient();
  return useMutation(({ id, values }) => api.editTodo(id, values), {
    onMutate: async ({ id, values, params }) => {
      await queryClient.cancelQueries(todosKeys.all());

      const previousTodosList = queryClient.getQueryData<FetchTodoListBody>(
        todosKeys.list(params)
      );

      if (previousTodosList) {
        const newTodoList = {
          ...previousTodosList,
          data: previousTodosList.data.map((todo) =>
            todo.id !== id
              ? todo
              : {
                  title: values.title,
                  description: values.description,
                  category: values.category,
                  completed: !todo.completed,
                }
          ),
        };

        queryClient.setQueryData(todosKeys.list(params), newTodoList);
      }
      return { previousTodosList };
    },

    onError: (_, { params }, { previousTodosList }) => {
      queryClient.setQueryData(todosKeys.list(params), previousTodosList);
    },

    onSettled: () => {
      queryClient.invalidateQueries(todosKeys.all());
    },
  });
};

export const useRemoveTodo = (): UseMutationResult<
  unknown,
  any,
  string,
  unknown
> => {
  const queryClient = useQueryClient();
  return useMutation((id) => api.deleteTodo(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(todosKeys.all());
    },
  });
};
