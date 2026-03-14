import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import type { AddTodo } from "./types";
import { Plus } from "lucide-react";

const TodoInput = ({ addTodo }: { addTodo: AddTodo }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedText = text.trim();
    if (!trimmedText) return;

    addTodo(trimmedText);
    setText("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Label htmlFor="todo-input" className="sr-only">
        Add a new task
      </Label>

      <div className="flex flex-col items-center gap-2 sm:flex-row">
        <Input
          id="todo-input"
          type="text"
          placeholder="Enter a new todo item"
          className="flex-1"
          value={text}
          onChange={handleChange}
        />

        <Button
          type="submit"
          disabled={!text.trim()}
          className="w-full sm:w-auto"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          <span>Add</span>
        </Button>
      </div>
    </form>
  );
};

export default TodoInput;
