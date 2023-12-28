// the bridge between the components and the web browser
import React, { StrictMode } from "react"; //imports react
import { createRoot } from "react-dom/client"; //reacts library to talk to web browsers (React DOM)
import "./styles.css"; //styling

import App from "./App"; //component

//brings all the pieces together and injects the final product into indec.html in the public folder
const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);