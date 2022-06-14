import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
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
  const [filteredRestaurants, setFilteredRestaurants] = useState<
    IRestaurante[]
  >([]);
  const [restaurant, setRestaurant] = useState('');
  const [nextPage, setNextPage] = useState('');
  const [previousPage, setPreviousPage] = useState('');
  const [order, setOrder] = useState('nome');

  const fetchData = async (page = '') => {
    const URL = page || 'http://localhost:8000/api/v1/restaurantes/';
    const response = await axios.get<IPagination<IRestaurante>>(URL);
    const data = response.data.results;
    setRestaurants([...data]);
    setFilteredRestaurants([...data]);
    setNextPage(response.data.next);
    setPreviousPage(response.data.previous);
  };

  const orderRestaurants = useCallback(
    (restaurants: IRestaurante[]) => {
      if (order === 'nome')
        return restaurants.sort((a, b) => a[order].localeCompare(b[order]));
      if (order === 'id')
        return restaurants.sort((a, b) => a[order] - b[order]);
      return restaurants;
    },
    [order]
  );

  useEffect(() => {
    fetchData();
  }, []);

  const searchRestaurants = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const restaurantesFilteredByName = restaurants.filter(({ nome }) => {
      const name = nome.toLowerCase();
      return name.includes(restaurant.toLowerCase());
    });

    const restaurantsOrdered = orderRestaurants(restaurantesFilteredByName);
    setFilteredRestaurants(restaurantsOrdered);
  };

  // useEffect(() => {
  //   const restaurantesFilteredByName = restaurants.filter(({ nome }) => {
  //     const name = nome.toLowerCase();
  //     return name.includes(restaurant);
  //   });
  //   setFilteredRestaurants(restaurantesFilteredByName);
  // }, [restaurant, restaurants]);

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
      {filteredRestaurants?.map((item) => (
        <Restaurante restaurante={item} key={item.id} />
      ))}
      <Button onClick={showMoreRestaurants}>
        {nextPage ? 'ver mais' : 'voltar'}
      </Button>
    </section>
  );
};

export default ListaRestaurantes;
