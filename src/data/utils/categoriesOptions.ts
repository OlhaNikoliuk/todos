import { useMemo } from "react";
import { TodoCategory } from "./types";

export const categoriesOptions = () =>
  useMemo(
    () => [
      {
        label: "Work",
        value: TodoCategory.work,
      },
      {
        label: "Study",
        value: TodoCategory.study,
      },
      {
        label: "Home",
        value: TodoCategory.home,
      },
      {
        label: "Books",
        value: TodoCategory.books,
      },
    ],
    []
  );
