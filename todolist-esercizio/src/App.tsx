import { useState } from 'react';
import './App.css';
import { v4 as uuid } from 'uuid';

interface Todo {
  id: string;
  content: string;
  done: boolean;
}

const TodoList = ({ todos, onRemoveTodo, toggleTodo }: { todos: Todo[]; onRemoveTodo: (id: string) => void; toggleTodo: (id: string) => void }) => {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          {todo.content} <input type="checkbox" onClick={() => toggleTodo(todo.id)} />
          <button onClick={() => onRemoveTodo(todo.id)}>X</button>
        </li>
      ))}
    </ul>
  );
};

const TodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoContent, setNewTodoContent] = useState<string>('');

  const addTodo = () => {
    if (newTodoContent.trim() !== '') {
      const newTodo: Todo = {
        id: uuid(),
        content: newTodoContent.trim(),
        done: false,
      };
      setTodos([...todos, newTodo]);
      setNewTodoContent('');
    }
  };

  const removeTodo = (id: string) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const toggleTodo = (id: string) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          done: !todo.done,
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <div>
      <h1>Todo List</h1>
      <TodoList todos={todos} onRemoveTodo={removeTodo} toggleTodo={toggleTodo} />
      <input
        type="text"
        placeholder="Add new todo"
        value={newTodoContent}
        onInput={(e) => setNewTodoContent(e.currentTarget.value)}
      />
      <button onClick={addTodo}>Add Todo</button>
    </div>
  );
};

export default TodoApp;
