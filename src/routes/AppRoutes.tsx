import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Counter from "@/pages/Counter";
import Todo from "@/pages/Todo";
import GithubExplorer from "@/pages/GithubExplorer";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/counter" element={<Counter />} />
      <Route path="/todos" element={<Todo />} />
      <Route path="/github" element={<GithubExplorer />} />
    </Routes>
  );
}
