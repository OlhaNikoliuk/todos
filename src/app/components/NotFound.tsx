import React from "react";
import BackLink from "./BackLink";
import notFound from "../../images/notFound.png";

export const NotFound = () => {
  return (
    <div className="px-10 py-5 bg-notFound bg-no-repeat w-screen h-screen bg-center bg-contain">
      <BackLink text="Go back" to="/todos" />
    </div>
  );
};
