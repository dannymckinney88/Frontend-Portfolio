import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Counter from "@/pages/Counter";
import Todo from "@/pages/Todo";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/counter" element={<Counter />} />
      <Route path="/todo" element={<Todo />} />
    </Routes>
  );
}
