import {
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import http from '../../../http';
import IPlate from '../../../interfaces/IPlate';
import IRestaurante from '../../../interfaces/IRestaurante';
import ITag from '../../../interfaces/ITag';

const PlatesForm = () => {
  const [plate, setPlate] = useState('');
  const [tags, setTags] = useState<ITag[]>([]);
  const [restaurants, setRestaurants] = useState<IRestaurante[]>();

  const [tag, setTag] = useState('');
  const [restaurant, setRestaurant] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      if (id) {
        const responsePlates = await http.get<IPlate>(`pratos/${id}/`);
        const { nome } = responsePlates.data;
        setPlate(nome);
      }
      const responseTags = await http.get<{ tags: ITag[] }>('tags/');
      const responseRestaurants = await http.get<IRestaurante[]>('restaurantes/');
      const { tags } = responseTags.data;
      const restaurants = responseRestaurants.data;
      setTags(tags);
      setRestaurants(restaurants);
    }
    fetchData();
  }, [id]);

  const createNewPlate = () => {
    const formData = new FormData();
    formData.append('nome', plate);
    formData.append('tag', tag);
    formData.append('descricao', description);
    formData.append('restaurante', restaurant);
    if (image) formData.append('imagem', image);

    return formData;
  };

  const updatePlate = (newPlate: FormData) => {
    const requestInfo = {
      url: `pratos/${id}/`,
      method: 'PUT',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: newPlate,
    };
    http.request(requestInfo).then(() => alert('Prato atualizado com sucesso!'));
  };

  const createPlate = (newPlate: FormData) => {
    const requestInfo = {
      url: 'pratos/',
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: newPlate,
    };
    http.request(requestInfo).then(() => alert('Prato criado com sucesso!'));
  };

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const newPlate = createNewPlate();
    if (id) updatePlate(newPlate);
    else createPlate(newPlate);
  };

  const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) return;
    setImage(event.target.files[0]);
  };

  const renderTags = () => {
    return tags.map((tag) => (
      <MenuItem key={tag.id} value={tag.value}>
        {tag.value}
      </MenuItem>
    ));
  };

  const renderRestaurants = () => {
    return restaurants?.map((restaurant) => (
      <MenuItem key={restaurant.id} value={restaurant.id}>
        {restaurant.nome}
      </MenuItem>
    ));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flexGrow: 1,
      }}
    >
      <Typography component="h1" variant="h6">
        Formulário de Pratos
      </Typography>
      <Box component="form" sx={{ width: '100%' }}>
        <TextField
          label="Nome do Prato"
          variant="standard"
          value={plate}
          onChange={({ target }) => setPlate(target.value)}
          fullWidth
          required
          margin="dense"
        />
        <TextField
          label="Descrição do Prato"
          variant="standard"
          value={description}
          onChange={({ target }) => setDescription(target.value)}
          fullWidth
          required
          margin="dense"
        />
        <FormControl margin="dense" fullWidth variant="standard">
          <InputLabel id="select-tag">Tag</InputLabel>
          <Select
            labelId="select-tag"
            value={tag}
            onChange={({ target }) => setTag(target.value)}
          >
            {renderTags()}
          </Select>
        </FormControl>
        <FormControl margin="dense" fullWidth variant="standard">
          <InputLabel id="select-restaurant">Restaurante</InputLabel>
          <Select
            labelId="select-restaurant"
            value={restaurant}
            onChange={({ target }) => setRestaurant(target.value)}
          >
            {renderRestaurants()}
          </Select>
        </FormControl>
        <input type="file" onChange={handleImage} />
        <Button sx={{ marginTop: 1 }} variant="outlined" onClick={handleSubmit} fullWidth>
          Salvar
        </Button>
      </Box>
    </Box>
  );
};

export default PlatesForm;
