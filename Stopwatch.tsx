import React, { useState, useEffect, useRef } from 'react';
import {
  Box, Button, Typography, List, ListItem, ListItemText,
} from '@mui/material';

const formatTime = (ms: number): string => {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const centiseconds = Math.floor((ms % 1000) / 10);
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(centiseconds).padStart(2, '0')}`;
};

const Stopwatch: React.FC = () => {
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const [speed, setSpeed] = useState(1);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lastTickRef = useRef<number>(Date.now());

  useEffect(() => {
    if (running) {
      lastTickRef.current = Date.now();
      intervalRef.current = setInterval(() => {
        const now = Date.now();
        const delta = now - lastTickRef.current;
        lastTickRef.current = now;
        setElapsed((prev) => prev + delta * speed);
      }, 10);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running, speed]);

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4, textAlign: 'center' }}>
      <Typography variant="h4" sx={{ fontFamily: 'monospace', mb: 2 }}>
        {formatTime(elapsed)}
      </Typography>
      <Typography variant="body2" sx={{ mb: 1 }}>Скорость: ×{speed}</Typography>
      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', mb: 2 }}>
        <Button variant="contained" color="success" onClick={() => setRunning(true)} disabled={running}>Старт</Button>
        <Button variant="contained" color="warning" onClick={() => setRunning(false)} disabled={!running}>Стоп</Button>
        <Button variant="contained" color="error" onClick={() => { setRunning(false); setElapsed(0); setLaps([]); setSpeed(1); }}>Сброс</Button>
        <Button variant="outlined" onClick={() => setLaps((prev) => [...prev, elapsed])} disabled={!running}>Круг</Button>
      </Box>
      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', mb: 2 }}>
        <Button variant="outlined" onClick={() => setSpeed((p) => p > 0.5 ? p / 2 : p)} disabled={speed <= 0.5}>÷2</Button>
        <Button variant="outlined" onClick={() => setSpeed((p) => p < 2 ? p * 2 : p)} disabled={speed >= 2}>×2</Button>
      </Box>
      {laps.length > 0 && (
        <Box sx={{ textAlign: 'left' }}>
          <Typography variant="h6">Круги:</Typography>
          <List dense>
            {laps.map((lap, i) => (
              <ListItem key={i} disablePadding>
                <ListItemText primary={`Круг ${i + 1}: ${formatTime(lap)}`} />
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
};

export default Stopwatch;