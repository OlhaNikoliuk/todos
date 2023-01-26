import React from "react";
import { MenuItem, Select, SelectProps } from "@mui/material";
import styled from "@emotion/styled";

const StyledSelect = styled(Select)({
  color: "#fff",
  borderColor: "#5d0cff",

  "& .MuiSvgIcon-root": {
    fill: "#fff",
  },
  "& fieldset.MuiOutlinedInput-notchedOutline, &:hover fieldset.MuiOutlinedInput-notchedOutline, &.Mui-focused fieldset.MuiOutlinedInput-notchedOutline":
    {
      borderColor: " #5d0cff",
      borderWidth: "2px",
    },

  "& .dropdown": {
    background: "#161a2b",
  },

  "& .MuiFormControlLabel-root, & .MuiFormLabel-root.MuiInputLabel-root, & .MuiFormLabel-root.MuiInputLabel-root.Mui-focused":
    {
      opacity: "0.7",
      fontSize: "14px",
      color: "#e2e2e2",
    },
});

interface FilterProps extends SelectProps {
  options: { value: string; label: string }[];
  onChange: (e: any) => any;
}

export const Filter = ({
  options,
  onChange,
  defaultValue,
  ...props
}: FilterProps) => {
  return (
    <StyledSelect
      defaultValue={defaultValue || options[0].value}
      onChange={onChange}
      className="mb-4"
      MenuProps={{
        PaperProps: {
          sx: {
            bgcolor: "#161a2b",
            color: "#fff",
          },
        },
      }}
      {...props}
    >
      {options.map((option) => (
        <MenuItem value={option.value} key={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </StyledSelect>
  );
};
