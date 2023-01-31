export enum TodoCategory {
  work = "work",
  study = "study",
  home = "home",
  books = "books",
  movies = "movies",
}

export type Todo = {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  description: string;
  completed: boolean;
  category: TodoCategory;
};

export interface FetchTodoListBody {
  success: boolean;
  data: Todo[];
}

export interface FetchTodoBody {
  success: boolean;
  data: Todo;
}

export interface CreateTodoValues {
  title: string;
  description: string;
  category: TodoCategory;
  completed: boolean;
}
