import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./sass/styles.scss";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router basename="/FilmDiary">
      <App />
    </Router>
  </StrictMode>
);
