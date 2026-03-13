export type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

export interface TodoListProps {
  todos: Todo[];
}

export interface TodoInputProps {
  addTodo: (text: string) => void;
}
