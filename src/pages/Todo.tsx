import { useState } from "react";
import TodoInput from "@/components/todo/TodoInput";
import TodoList from "@/components/todo/TodoList";
import type { TodoInputProps } from "@/components/todo/types";
import type { Todo as TodoType } from "@/components/todo/types";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const initialTodos: TodoType[] = [
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
  const [todos, setTodos] = useState<TodoType[]>(initialTodos);

  const addTodo: TodoInputProps["addTodo"] = (text) => {
    const newTodo: TodoType = {
      id: crypto.randomUUID(),
      text,
      completed: false,
    };

    setTodos((prev) => [...prev, newTodo]);
    console.log("Added new todo:", newTodo);
  };

  const toggleTodo = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="w-full px-4 py-10">
      <div className="w-full max-w-4xl mx-auto space-y-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold tracking-tight">Todo App</h1>
          <p className="text-sm text-muted-foreground">
            Track tasks, practice React state, and build out your portfolio app.
          </p>
        </div>

        <Card className="w-full border-border/60 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg"> Tasks ({todos.length})</CardTitle>
            <CardDescription className="text-sm">
              Manage your current todos
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <TodoInput addTodo={addTodo} />
            <TodoList
              todos={todos}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Todo;
