import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Counter from "@/pages/Counter";
import ToDoApp from "@/pages/ToDoApp";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/counter" element={<Counter />} />
      <Route path="/todo" element={<ToDoApp />} />
    </Routes>
  );
}
