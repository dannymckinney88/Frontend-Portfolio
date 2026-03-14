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
  );
};

export default TodoList;
