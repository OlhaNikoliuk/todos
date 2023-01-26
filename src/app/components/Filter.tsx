import React from "react";
import { MenuItem, Select } from "@mui/material";
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
});

interface FilterProps {
  options: { value: string; label: string }[];
  onChange: (e: any) => any;
}

export const Filter = ({ options, onChange }: FilterProps) => {
  return (
    <StyledSelect
      defaultValue={options[0].value}
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
    >
      {options.map((option) => (
        <MenuItem value={option.value} key={option.value} className="oala">
          {option.label}
        </MenuItem>
      ))}
    </StyledSelect>
  );
};
