import { Modal, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { AddButton } from "./AddButton";
import { TodosState, useTodos } from "../../data/store";
import { styled } from "@mui/system";
import { Todo } from "../../data/utils/types";

const StyledInput = styled(TextField)({
  color: "#e2e2e2",
  "& .MuiInputBase-root.MuiOutlinedInput-root, &.MuiOutlinedInput-notchedOutline, & .MuiFormLabel-root.MuiInputLabel-root, & .MuiFormLabel-root.MuiInputLabel-root.Mui-focused": {
    color: "#e2e2e2",
  },

  "& .MuiFormLabel-root.MuiInputLabel-root, & .MuiFormLabel-root.MuiInputLabel-root.Mui-focused": {
    opacity: "0.7",
    fontSize: "14px",
  },

  "& fieldset.MuiOutlinedInput-notchedOutline, &:hover fieldset.MuiOutlinedInput-notchedOutline, & .Mui-focused fieldset.MuiOutlinedInput-notchedOutline": {
    borderColor: " #5d0cff",
  },
});

interface CreateTodoFormProps {
  openModal: boolean;
  closeModal: () => void;
  initialValue?: Todo;
}

interface TodoFormProps {
  title: string;
  description?: string;
}

const CreateTodoForm = ({ openModal, closeModal, initialValue }: CreateTodoFormProps) => {
  const { handleSubmit, control, reset } = useForm<TodoFormProps>({
    defaultValues: {
      title: initialValue?.title || "",
      description: initialValue?.description || "",
    },
  });

  const addTodo = useTodos((store: TodosState) => store.addTodo);
  const editTodo = useTodos((store: TodosState) => store.editTodo);

  const onSubmit = (data: TodoFormProps) => {
    if (initialValue) {
      editTodo({
        ...initialValue,
        title: data.title,
        description: data?.description,
      });
    } else {
      addTodo({ title: data.title, description: data?.description });
    }

    reset();
    closeModal();
  };

  useEffect(() => {
    if (initialValue) {
      reset(initialValue);
    } else {
      reset({ title: "", description: "" });
    }
  }, [initialValue, openModal, reset]);

  return (
    <Modal
      open={openModal}
      onClose={() => {
        closeModal();
        reset();
      }}
      className="w-screen h-screen relative"
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div className="absolute top-0 right-0 p-10 pt-20 w-500 m-auto min-h-screen flex align-center justify-center rounded-md bg-dark">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full [&>*:not(:last-child)]:mb-5">
          <Controller name="title" control={control} rules={{ required: true }} render={({ field }) => <StyledInput {...field} autoFocus label="Title" />} />

          <Controller name="description" control={control} render={({ field }) => <StyledInput {...field} className="mb-5 " label="Description" />} />
          <AddButton type="submit" text="Add" />
        </form>
      </div>
    </Modal>
  );
};
export default CreateTodoForm;
