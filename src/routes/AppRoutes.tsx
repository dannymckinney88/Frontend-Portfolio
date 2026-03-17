import { Route,Routes } from "react-router-dom";

import Counter from "@/pages/Counter";
import GithubExplorer from "@/pages/GithubExplorer";
import Home from "@/pages/Home";
import Todo from "@/pages/Todo";

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
