// src/components/WeatherWidget.tsx
import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Button,
  Stack,
} from '@mui/material';

// ─── Axios instance ───────────────────────────────────────────────────────────
const weatherApi = axios.create({
  baseURL: 'https://api.weatherapi.com/v1',
  timeout: 8000,
});

const API_KEY = 'YOUR_WEATHERAPI_KEY'; // <-- вставьте ваш ключ с weatherapi.com
const CITY = 'Moscow';

// ─── Функция запроса погоды ──────────────────────────────────────────────────
async function fetchWeather() {
  const response = await weatherApi.get('/current.json', {
    params: { key: API_KEY, q: CITY, lang: 'ru' },
  });
  return response.data;
}

// ─── Компонент ────────────────────────────────────────────────────────────────
const WeatherWidget: React.FC = () => {
  const queryClient = useQueryClient();

  // Query: получение погоды с кешированием
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['weather', CITY],
    queryFn: fetchWeather,
  });

  // Mutation: POST-запрос на jsonplaceholder + инвалидация weather-запроса
  const mutation = useMutation({
    mutationFn: () =>
      axios.post('https://jsonplaceholder.typicode.com/posts', {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['weather'] });
    },
  });

  if (isLoading) {
    return (
     <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    const message =
      axios.isAxiosError(error)
        ? error.response
          ? `Ошибка сервера: ${error.response.status}`
          : 'Нет подключения к интернету'
        : 'Неизвестная ошибка';

    return <Alert severity="error">{message}</Alert>;
  }

  return (
    <Box
      sx={{
        maxWidth: 360,
        mx: 'auto',
        mt: 4,
        p: 3,
        borderRadius: 3,
        boxShadow: 3,
        textAlign: 'center',
      }}
    >
      <Typography variant="h5" sx={{ mb: 1 }}>
        {data.location.name}, {data.location.country}
      </Typography>
     <Typography variant="h3" sx={{ mb: 1 }}>
        {data.current.temp_c}°C
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        {data.current.condition.text}
      </Typography>

     <Stack direction="row" spacing={1} sx={{ justifyContent: 'center' }}>
        <Button
          variant="contained"
          onClick={() => mutation.mutate()}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? 'Отправка...' : 'POST-запрос'}
        </Button>
      </Stack>

      {mutation.isSuccess && (
        <Alert severity="success" sx={{ mt: 2 }}>
          Запрос выполнен! Данные обновляются…
        </Alert>
      )}
    </Box>
  );
};

export default WeatherWidget;
