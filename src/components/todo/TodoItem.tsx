import type { Todo } from "./types";
import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";

const TodoItem = ({ todo }: { todo: Todo }) => {
  return (
    <div className="flex items-start justify-between gap-2">
      <span className="flex-1  truncate">{todo.text}</span>

      <Button variant="ghost" size="icon">
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default TodoItem;
