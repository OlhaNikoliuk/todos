import React from "react";
import "./index.css";
import App from "./App.tsx";

import { render } from "react-dom";

const root: HTMLElement = document.getElementById("root") as HTMLElement;

render(<App />, root);
