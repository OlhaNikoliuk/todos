import { TodosSearchParams } from "./utils/types";

export const todosKeys = {
  all: () => ["todos"] as const,
  lists: () => [...todosKeys.all(), "list"] as const,
  list: (filters: TodosSearchParams) =>
    [...todosKeys.lists(), { filters }] as const,
  details: () => [...todosKeys.all(), "detail"] as const,
  detail: (id: string) => [...todosKeys.details(), id] as const,
};
