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
import { useEffect, useState } from 'react';
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
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      const responsePlates = await http.get<IPlate>(`pratos/${id}/`);
      const responseTags = await http.get<{ tags: ITag[] }>('tags/');
      const responseRestaurants = await http.get<IRestaurante[]>('restaurantes/');
      const { tags } = responseTags.data;
      const { nome } = responsePlates.data;
      const restaurants = responseRestaurants.data;
      setPlate(nome);
      setTags(tags);
      setRestaurants(restaurants);
    }
    fetchData();
  }, [id]);

  const handleSubmit = (event: React.MouseEvent) => {
    event.preventDefault();
    if (id) http.put(`restaurantes/${id}/`, { nome: plate });
    else
      http
        .post('restaurantes/', { nome: plate })
        .then(() => alert('Restaurante Adicionado!'));
    setPlate('');
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
      <MenuItem key={restaurant.id} value={restaurant.nome}>
        {restaurant.nome}
      </MenuItem>
    ));
  }

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
        <Button sx={{ marginTop: 1 }} variant="outlined" onClick={handleSubmit} fullWidth>
          Salvar
        </Button>
      </Box>
    </Box>
  );
};

export default PlatesForm;
