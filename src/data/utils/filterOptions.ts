import { useMemo } from "react";

export const filterOptions = () =>
  useMemo(
    () => [
      {
        label: "All",
        value: "all",
      },
      {
        label: "Completed",
        value: "completed",
      },
      {
        label: "Uncompleted",
        value: "uncompleted",
      },
    ],
    []
  );
