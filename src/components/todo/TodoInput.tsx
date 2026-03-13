import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import type { TodoInputProps } from "./types";
import { Plus } from "lucide-react";

const TodoInput = ({ addTodo }: TodoInputProps) => {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedText = text.trim();
    if (!trimmedText) return;

    addTodo(trimmedText);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <Input
        placeholder="Enter a new todo item"
        className="flex-1"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <Button type="submit">
        {" "}
        <Plus className="h-4 w-4" />
        Add
      </Button>
    </form>
  );
};

export default TodoInput;
