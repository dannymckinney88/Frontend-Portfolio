import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { TodoItemProps } from "./types";
import { Trash2, Pencil, GripVertical } from "lucide-react";
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

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: todo.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

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
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center justify-between rounded-md px-3 py-2 transition-colors hover:bg-muted/60 group"
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-8 cursor-grab hover:bg-background active:cursor-grabbing"
          aria-label={`Reorder todo: ${todo.text}`}
          {...attributes}
          {...listeners}
        >
          <GripVertical className="h-4 w-4 text-muted-foreground" />
        </Button>

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
          className={`text-sm truncate cursor-pointer transition-all duration-200 ${
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
              type="button"
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
              type="button"
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
