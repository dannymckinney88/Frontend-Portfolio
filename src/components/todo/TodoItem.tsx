import { useState } from "react";
import type { TodoItemProps } from "./types";
import { Trash2, Pencil } from "lucide-react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

/**
 * Todo Item
 */
const TodoItem = ({
  todo,
  toggleTodo,
  deleteTodo,
  editTodo,
}: TodoItemProps) => {
  const [editedText, setEditedText] = useState(todo.text);

  /**
   * Handle edit dialog open state
   */
  const handleEditDialogChange = (open: boolean) => {
    if (open) {
      setEditedText(todo.text);
    }
  };

  /**
   * Save edited todo text
   */
  const handleSaveEdit = () => {
    const trimmedText = editedText.trim();

    if (!trimmedText) {
      return;
    }

    editTodo(todo.id, trimmedText);
  };

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
        <Dialog onOpenChange={handleEditDialogChange}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:bg-background"
              aria-label={`Edit todo: ${todo.text}`}
            >
              <Pencil className="h-4 w-4" aria-hidden="true" />
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Todo</DialogTitle>
              <DialogDescription>
                Update the text for this todo item.
              </DialogDescription>
            </DialogHeader>

            <form
              onSubmit={(e) => {
                e.preventDefault();

                if (!editedText.trim()) {
                  return;
                }

                handleSaveEdit();
              }}
              className="space-y-4"
            >
              <Input
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                aria-label="Todo text"
              />

              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </DialogClose>

                <DialogClose asChild>
                  <Button
                    type="submit"
                    disabled={!editedText.trim()}
                    className="disabled:bg-muted/80 disabled:text-muted-foreground disabled:border-border disabled:shadow-none disabled:cursor-not-allowed disabled:opacity-100"
                  >
                    Save
                  </Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-destructive hover:text-destructive hover:bg-background"
              aria-label={`Delete todo: ${todo.text}`}
            >
              <Trash2 className="h-4 w-4" aria-hidden="true" />
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Todo</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete "{todo.text}"? This action
                cannot be undone.
              </DialogDescription>
            </DialogHeader>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>

              <DialogClose asChild>
                <Button
                  variant="destructive"
                  onClick={() => deleteTodo(todo.id)}
                  aria-label={`Confirm delete todo: ${todo.text}`}
                >
                  Delete
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default TodoItem;
