export type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

export type AddTodo = (text: string) => void;
export type ToggleTodo = (id: string) => void;
export type DeleteTodo = (id: string) => void;

export interface TodoListProps {
  todos: Todo[];
  toggleTodo: ToggleTodo;
  deleteTodo: DeleteTodo;
}

export interface TodoInputProps {
  addTodo: AddTodo;
}

export interface TodoItemProps {
  todo: Todo;
  toggleTodo: ToggleTodo;
  deleteTodo: DeleteTodo;
}
