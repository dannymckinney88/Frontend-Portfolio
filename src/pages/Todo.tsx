import { useEffect, useState } from "react";
import TodoInput from "@/components/todo/TodoInput";
import TodoList from "@/components/todo/TodoList";
import type { TodoInputProps } from "@/components/todo/types";
import type { Todo as TodoType } from "@/components/todo/types";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Todo = () => {
  const [todos, setTodos] = useState<TodoType[]>(() => {
    try {
      const savedTodos = localStorage.getItem("todos");
      return savedTodos ? JSON.parse(savedTodos) : [];
    } catch (error) {
      console.error("Failed to load todos from localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("todos", JSON.stringify(todos));
    } catch (error) {
      console.error("Failed to save todos to localStorage:", error);
    }
  }, [todos]);

  const addTodo: TodoInputProps["addTodo"] = (text) => {
    const newTodo: TodoType = {
      id: crypto.randomUUID(),
      text,
      completed: false,
    };

    setTodos((prev) => [...prev, newTodo]);
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

  const editTodo = (id: string, text: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, text } : todo)),
    );
  };

  const hasCompletedTodos = todos.some((todo) => todo.completed);

  return (
    <div className="w-full px-4 py-12">
      <div className="mx-auto w-full max-w-3xl space-y-8">
        <div className="space-y-3">
          <h1 className="text-4xl font-bold tracking-tight">Todo App</h1>
          <p className="text-sm text-muted-foreground">
            A full CRUD task manager focused on React state, reusable
            components, and local storage persistence.
          </p>
        </div>

        <Card className="w-full border-border/60 shadow-sm">
          <CardHeader className="flex flex-row items-start justify-between gap-4 pb-3">
            <div className="space-y-1">
              <CardTitle className="text-lg">Tasks ({todos.length})</CardTitle>
              <CardDescription className="text-sm">
                Manage your current todos
              </CardDescription>
              <p className="text-sm text-muted-foreground/80">
                React • TypeScript • Shadcn UI
              </p>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                setTodos((previousTodos) =>
                  previousTodos.filter((todo) => !todo.completed),
                )
              }
              disabled={!hasCompletedTodos}
              className="text-destructive hover:text-destructive"
              aria-label="Clear completed tasks"
            >
              Clear Completed
            </Button>
          </CardHeader>

          <CardContent className="space-y-6">
            <TodoInput addTodo={addTodo} />

            {todos.length === 0 ? (
              <div className="rounded-md border border-dashed px-4 py-8 text-center">
                <p className="text-sm text-muted-foreground">
                  No tasks yet. Add your first todo to get started.
                </p>
              </div>
            ) : (
              <TodoList
                todos={todos}
                toggleTodo={toggleTodo}
                deleteTodo={deleteTodo}
                editTodo={editTodo}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Todo;
