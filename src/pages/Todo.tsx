import { useState } from "react";
import TodoInput from "@/components/todo/TodoInput";
import TodoList from "@/components/todo/TodoList";
import type { TodoInputProps } from "@/components/todo/types";
import type { Todo } from "@/components/todo/types";

const initialTodos: Todo[] = [
  {
    id: "1",
    text: "Learn React state management",
    completed: false,
  },
  {
    id: "2",
    text: "Build Todo app for portfolio",
    completed: true,
  },
];

const Todo = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const handleAddTodo: TodoInputProps["addTodo"] = (text) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
    };

    setTodos((prev) => [...prev, newTodo]);
    console.log("Added new todo:", newTodo);
  };

  return (
    <div className="space-y-6 w-full max-w-md mx-auto">
      <TodoInput addTodo={handleAddTodo} />
      <TodoList todos={todos} />
    </div>
  );
};

export default Todo;
