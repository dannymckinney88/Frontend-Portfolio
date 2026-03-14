export type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

export type Filter = "all" | "active" | "completed";

export type AddTodo = (text: string) => void;
export type ToggleTodo = (id: string) => void;
export type DeleteTodo = (id: string) => void;
export type EditTodo = (id: string, text: string) => void;

export interface TodoListProps {
  todos: Todo[];
  toggleTodo: ToggleTodo;
  deleteTodo: DeleteTodo;
  editTodo: EditTodo;
}

export interface TodoItemProps {
  todo: Todo;
  toggleTodo: ToggleTodo;
  deleteTodo: DeleteTodo;
  editTodo: EditTodo;
}

export interface TodoFilterProps {
  filter: Filter;
  setFilter: (filter: Filter) => void;
}
