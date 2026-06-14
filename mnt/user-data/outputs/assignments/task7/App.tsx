// App.tsx (показывает Counter дважды)
import React from 'react';
import { Stack } from '@mui/material';
import Counter from './components/Counter';

function App() {
  return (
    <Stack spacing={2} p={4}>
      <Counter initialValue={10} />
      <Counter />
    </Stack>
  );
}

export default App;
