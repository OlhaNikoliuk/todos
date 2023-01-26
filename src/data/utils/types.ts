export type Todo = {
  id: string;
  title: string;
  completed: boolean;
  description?: string;
  category?: TodoCategory;
};

export enum TodoCategory {
  work = "work",
  study = "study",
  home = "home",
  books = "books",
  movies = "movies",
}
