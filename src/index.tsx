import React from "react";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

import { render } from "react-dom";

const root: HTMLElement = document.getElementById("root") as HTMLElement;

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  root
);
