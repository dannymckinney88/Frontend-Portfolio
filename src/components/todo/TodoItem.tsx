import type { TodoItemProps } from "./types";
import { Trash2, Pencil } from "lucide-react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";

const TodoItem = ({ todo, toggleTodo, deleteTodo }: TodoItemProps) => {
  return (
    <div className="flex items-center justify-between rounded-md px-3 py-2 transition-colors hover:bg-muted/50">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <Checkbox
          className="border-foreground data-[state=checked]:bg-black data-[state=checked]:border-black"
          checked={todo.completed}
          onCheckedChange={() => toggleTodo(todo.id)}
          aria-label={
            todo.completed
              ? `Mark ${todo.text} as incomplete`
              : `Mark ${todo.text} as complete`
          }
        />

        <span
          className={`text-sm truncate ${
            todo.completed ? "line-through text-muted-foreground" : ""
          }`}
        >
          {todo.text}
        </span>
      </div>

      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 hover:bg-background"
          aria-label={`Edit todo: ${todo.text}`}
        >
          <Pencil className="h-4 w-4" aria-hidden="true" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-destructive hover:text-destructive hover:bg-background"
          aria-label={`Delete todo: ${todo.text}`}
          onClick={() => deleteTodo(todo.id)}
        >
          <Trash2 className="h-4 w-4" aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
};

export default TodoItem;
