import { TodoCategory } from "./types";

export const TodoCategoryTypeParam = {
  encode(value) {
    return value;
  },

  decode(strValue): TodoCategory | undefined {
    return strValue;
  },
};
