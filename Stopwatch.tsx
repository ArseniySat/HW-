// src/components/Stopwatch.tsx
import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  Stack,
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
  const [speed, setSpeed] = useState(1); // множитель скорости: 0.5, 1, 2

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
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running, speed]);

  const handleStart = () => setRunning(true);
  const handleStop = () => setRunning(false);
  const handleReset = () => {
    setRunning(false);
    setElapsed(0);
    setLaps([]);
    setSpeed(1);
  };
  const handleLap = () => setLaps((prev) => [...prev, elapsed]);

  const handleSpeedUp = () =>
    setSpeed((prev) => (prev < 2 ? parseFloat((prev * 2).toFixed(1)) : prev));
  const handleSpeedDown = () =>
    setSpeed((prev) => (prev > 0.5 ? parseFloat((prev / 2).toFixed(1)) : prev));

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4, textAlign: 'center' }}>
      <Typography variant="h4" fontFamily="monospace" mb={2}>
        {formatTime(elapsed)}
      </Typography>

      <Typography variant="body2" mb={1}>
        Скорость: ×{speed}
      </Typography>

      <Stack direction="row" spacing={1} justifyContent="center" mb={2}>
        <Button variant="contained" color="success" onClick={handleStart} disabled={running}>
          Старт
        </Button>
        <Button variant="contained" color="warning" onClick={handleStop} disabled={!running}>
          Стоп
        </Button>
        <Button variant="contained" color="error" onClick={handleReset}>
          Сброс
        </Button>
        <Button variant="outlined" onClick={handleLap} disabled={!running}>
          Круг
        </Button>
      </Stack>

      <Stack direction="row" spacing={1} justifyContent="center" mb={2}>
        <Button variant="outlined" onClick={handleSpeedDown} disabled={speed <= 0.5}>
          × ÷2 (замедлить)
        </Button>
        <Button variant="outlined" onClick={handleSpeedUp} disabled={speed >= 2}>
          × ×2 (ускорить)
        </Button>
      </Stack>

      {laps.length > 0 && (
        <Box textAlign="left">
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
