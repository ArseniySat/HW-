// src/components/PromoPage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { TextField, Typography, Box } from '@mui/material';

const SECRET_CODE = 'RUDN2025';

const PromoPage: React.FC = () => {
  const [value, setValue] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (value === SECRET_CODE) {
      navigate('/activated');
    }
  }, [value, navigate]);

  return (
    <Box>
   <Typography variant="h5" sx={{ mb: 2 }}>Введите промокод</Typography>
      <TextField
        label="Промокод"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        autoFocus
      />
    </Box>
  );
};

export default PromoPage;
