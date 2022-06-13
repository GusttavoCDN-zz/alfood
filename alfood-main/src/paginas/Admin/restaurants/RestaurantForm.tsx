import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import axios from 'axios';

const POST_URL = 'http://localhost:8000/api/v2/restaurantes/';

const RestaurantForm = () => {
  const [name, setName] = useState('');
  // console.log("🚀 ~ file: RestaurantForm.tsx ~ line 9 ~ RestaurantForm ~ name", name)

  const handleSubmit = (event: React.MouseEvent) => {
    event.preventDefault();
    axios.post(POST_URL, { nome: name }).then(() => alert('Restaurante Adicionado!'))
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
