import React, { useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import IRestaurante from '../../../interfaces/IRestaurante';

const POST_URL = 'http://localhost:8000/api/v2/restaurantes/';

const RestaurantForm = () => {
  const [name, setName] = useState('');
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      const URL = `${POST_URL}${id}/`;
      const response = await axios.get<IRestaurante>(URL);
      const data = response.data;
      setName(data.nome);
    }
    fetchData();
  }, [id])


  const handleSubmit = (event: React.MouseEvent) => {
    event.preventDefault();
    if (id) axios.put(`${POST_URL}${id}/`, { nome: name });
    else axios.post(POST_URL, { nome: name }).then(() => alert('Restaurante Adicionado!'))
  };

  return (
    <form>
      <TextField
        id="standard-basic"
        label="Standard"
        variant="standard"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <Button variant="outlined" onClick={handleSubmit}>
        Salvar
      </Button>
    </form>
  );
};

export default RestaurantForm;
