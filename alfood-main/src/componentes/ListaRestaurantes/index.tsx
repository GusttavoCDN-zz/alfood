import React, { useEffect, useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';
import { IPagination } from '../../interfaces/IPagination';
import {
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';

const ListaRestaurantes = () => {
  const [restaurants, setRestaurants] = useState<IRestaurante[]>([]);
  const [restaurant, setRestaurant] = useState('');
  const [nextPage, setNextPage] = useState('');
  const [previousPage, setPreviousPage] = useState('');
  const [order, setOrder] = useState('nome');

  const fetchData = async (page = '', options: AxiosRequestConfig = {}) => {
    const URL = page || 'http://localhost:8000/api/v1/restaurantes/';
    const response = await axios.get<IPagination<IRestaurante>>(URL, options);
    const data = response.data.results;
    setRestaurants([...data]);
    setNextPage(response.data.next);
    setPreviousPage(response.data.previous);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const searchRestaurants = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const options = {
      params: {
        search: restaurant,
        ordering: order,
      }
    }
    fetchData('', options);
  };

  const showMoreRestaurants = async () => {
    if (nextPage) fetchData(nextPage);
    else fetchData(previousPage);
    setRestaurant('');
  };

  return (
    <section className={style.ListaRestaurantes}>
      <h1>
        Os restaurantes mais <em>bacanas</em>!
      </h1>
      <FormControl
        sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}
        size="small"
        component="form">
        <TextField
          value={restaurant}
          label="Pesquise um Restaurante"
          variant="standard"
          onChange={(event) => setRestaurant(event.target.value)}
          sx={{ marginRight: '1rem' }}
        />
        <Select
          value={order}
          onChange={({ target }) => setOrder(target.value)}
          label="Ordem"
          variant="standard"
          sx={{ marginRight: '1rem' }}>
          <MenuItem value="nome">nome</MenuItem>
          <MenuItem value="id">id</MenuItem>
        </Select>
        <Button variant="outlined" onClick={searchRestaurants}>
          Buscar
        </Button>
      </FormControl>
      {restaurants?.map((item) => (
        <Restaurante restaurante={item} key={item.id} />
      ))}
      <Button onClick={showMoreRestaurants}>
        {nextPage ? 'ver mais' : 'voltar'}
      </Button>
    </section>
  );
};

export default ListaRestaurantes;
