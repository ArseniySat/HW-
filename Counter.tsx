import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import useCounter from './hooks/useCounter';

type CounterProps = {
  initialValue?: number;
};

const Counter: React.FC<CounterProps> = ({ initialValue }) => {
  const { count, increment, decrement, reset } = useCounter(initialValue);
  return (
    <Box sx={{ border: '1px solid #ccc', borderRadius: 2, p: 2, maxWidth: 300, mb: 2 }}>
      <Typography variant="h5" sx={{ textAlign: 'center', mb: 2 }}>{count}</Typography>
      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
        <Button variant="contained" onClick={increment}>+1</Button>
        <Button variant="contained" color="error" onClick={decrement}>-1</Button>
        <Button variant="outlined" onClick={reset}>Сброс</Button>
      </Box>
    </Box>
  );
};

export default Counter;