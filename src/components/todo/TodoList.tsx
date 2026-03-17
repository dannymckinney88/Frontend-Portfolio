import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import TodoItem from "./TodoItem";
import type { TodoListProps } from "./types";

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
          <TodoItem
            key={todo.id}
            todo={todo}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            showSeparator={index !== todos.length - 1}
          />
        ))}
      </div>
    </SortableContext>
  );
};

export default TodoList;
