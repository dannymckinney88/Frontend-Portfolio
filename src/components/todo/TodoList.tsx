import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import TodoItem from "./TodoItem";
import type { TodoListProps } from "./types";
import { Separator } from "@/components/ui/separator";

const TodoList = ({
  todos,
  toggleTodo,
  deleteTodo,
  editTodo,
}: TodoListProps) => {
  return (
    <SortableContext
      items={todos.map((todo) => todo.id)}
      strategy={verticalListSortingStrategy}
    >
      <div className="space-y-2">
        {todos.map((todo, index) => (
          <div key={todo.id}>
            <TodoItem
              todo={todo}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
            />
            {index !== todos.length - 1 && <Separator className="mt-2" />}
          </div>
        ))}
      </div>
    </SortableContext>
  );
};

export default TodoList;
