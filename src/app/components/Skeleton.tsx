import React from "react";
import { Skeleton as MUISkeleton } from "@mui/material";

const Skeleton = () => {
  return (
    <MUISkeleton
      sx={{ bgcolor: "grey", opacity: "0.3", display: "block", width: "100%" }}
      variant="rounded"
      height={60}
      animation="wave"
    />
  );
};
export default Skeleton;
