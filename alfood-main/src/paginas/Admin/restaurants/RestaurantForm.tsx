import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import IRestaurante from '../../../interfaces/IRestaurante';
import http from '../../../http';

const RestaurantForm = () => {
  const [name, setName] = useState('');
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      const response = await http.get<IRestaurante>(`restaurantes/${id}/`);
      const data = response.data;
      setName(data.nome);
    }
    fetchData();
  }, [id]);

  const handleSubmit = (event: React.MouseEvent) => {
    event.preventDefault();
    if (id) http.put(`restaurantes/${id}/`, { nome: name });
    else
      http
        .post('restaurantes/', { nome: name })
        .then(() => alert('Restaurante Adicionado!'));
      setName('');
  };

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography component="h1" variant="h6">
        Formulário de Restaurantes
      </Typography>
      <Box component="form">
        <TextField
          label="Nome do Restaurante"
          variant="standard"
          value={name}
          onChange={(event) => setName(event.target.value)}
          fullWidth
          required
        />
        <Button
          sx={{ marginTop: 1 }}
          variant="outlined"
          onClick={handleSubmit}
          fullWidth>
          Salvar
        </Button>
      </Box>
    </Box>
  );
};

export default RestaurantForm;
