// src/components/TodoListWithSearch.tsx
import React, { useState, useRef } from 'react';
import {
  Box,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';

const TodoListWithSearch: React.FC = () => {
  const [todos, setTodos] = useState<{ text: string; done: boolean }[]>([]);
  const [input, setInput] = useState('');
  const [search, setSearch] = useState('');

  const searchRef = useRef<HTMLInputElement>(null);

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

  const clearSearch = () => {
    setSearch('');
    searchRef.current?.focus();
  };

  const filteredTodos = todos.filter((t) =>
    t.text.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', mt: 4 }}>
    <Typography variant="h5" sx={{ mb: 2 }}>Список дел</Typography>
      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        <TextField
          label="Новое дело"
          size="small"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTodo()}
          fullWidth
        />
        <Button variant="contained" onClick={addTodo}>Добавить</Button>
      </Stack>

      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        <TextField
          label="Поиск"
          size="small"
          inputRef={searchRef}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
        />
        <Button variant="outlined" onClick={clearSearch}>✕</Button>
      </Stack>

      <List>
        {filteredTodos.map((todo, index) => {
          const originalIndex = todos.indexOf(todo);
          return (
            <ListItem
              key={originalIndex}
              sx={{ textDecoration: todo.done ? 'line-through' : 'none' }}
              secondaryAction={
                <Stack direction="row" spacing={0.5}>
                  <IconButton size="small" onClick={() => markDone(originalIndex)} disabled={todo.done}>
                    ✓
                  </IconButton>
                  <IconButton size="small" color="error" onClick={() => deleteTodo(originalIndex)}>
                    🗑
                  </IconButton>
                </Stack>
              }
            >
              <ListItemText primary={todo.text} />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default TodoListWithSearch;
