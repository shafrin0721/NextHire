import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { About } from "./screens/About";
import { CreateAndAccount } from "./screens/CreateAndAccount";
import { Home } from "./screens/Home";
import { Login } from "./screens/Login";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<CreateAndAccount />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
