// src/components/TodoList.tsx
import React, { useState } from 'react';

type TodoItemProps = {
  text: string;
  done: boolean;
  onDone: () => void;
  onDelete: () => void;
};

const TodoItem: React.FC<TodoItemProps> = ({ text, done, onDone, onDelete }) => {
  return (
    <li style={{ textDecoration: done ? 'line-through' : 'none' }}>
      {text}
      <button onClick={onDone} disabled={done} style={{ marginLeft: 8 }}>
        ✓ Выполнено
      </button>
      <button onClick={onDelete} style={{ marginLeft: 4 }}>
        🗑 Удалить
      </button>
    </li>
  );
};

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<{ text: string; done: boolean }[]>([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos((prev) => [...prev, { text: input.trim(), done: false }]);
    setInput('');
  };

  const markDone = (index: number) => {
    setTodos((prev) =>
      prev.map((t, i) => (i === index ? { ...t, done: true } : t))
    );
  };

  const deleteTodo = (index: number) => {
    setTodos((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h2>Список дел</h2>
      <div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Новое дело..."
          onKeyDown={(e) => e.key === 'Enter' && addTodo()}
        />
        <button onClick={addTodo}>Добавить</button>
      </div>
      <ul>
        {todos.map((todo, index) => (
          <TodoItem
            key={index}
            text={todo.text}
            done={todo.done}
            onDone={() => markDone(index)}
            onDelete={() => deleteTodo(index)}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
