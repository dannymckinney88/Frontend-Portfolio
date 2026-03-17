import { useEffect, useState } from "react";
import { DndContext, closestCenter, type DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import TodoInput from "@/components/todo/TodoInput";
import TodoList from "@/components/todo/TodoList";
import TodoFilter from "@/components/todo/TodoFilter";
import type {
  Filter,
  Todo as TodoType,
  AddTodo,
} from "@/components/todo/types";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import EmptyState from "@/components/common/EmptyState";
import PageHeader from "@/components/common/PageHeader";

const Todo = () => {
  /**
   * Initialize todos from localStorage.
   * Falls back to an empty list if parsing fails.
   */
  const [todos, setTodos] = useState<TodoType[]>(() => {
    try {
      const savedTodos = localStorage.getItem("todos");
      return savedTodos ? JSON.parse(savedTodos) : [];
    } catch (error) {
      console.error("Failed to load todos from localStorage:", error);
      return [];
    }
  });

  /**
   * Persist todos to localStorage whenever they change.
   */
  useEffect(() => {
    try {
      localStorage.setItem("todos", JSON.stringify(todos));
    } catch (error) {
      console.error("Failed to save todos from localStorage:", error);
    }
  }, [todos]);

  const [filter, setFilter] = useState<Filter>("all");

  const addTodo: AddTodo = (text) => {
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

  const clearCompleted = () => {
    setTodos((previousTodos) =>
      previousTodos.filter((todo) => !todo.completed),
    );
  };

  /**
   * Reorder todos after drag and drop
   */
  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) {
      return;
    }

    setTodos((previousTodos) => {
      const oldIndex = previousTodos.findIndex((todo) => todo.id === active.id);
      const newIndex = previousTodos.findIndex((todo) => todo.id === over.id);

      if (oldIndex === -1 || newIndex === -1) {
        return previousTodos;
      }

      return arrayMove(previousTodos, oldIndex, newIndex);
    });
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const hasCompletedTodos = todos.some((todo) => todo.completed);

  const emptyMessage =
    filter === "all"
      ? "No tasks yet. Add your first todo to get started."
      : filter === "active"
        ? "No active tasks. Add a new todo or mark an existing one as complete."
        : "No completed tasks. Complete some todos to see them here.";

  return (
    <div className="w-full px-4 py-12">
      <div className="w-full space-y-8">
        <PageHeader
          title="Todo App"
          description="A full CRUD task manager with drag-and-drop sorting, reusable components, and local storage persistence."
        />

        <Card className="w-full border-border/60 shadow-sm">
          <CardHeader className="flex flex-col gap-3 pb-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-1">
              <CardTitle className="text-lg">Tasks ({todos.length})</CardTitle>
              <CardDescription className="text-sm">
                Manage your current todos
              </CardDescription>
            </div>

            <div className="flex flex-col items-start gap-2 sm:items-end">
              <TodoFilter filter={filter} setFilter={setFilter} />

              <Button
                variant="ghost"
                size="sm"
                onClick={clearCompleted}
                disabled={!hasCompletedTodos}
                className="h-auto px-0 text-destructive hover:text-destructive"
                aria-label="Clear completed tasks"
              >
                Clear Completed
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <TodoInput addTodo={addTodo} />

            {filteredTodos.length === 0 ? (
              <EmptyState message={emptyMessage} />
            ) : (
              <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <TodoList
                  todos={filteredTodos}
                  toggleTodo={toggleTodo}
                  deleteTodo={deleteTodo}
                  editTodo={editTodo}
                />
              </DndContext>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Todo;
